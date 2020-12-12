from rest_framework import permissions
#Wewnętrznie Dnago REST Framewotk opiera się na klasie BasePermission, z której dziedziczą
#wszystkie inne klasy uprawnień

#Tworzymy własne niestandardowe uprawnienia, każdy użytkownik może odczytać dane, ale
#zapisywać, edytować, usuwać może tylko ten, który jest autorem 
#klasa IsAuthorOrReadOnly rozszerza klasę BasePermission
class IsAuthorOrReadOnly(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        # Read-only permissions dla użytkowników ZALOGOWANYCH!!!
        #sprawdzamy czy żądanie jest operacą odczytu czy zapisu
        #SAFE_METHODS to krotka zawierająca GET, OPTIONS i HEAD
        #jest to żądanie tylko do odczytu i pozwolenie jest przyznawane
        #Jeśli użytkownik nie jest zalogowany to nie może zobaczyć żadnych danych
        if request.user.is_authenticated:
            if request.method in permissions.SAFE_METHODS:
                return True
            return obj.author == request.user
        else:
            return False
    
        # Write permissions tylko dla autora postu
        #w przeciwnym razie żądanie dotyczy jakiegoś zapisu, co oznacza aktualizację
        #zasobu API, więc można tworzyć, usuwac lub edytować funkcję
        #Wtedy sprawdzamy czy autor danego obiektu pasuje do użytkownika zgłaszającego
        #żądanie request.user


        #LISTA POSTOW JEST DOSTEPNA DLA KAZDEGO I MOZNA DODAWAC POSTY TAM
        #ALE JUZ DETALE POSTÓW SĄ DOSTĘPNE TYLKO DLA ZALOGOWANYCH UZYTKOWNIKOW (READ ONLY)
        #DLA AUTORA SĄ OPCJE TEŻ EDYCJI I USUWANIA