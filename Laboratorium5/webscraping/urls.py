from django.urls import path
from .views import HomePageView, search_el, search_id, SearchIDView, SearchClassView, examples
from . import views

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('search/', views.search_el, name='search_results'),
    path('search_id/', SearchIDView.as_view(), name='search_id'),
    path('search_id_results/', views.search_id, name='search_results_id'),
    path('search_class/', SearchClassView.as_view(), name='search_class'),
    path('search_class_results/', views.search_class, name='search_results_class'),
    path('random/', views.examples, name='random'),
]