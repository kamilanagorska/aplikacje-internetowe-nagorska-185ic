from rest_framework.permissions import BasePermission, SAFE_METHODS

#Wewnętrznie Dnago REST Framewotk opiera się na klasie BasePermission, z której dziedziczą
#wszystkie inne klasy uprawnień

#Tworzymy własne niestandardowe uprawnienia, każdy użytkownik może odczytać dane, ale
#zapisywać, edytować, usuwać może tylko ten, który jest autorem 
#klasa IsAuthorOrReadOnly rozszerza klasę BasePermission
class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        else:
            return request.user.is_staff
        # Read-only permissions dla użytkowników ZALOGOWANYCH!!!
        #sprawdzamy czy żądanie jest operacą odczytu czy zapisu
        #SAFE_METHODS to krotka zawierająca GET, OPTIONS i HEAD
        #jest to żądanie tylko do odczytu i pozwolenie jest przyznawane
        #Jeśli użytkownik nie jest zalogowany to nie może zobaczyć żadnych danych
        #if request.method in permissions.SAFE_METHODS and request.user.is_authenticated:
            #return True
        
        # Write permissions tylko dla autora postu
        #w przeciwnym razie żądanie dotyczy jakiegoś zapisu, co oznacza aktualizację
        #zasobu API, więc można tworzyć, usuwac lub edytować funkcję
        #Wtedy sprawdzamy czy autor danego obiektu pasuje do użytkownika zgłaszającego
        #żądanie request.user
        #return obj.author == request.user