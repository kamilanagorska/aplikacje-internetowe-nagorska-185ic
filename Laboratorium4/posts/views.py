from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Post
from .serializers import PostSerializer
from .permissions import IsAuthorOrReadOnly
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets

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
