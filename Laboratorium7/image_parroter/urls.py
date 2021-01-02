"""image_parroter URL Configuration

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
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    #ma wziąć ścieżki z aplikacji
    path('', include('thumbnailer.urls')),
    #jest to sposób na udostępnienie plików przesłanych przez użytkownika 
    #podczas programowania!
    #ten sposób nie nadaje się do użytku produkcyjnego!!!!!!!!!!
    #pliki multimedialne przesłane przez użytkownika z MEDIA_ROOT
    #można udostępniać przy użyciu widoku django.views.static.serve()
    #gdy MEDIA_URL jest zdefiniowane jako /media/ (A JEST TAK W USTAWIENIACH)
    #to można to zrobić dodając poniższy kawałek kodu do urls.py
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
