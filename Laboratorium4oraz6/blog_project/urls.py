"""blog_project URL Configuration

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
from django.urls import path, include, re_path
#Dla swaggera
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from posts.views import counter

#Ze Swaggera
#Schemat API pozwala na szereg przypadków użycia, w tym generowanie dokumentacji referencyjnej 
#lub sterowanie dynamicznymi bibliotekami klienta, które mogą współdziałać z interfejsem API
schema_view = get_schema_view(
   openapi.Info(
       #title - może służyć do podania opisowego tytułu definicji schematu
       title="Snippets API for my blog",
       #domyślna wersja API
       default_version='v1',
       #opis
       description="Test description",
       terms_of_service="https://www.google.com/policies/terms/",
       contact=openapi.Contact(email="contact@snippets.local"),
       license=openapi.License(name="BSD License"),
   ),
   public=True,
   #dostępne dla admina
   permission_classes=(permissions.IsAdminUser,),
)

urlpatterns = [
    #licznik wejsc
    path('', counter, name='counter'),
    #admin
    path('admin/', admin.site.urls),
    #URL "trasa" do naszej aplikacji z postami
    #Dobrą praktyką jest zawsze wersjonowanie interfejsów API - v1 /, v2 / itd ponieważ
    #podczas dokonywania dużej zaminy może wystąpić opóźnienie (lag) zanim różni użytkownicy
    #interfejsu API będą mogli również dokonać aktualizacji
    #W ten sposób możesz obsługiwać wersję 1 interfejsu API przez pewien czas, jednocześnie 
    #uruchamiając nową, zaktualizowaną wersję 2 i unikając zepsucia innych aplikacji, które 
    #korzystają z zaplecza API
    #jako, że mamy tylko edną aplikacje jak na razie to można ją umieścić bezpośrednio tutaj
    #gdybym miała więcej aplikacji, bardziej sensowne byłoby utworzenie dedykowanej aplikacji 
    #API, a następnie dołączenie do niej wszystkich innych tras URL interfejsu API
    path('api/v1/', include('posts.urls')),
    #Druga aplikacja jako api/v2
    path('api/v2/', include('cds.urls')),
    #umożliwi nam logowanie się w Django REST Framework, by nie musieć za każdym razem wylogowywać się
    #w domyślnym panelu logowania Django, a potem dopiero wchodzić w api/v1/
    #jest to można powiedzieć wikoki login i logout
    #'api-auth/ może być dowolnym adresem URL
    path('api-auth/', include('rest_framework.urls')),
    #należy dodać po zainstalowaniu rest_auth
    path('api/v1/rest-auth/', include('rest_auth.urls')),
    #dodanie powyższego url powoduje dodanie do naszego API:
    #rest-auth/login/
    #rest-auth/logout/
    #rest-auth/password/reset
    #rest-auth/password/reset/confirm
    #-----------------------------------------------
    #"trasa" adresu URL do rejestracji
    #mamy teraz miejsce, gdzie mozemy zalozyc konto!
    #po utworzeniu konta pojawia nam się odpowiedz HTTP "HTTP 201 Created", zwraca
    #token autoryzacji dla tego uzytkownika
    path('api/v1/rest-auth/registration/', include('rest_auth.registration.urls')),

    #SWAGGER
    #w dokumentacji online jast url() zamiast re_path(), ale od Django 3.1 url() jest wycofane
    #Mamy 4 "endpointsy":
    #widok JSON pod adresem /swagger.json
    #widok YAML pod adresem /swagger.yaml
    #widok swagger-ui pod adressem /swagger/
    #widok ReDoc pod adresem /redoc/
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

]
