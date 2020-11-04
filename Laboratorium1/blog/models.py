from django.db import models
from django.utils import timezone

#MODEL WPISU NA BLOGU
#definicja modelu Post, models.Model oznacza, że Post jest modelem Django
#W ten sposób django wie, że powinien go przechowywac w bazie danych
class Post(models.Model): 
    #autor, odnośnik do innego modelu, on delete- zachowanie gdy obiekt, do ktorego się odłowujemy zostanie usunięty
    #CASCADE - po usunięciu obiektu, usuń też obiekty, które mają do niego odniesienia (np gdy usuniemy posty, chcemy też usunąć jego
    #komentarze)
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    #tytuł, ograniczona liczba znaków 250
    title = models.CharField(max_length=250)
    #zawartość posta, nieograniczona długość znaków 
    text = models.TextField()
    #data utworzenia postu, domyślnie teraz
    created_date = models.DateTimeField(
            default=timezone.now)
    #data utworzenia postu, null=true, null w kolumnie w bazie danych
    #blank=true czy pole bedzie wymagane w formularzu, jeśli prawda to nie bedzie wymagane
    published_date = models.DateTimeField(
            blank=True, null=True)

    #metoda publikująca wpis, def oznacza że mamy doczyniena z funkcją/metodą, publisz nazwa metody
    def publish(self):
        self.published_date = timezone.now()
        self.save()

    #metoda zwracająca tytuł wpisu
    def __str__(self):
        return self.title