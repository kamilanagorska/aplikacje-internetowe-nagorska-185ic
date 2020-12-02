from django.contrib import admin
from .models import Post

#Dodajemy tutaj nasze Posty do panelu administracynego, by móc je tam zobaczyć
admin.site.register(Post)
