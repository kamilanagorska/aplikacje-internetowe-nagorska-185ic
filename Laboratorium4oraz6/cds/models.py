from django.db import models

#muzyk, ma tylko nazwe
class Musician(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

#album ma artyste, tytul, gatunek muzyczny, date wydania i ilosc piosenek
#artysta moze miec wiele albumow
class Album(models.Model):
    artist = models.ForeignKey(Musician, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    genre = models.CharField(max_length=50)
    release_date = models.DateField()
    num_songs = models.IntegerField()
    def __str__(self):
        return self.title

