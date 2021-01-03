from django.urls import path
from . import views

urlpatterns = [
  path('', views.HomeView.as_view(), name='home'),
  path('workers/', views.WorkerView.as_view(), name='workers'),
  path('results/', views.lets_calculate, name='results'),
  path('task/<str:task_id>/', views.TaskView.as_view(), name='task'),
]