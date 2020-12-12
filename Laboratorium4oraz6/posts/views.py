from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Post
from .serializers import PostSerializer, UserSerializer
from .permissions import IsAuthorOrReadOnly
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets
from django.contrib.auth import get_user_model
#do licznika wejść
from datetime import datetime
from django.http import HttpResponse

#Lista naszych postów
#ListCreateAPIView sluzy do punktów końcowych do odczytu i zapisu, reprezentuje kolekcję wystąpień modelu
#znaczy to, że będziemy mogli odczytać naszą listę postów i edytować
#class PostList(generics.ListCreateAPIView):
#MAŁE ZMIANY BY UŻYĆ ROUTERS
class PostViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Post.objects.all()
    #nasz serializer
    serializer_class = PostSerializer
    #SeatchFilter umożliwia nam wyszukiwanie
    #OrderingFilter umożliwia filtracje np datą roznąco lub id malejąco itp
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('title','body')

#użytkownicy
#Viewsets to sposób na połączenie logiki wielu powiązanych widoków w jedną klasę. 
#innymi słowy, jeden zestaw widoków może zastąpić wiele widoków
#zamiast dwoch widokow dla postow i dwoch dla uzytkownikow mozna naśladować tę samą
#funkcjonalność z dwoma zestawami widoków: jednym dla postów na blogu i jednym dla użytkowników
#MODELVIEWSET zapewnia nam widok listy i widok szczegółowy
class UserViewSet(viewsets.ModelViewSet): 
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

#NIE JEST TO POTRZEBNE, GDY UŻYWAMY ROUTERS
#detale naszego posta
#RetrieveUpdateDestroyAPIView służy do punktów końcowych do odczytu, zapisu i usuwania w celu reprezentowania
#pojedynczego wystąpienia modelu
#czyli będzie można usuwać
#class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    #permission_classes = (permissions.IsAuthenticated,)
    #nasze CUSTOM PERMISSION
    #permission_classes = (IsAuthorOrReadOnly,)
    #queryset = Post.objects.all()
    #nasz serializer
    #serializer_class = PostSerializer

def counter(request):  
    html = HttpResponse("")
    if request.COOKIES.get('visits'): 
        #pobieramy liczbe odwiedzin witryny i zapisujemy jako int       
        value = int(request.COOKIES.get('visits'))
        #wypisanie wiadomości na stronie
        html = HttpResponse("<h1>Welcome back! You have been here {} times already!<h1>".format(value + 1))  
        #HttpResponse ma metode set_cookie(), której pierwszym atrybutem jest nazwa pliku cookie
        #następnie value, jaką chcemy przechowywać w cookie 
        html.set_cookie('visits', value + 1)             
    else:
        value = 1
        html = HttpResponse("<h1>Welcome! You have never been here!<h1>")   
        html.set_cookie('visits', value)        
    return html
