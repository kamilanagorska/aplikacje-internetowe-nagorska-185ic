from django.views.generic import TemplateView
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import PasswordChangeForm, UserCreationForm
from django.contrib.auth.views import PasswordChangeView
from django.urls import reverse_lazy
from django.shortcuts import render
from django.views import generic
#PasswordChangeForm i UserCreationForm są wbudowanymi formularzami Django
#reverse_lazy by przekierować użytkownika na wybraną stronę po pomyślnej akcji
class HomePageView(TemplateView):
    template_name = "forum/home.html"

class PasswordsChangeView(PasswordChangeView):
    form_class = PasswordChangeForm
    success_url = reverse_lazy('success')

def success(request):
    return render(request, 'registration/success.html', {})

class SignUpView(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('login')
    template_name ='registration/signup.html'