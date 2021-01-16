from django.contrib import admin
from .models import Plan

class PlanAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'subject', 'date', 'done')

#"rejestracja" modelu
admin.site.register(Plan, PlanAdmin)