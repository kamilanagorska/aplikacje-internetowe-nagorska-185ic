from django.views.generic import TemplateView
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic
#PasswordChangeForm i UserCreationForm są wbudowanymi formularzami Django
#reverse_lazy by przekierować użytkownika na wybraną stronę po pomyślnej akcji
#TemplateView klasa Django służy do wyświetlania statycznych widoków html
class HomePageView(TemplateView):
    template_name = "forum/home.html"

class SignUpView(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('login')
    template_name ='registration/signup.html'