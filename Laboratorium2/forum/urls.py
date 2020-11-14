from django.urls import path
from .views import HomePageView, PasswordsChangeView, SignUpView
from . import views
#TemplateView klasa Django służy do wyświetlania statycznych widoków html
urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('change-password/', PasswordsChangeView.as_view(template_name='registration/change-password.html'), name='change_password'),
    path('success/', views.success, name='success'),
    path('signup/', SignUpView.as_view(), name='signup'),
]