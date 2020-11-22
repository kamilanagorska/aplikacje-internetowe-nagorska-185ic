from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic
from .forms import UserRegistrationForm


#UserCreationForm są wbudowanymi formularzami Django
#reverse_lazy by przekierować użytkownika na wybraną stronę po pomyślnej akcji
class SignUpView(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('login')
    template_name ='registration/signup.html'

#UserRegistrationForm znajduje sie w formach i jest to forma stworzona prez nas
def register(request):
    if request.method == 'POST':
        user_form = UserRegistrationForm(request.POST)
        if user_form.is_valid():
            #tworzymy uzytkownika ale nie zapisujemy jeszcze
            new_user = user_form.save(commit=False)
            #wpisujemy haslo
            new_user.set_password(
                user_form.cleaned_data['password'])
            #zapisujemy naszego uzytkownika
            new_user.save()
            return render(request, 'registration/register_done.html', {'new_user': new_user})
    else:
        user_form = UserRegistrationForm()
    return render(request, 'registration/register.html', {'user_form': user_form})

