from django.db import models
from django.contrib.auth.models import User

#Model Posta, post będzie miał autora, tytuł, body czyli swoją zawartość (post), date utworzenia i date zaktualizowania
#używamy wbudowanego modelu Django User
class Post(models.Model):
    #ForeignKey definiuje relacje wiele do jednego, czyli wiele postów może mieć tego samego autora
    #Klasa ForeignKey wymaga dwóch argumentów, klasy, z którą jest powiązany model czyli USER i opcji on_delete
    #Kiedy obiekt, do którego odwołuje się ForeignKey zostanie usunięty Django będzie emulować zachowanie ograniczenia SQL
    #określonego przez argument on_delete
    #CASCADE usuwa, usuwany zostaje obiekt zawierający ForeignKey
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    #CharField pole przeznaczone dla małych rozmiarów i dużych rozmiarów stringów (ale dla bardzo dużych ilości tekstu
    #zalecane jest użycie TextField), CharField ma jeden wymagany argument max_length, czyli maksymalna długośc pola
    #(w znakach), w tym przypadku będzie to 50
    title = models.CharField(max_length=50)
    #TextField jak już wcześniej napisałam używany jest, gdy mamy do czynienia z dużą ilością tekstu, nie ograniczamy tutaj 
    #maksymalnej ilości tekstu, można to zrobić, jednak lepiej użyć w takim przypadku CharField
    body = models.TextField()
    #Data i godzina reprezentowane w Pythonie przez instancję datetime.datetime, pobiera te same doatkowe argumenty co DateField
    #czyli auto_now lub auto_now_add
    #auto_now_add automatycznie ustawia pole na teraz, gdy obiekt jest tworzony po raz pierwszy, należy pamiętać, że zawsze używana 
    #jest bieżąca data; to nie jest tylko domyślna wartość, którą można zmienić więc nawet jeśli ustawiona zostanie wartość dla tego 
    #pola podczas tworzenia obiektu, zostanie ona zignorowana
    #auto_now automatycznie ustawia pole na teraz za każdym razem, gdy obiekt jest zapisywany, czyli po każdej edycji, modyfikacji, dlatego
    #jest to użyte przy updated_at, a auto_now_add jest użyte z created_at
    #Obiekt tworzymy tylko raz, a edytowac możemy go kilka razy
    #Opcje auto_now_add, auto_now wwzajemnie się wykluczają, nie można użyć kombinacji tych opcji bo to powoduje błąd
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    #Metoda __str__ używana aby wyświetlić obiekt w serwisie administratora Django i jako
    #wartosc wstawiona do szablonu gdy wyeswielta on obiekt
    #W tym przypadku zobaczymy w panelu administracyjnym Tytuł
    def __str__(self):
        return self.title
