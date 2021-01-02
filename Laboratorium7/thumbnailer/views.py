import os
from celery import current_app
from django import forms
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
#potrzebne do klasy HomeView
from django.views import View
from .tasks import make_thumbnails

#forma z jednym polem
class FileUploadForm(forms.Form):
    #ImageField to pole wejściowe do przesyłania plików graficznych
    image_file = forms.ImageField(required=True)

class HomeView(View):
    #metoda get zwraca szablon home.html i przekazuje mu 
    #FileUploadForm składający się z pola ImageField
    def get(self, request):
        form = FileUploadForm()
        return render(request, 'thumbnailer/home.html', { 'form': form })
    
    #metoda post konstruuje obiekt FileUploadForm przy użyciu danych
    #przesłanych w żądaniu
    def post(self, request):
        form = FileUploadForm(request.POST, request.FILES)
        context = {}
        #sprawdzana jest poprawność
        if form.is_valid():
            #gdy poprawny to zapisuje plik do IMAGES_DIR
            file_path = os.path.join(settings.IMAGES_DIR, request.FILES['image_file'].name)

            #typowy sposów obsługi przesłanego pliku ukazany w dokumentacji
            with open(file_path, 'wb+') as fp:
                for chunk in request.FILES['image_file']:
                    fp.write(chunk)
            
            #uruchamiany jest task make_thumbnails
            task = make_thumbnails.delay(file_path, thumbnails=[(128, 128)])

            #pobranie id zadania
            context['task_id'] = task.id
            #pobranie statusu zadania, który przekazywany jest do szablonu
            context['task_status'] = task.status
            
            return render(request, 'thumbnailer/home.html', context)

        #jak niepoprawny to zwraca formularz z błędami do szablonu home.html
        context['form'] = form

        return render(request, 'thumbnailer/home.html', context)

#klasa używana przez żądanie AJAX do sprawdzenia statusu zadania make_thumbnails
class TaskView(View):
    def get(self, request, task_id):
        #zaimportowany został obiekt current_app i użyty tutaj do pobrania
        #obiektu AsyncResult zadania powiązanego z task_id z żądania
        task = current_app.AsyncResult(task_id)
        #tworzony jest słownik statusu i id zadania
        response_data = {'task_status': task.status, 'task_id': task.id}

        #jeśli status wskazuje, że żadanie zostało wykonane pomyślnie to
        #pobierane są wyniki wywołując metodę get obiektu AsyncResult,
        #przypisując ją do klucza wyników response_data do zwrócenia jako JSON
        #do requestera HTTP
        if task.status == 'SUCCESS':
            response_data['results'] = task.get()

        return JsonResponse(response_data)
