from django.urls import path
from .views import HomePageView
#TemplateView klasa Django służy do wyświetlania statycznych widoków html
urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
]