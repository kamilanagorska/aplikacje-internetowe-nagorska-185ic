from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PlanSerializer
from .models import Plan

class PlanView(viewsets.ModelViewSet):
    serializer_class = PlanSerializer
    queryset = Plan.objects.all()