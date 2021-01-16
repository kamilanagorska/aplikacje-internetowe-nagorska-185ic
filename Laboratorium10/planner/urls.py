"""planner URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from plans import views

#obsługa automatycznego trasowania adresów URL do Django
#uzywane juz wczesniej na zajęciach
#zawiera w sobie odrazu też podstrone ze szczegolami wybranego planu
#Będzie mozna wykonywac operacje CRUD na modelu Plan
#/plans/ bedzie zawieralo liste wszystkich zaplanowanych zdarzen (Create i Read)
#/plans/id ukaze tylko jedno wybrane zdarzenie (Update i Delete)
router = routers.DefaultRouter()
router.register(r'plans', views.PlanView, 'plan')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]
