from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PlanSerializer
from .models import Plan

#viewsets zapewnia implementację operacji CRUD czyli create, read,
#update i delete
#dokładniej ModelViewSet udostępnia akcje takie jak:
#.list(), .retrieve(), .create(), .update(),
#.partial_update(), and .destroy().
class PlanView(viewsets.ModelViewSet):
    #wybieramy serializer ("klase serializatora")
    serializer_class = PlanSerializer
    #zwraca QuerySet, ktory zawiera wszystkie obiekty Plan w bazie danych
    queryset = Plan.objects.all()