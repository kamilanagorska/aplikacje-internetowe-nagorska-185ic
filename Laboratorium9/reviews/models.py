from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

#Model recenzji jedzenia
class Review(models.Model):
    #jakie jedzenie bylo oceniane, mozna po nazwie jedzenia szukac
    food = models.CharField(max_length=100, blank=False, default='')
    #opis recenzji
    description = models.CharField(max_length=200, blank=False, default='')
    #ilosc punktow od 0 do 10
    score = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    #czy opublikowana czy nie
    published = models.BooleanField(default=False)
