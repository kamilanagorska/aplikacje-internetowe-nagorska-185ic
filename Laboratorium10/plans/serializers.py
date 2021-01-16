from rest_framework import serializers
from .models import Plan

#definiuje jaki model i ktore jego pola chcę by były przekonwertowane na JSON
class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ('id', 'title', 'description', 'subject', 'date', 'done')