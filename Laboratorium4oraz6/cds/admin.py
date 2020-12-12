from django.contrib import admin
from .models import Album, Musician

# Register your models here.
admin.site.register(Musician)
admin.site.register(Album)