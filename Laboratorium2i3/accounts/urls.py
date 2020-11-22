from django.urls import path
from .views import SignUpView
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    #strona rejestracji
    path('signup/', SignUpView.as_view(), name='signup'),

    #zmiana hasła + pomyślne zmienienie
    path('password_change/', auth_views.PasswordChangeView.as_view(), name='password_change'),
    path('password_change/done/', auth_views.PasswordChangeDoneView.as_view(), name='password_change_done'),

    #reset hasła:
    #1. podanie maila, na ktorego wyslac reset
    #2. potwierdzenie wyslania maila
    #3. wprowadzenie nowego hasła
    #4. potwierdzenie resetu hasla
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset_form'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),

    #rejestraca z e-mailem
    path('register/', views.register, name='register'),
]