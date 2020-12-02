from django.shortcuts import render
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets
from .models import Album
from .serializers import AlbumSerializer
from rest_framework.permissions import AllowAny
from .permissions import IsAdminOrReadOnly


class AlbumViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminOrReadOnly,)
    queryset = Album.objects.all()
     #mój serializer
    serializer_class = AlbumSerializer
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ['genre', 'title']
     #ograniczenie co mozna ukladac malejaco lub rosnaco
    ordering_fields =['id', 'title', 'release_date']

