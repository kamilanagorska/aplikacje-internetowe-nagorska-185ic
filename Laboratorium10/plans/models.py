from django.db import models
from datetime import date

class Plan(models.Model):
    #CharField ma maksymalnie 255 znaków
    title = models.CharField(max_length=200, default='')
    #TextField może mieć więcej niż 255 znaków
    description = models.TextField(max_length=300, default='')
    subject = models.CharField(max_length=100, default='')
    date = models.DateField(default=date.today)
    done = models.BooleanField(default=False)

    def _str_(self):
        return self.title
