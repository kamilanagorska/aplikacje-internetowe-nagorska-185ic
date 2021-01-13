from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from reviews.models import Review
from reviews.serializers import ReviewSerializer
from rest_framework.decorators import api_view


#GET liste recenzji
#POST nową recenzje 
#DELETE wszystkie recenzje
@api_view(['GET', 'POST', 'DELETE'])
def review_list(request):
    if request.method == 'GET':
        #zwraca QuerySet, który zawiera wszystkie obiekty Review w bazie danych
        reviews = Review.objects.all()

        #pobiera wartośc parametru food lub None, jeśli parametr
        #jest nieobecny
        food = request.GET.get('food', None)
        #SZUKANIE
        #jeśli food nie jest puste
        if food is not None:
            #wyszukowana jest recenzja zawierająca food
            #i zwracany jest nowy zestaw QuerySet zawierający recenzje
            #ktore pasuja do podanych parametrow wyszukiwania
            reviews = reviews.filter(food__icontains=food)
        #many=True  podczas tworzenia wystąpienia serializera
        #by móc serializować listę recenzji zamiast pojedynczego
        #wystąpienia obiektu, przekazujemy listę obiektów do serializacji
        #czyli reviews
        reviews_serializer = ReviewSerializer(reviews, many=True)
        #JsonResponse - Podklasa HttpResponse, która pomaga w 
        #tworzeniu odpowiedzi zakodowanej w formacie JSON
        #safe domyślnie ma wartośc True i jeśli ako 
        #pierwszy argument zostanie przekazany obiekt inny niż dict,
        #zostanie zgłoszony błąd TypeError
        return JsonResponse(reviews_serializer.data, safe=False)
    
    #umożliwia dodawanie nowych recenzji
    elif request.method == 'POST':
        review_data = JSONParser().parse(request)
        review_serializer = ReviewSerializer(data=review_data)
        #walidacja, trzeba ją zawsze wykonać przed próbą uzyskania dostępu
        #do danych lub zapisaniem instancji obiektu
        #jeśli walidacja się nie powiedzie zwracany jest error
        if review_serializer.is_valid():
            #jeśli jest ok to tworzona jestnowa instancja
            #czyli tworzona jest nowa recenzja z podanymi danymi przez uzytkownika
            review_serializer.save()
            return JsonResponse(review_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(review_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        #usuwanie wszyskich obiektów Review
        count = Review.objects.all().delete()
        return JsonResponse({'message': '{} Tutorials were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def review_detail(request, pk):
    #znajdz recenzje za pomocą pk (ID)
    try: 
        #get obiekt Review o pk = wybranemu pk
        review = Review.objects.get(pk=pk) 
    except Review.DoesNotExist: 
        #kiedy nie istnieje to zwroc wiadomosc:
        return JsonResponse({'message': 'The review does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET': 
        review_serializer = ReviewSerializer(review) 
        return JsonResponse(review_serializer.data) 
 
    elif request.method == 'PUT': 
            review_data = JSONParser().parse(request) 
            #nadpisanie istniejącego obiektu, update, edycja
            review_serializer = ReviewSerializer(review, data=review_data) 
            if review_serializer.is_valid(): 
                review_serializer.save() 
                return JsonResponse(review_serializer.data) 
            return JsonResponse(review_serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

    elif request.method == 'DELETE': 
        review.delete() 
        return JsonResponse({'message': 'Review was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT) 


#GET wszystkie opublikowane recenzje
@api_view(['GET'])
def review_list_published(request):
    reviews = Review.objects.filter(published=True)
        
    if request.method == 'GET': 
        reviews_serializer = ReviewSerializer(reviews, many=True)
        return JsonResponse(reviews_serializer.data, safe=False)