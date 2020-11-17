from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic


#UserCreationForm są wbudowanymi formularzami Django
#reverse_lazy by przekierować użytkownika na wybraną stronę po pomyślnej akcji
class SignUpView(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('login')
    template_name ='registration/signup.html'
