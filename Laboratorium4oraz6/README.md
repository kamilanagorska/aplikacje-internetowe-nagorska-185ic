### Laboratorium 4 oraz Laboratorium 6
Wykorzystanie Django Rest Framework i Swaggera. Licznik wejść z wykorzystaniem Cookies.

Spis treści:
- Laboratorium 4 [tutaj](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/tree/main/Laboratorium4oraz6#laboratorium-4)
- Laboratorium 6 [tutaj](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/tree/main/Laboratorium4oraz6#laboratorium-6)




### Laboratorium 4

#### DRF
Stworzyłam projekt blog_project a w nim dwie aplikacje:
- posts
- cds 

Najpierw opiszę aplikację posts. 

Jest to aplikacja z postami na blogu. Utworzyłam model posta. Każdy wpis zawiera autora, tytuł, zawartość (body), date utworzenia i datę ostatniej modyfikacji. 
Autorami są zarejestrowani użytkownicy. Lista postów wyświetla się w panelu administratora.

![1](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/1.png?raw=true)

Dla aplikacji utworzyłam interfejs API REST. Znajduje się on pod adresem /api/v1/.

![2](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/2.png?raw=true)

Widać tutaj listę postów z naszej aplikacji. Wyświetlane dane określiłam za pomocą serializera. Są to: id (jest ono dodawane automatycznie), autor (id autora), tytuł, zawartość, data utworzenia. Gdy zjedziemy niżej mamy opcję dodania nowego wpisu.

![3](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/3.png?raw=true)

Dodany wpis wyświetla się teraz na liście wszystkich postów.

![4](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/4.png?raw=true)

Dodatkowo dodałam opcję wyszukiwania/filtracji danych. Gdy kliekniemy na ikonkę Filters pojawia nam się pasek, w którym możemy wpisać czego szukamy. Ustawiłam, że wpisana fraza będzie wyszukiwana w sekcjach "title" i "body".

![5](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/5.png?raw=true)

Po wciśnięciu "Search" pojawia nam się wynik wyszukiwania. Znaleźliśmy post z takim tytułem.

![6](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/6.png?raw=true)

Gdy wyszukamy np. słowo "post" wyświetla nam się więcej wyników:

![7](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/7.png?raw=true)

Pod paskiem do wyszukiwania dodałam opcję "Ordering". Umożliwia nam ona ułożenie postów w wybranej kolejności, np. tytułami malejąco lub datą utworzenia rosnąco.

![8](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/8.png?raw=true)

Ustawienie postów według zawartości malejąco, czyli przeciwnie do kolejności alfabetycznej.

![9](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/9.png?raw=true)

Wciskając "GET" możemy pobrać dane w postaci JSON lub API.

![10](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/10.png?raw=true)

Dane dotyczące postów w postaci JSON wyglądają następująco:

![11](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/11.png?raw=true)

Na górze po prawej pokazuje się moja nazwa użytkownika (jako, że jestem zalogowana). Wciskając ją mam opcję wylogowania. 

![12](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/12.png?raw=true)

Jako osoba niezalogowana mam dostęp do listy postów, mogę też posty dodawać.

![13](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/13.png?raw=true)

Jednak jeśli wejdę w /api/v1/1 czyli w informacje dotyczące jedynie pierwszego wpisu, nie mam do niczego dostępu. 

![14](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/14.png?raw=true)

Po prawej znajdują się opcje GET i DELETE. Jednak opcja GET pokaże nam jedynie "detail": "Authentication credentials were not provided.", a opcja DELETE nawet jeśli ją wciśniemy, nie spowoduje usunięcia posta.

Zaloguje się teraz na konto zwykłego użytkownika. Klikam opcję Log in i zostaję przekierowana na stronę z logowaniem.

![15](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/15.png?raw=true)

Po zalogowaniu widzę informację dotyczące posta. Mogę też np. pobrać dane za pomocą GET, jednak nie mam opcji edycji i usuwania wpisu. 

![16](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/16.png?raw=true)

Jest to spowodowane tym, że stworzyłam swoje własne zezwolenie (permission), które pozwala na odczyt informacji o konretnym poście tylko zalogowanym użytkownikom. Edycja wpisu i jego usuwanie jest tylko możliwe dla autora wpisu. Użytkownik testuser nie jest autorem wpisu o ID 1. Autorem tego wpisu jest admin, czyli tylko on jest w stanie edytować ten post. Testuser jest natomiast autorem wpisu o ID = 2, więc jeśli wejdziemy w /api/v1/2/ to pojawią nam się opcję edycji i usuwania.

![17](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/17.png?raw=true)

Do zdefiniowania adresów URL użyłam obsługi automatycznego trasowania adresów URL do Django (router). Dzięki temu nie musiałam wypisywać adresów dla posta czyli path('<int:pk>/', PostDetail.as_view()) oraz path('', PostList.as_view()).



#### Aplikacja cds
Jest to aplikacja, która posiada muzyków i albumy. Muzyk ma swoją nazwę, a album składa się z ID (dodanego automatycznie), artysty (ID artysty, artystą jest któryś z muzyków), tytułu, gatunku muzycznego, daty wydania i ilości piosenek na płycie. Muzycy jak i Albumy są wyświetlani w panelu administratora.

![18](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/18.png?raw=true)

![19](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/19.png?raw=true)

![20](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/20.png?raw=true)

Dla tej aplikacji również utworzyłam interfejs API REST. Znajduje się on pod adresem /api/v2/. Utworzyłam serializer, w którym wpisałam wszystkie informacje o albumie.

![21](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/21.png?raw=true)

Tak jak w api/v1 mamy tutaj opcję wyszukiwania i ustawiania w wybranej kolejności. Wyszukiwanie odbywa się w komórkach "genre' i 'title', czyli możemy wyszukiwać piosenek po gatunkach muzycznych i po ich tytule.

Przykład dla wyszukiwania "punk":

![22](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/22.png?raw=true)

Ustawianie albumów w wybranej kolejności ogarniczyłam do ustawiania według id albumu, tytułu i daty wydania. 

![23](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/23.png?raw=true)

Ustawienie od najnowszego do najstarszego albumu:

![24](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/24.png?raw=true)

Zalogowana jako administrator mam możliwość dodawania i edycji albumu, gdy wejdę w /api/v2/2/. Mogę też dodawać nowe albumy pod Album List.

![25](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/25.png?raw=true)

![27](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/27.png?raw=true)

Gdy się wyloguje, możliwość ta znika.

![26](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/26.png?raw=true)

![28](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/28.png?raw=true)

Gdy zaloguję się jako zwykły użytkownik też nie mam tych możliwości. 

![29](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/29.png?raw=true)

Dzieje się tak, dlatego, że tym razem utworzyłam zezwolenie, które pozwala na odczyt danych każdemu, nawet niezalogowanemu użytkownikowi, ale nie pozwala na edycje tych danych. Tylko zalogowany administrator może zmienić coś, usunąć, bądź dodać nowy album. 

Tu też wykorzystałam obsługę automatycznego trasowania adresów URL do Django (router).


#### Swagger
Swagger to zestaw narzędzi, które pomagają programistom projektować, tworzyć, dokumentować i korzystać z usług REST API. Skonfigurowałam go dla moich aplikacji. Gdy wejdziemy w adres /swagger/, wyświetla nam się to:

![30](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/30.png?raw=true)

Dlaczego? Dlatego, że zablokowałam dostęp do tego panelu dla wszystkich użytkowników, którzy nie są administratorem. Gdy przeloguje się na konto administratora ukazyje nam się Swagger.

![31](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/31.png?raw=true)

Widać napis "Django kamila", czyli jesteśmy zalogowani jako użytkownik kamila. 

Swagger pokazuje nam informacje o wszystkich dostępnych kontrolerach oraz akcje, które udostępnia. Widzimy, jakie są typy żądań. Pokazuje to informacje o v1 oraz v2.

![32](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/32.png?raw=true)

Widać też informacje o modelach Post i Album:

![33](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/33.png?raw=true)

Swagger daje nam również możliwość testowania. Wybieramy wybraną akcję i znajduje się tam opcja "Try it out".

![34](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/34.png?raw=true)

Możemy np. przetestować żądanie GET. Musimy podać ID Albumu, który chcemy pobrać i klikamy "Execute".

![35](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/35.png?raw=true)

Wyświetla nam się odpowiedż z API, informacje o Albumie o danym ID:

![36](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/36.png?raw=true)

Pod adresem swagger.json wyświetla nam się JSON zawierający szczegółowy opis całego interfejsu API.

![37](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/37.png?raw=true)

Wchodząc w swagger.yaml nie wyświetla nam się żadna strona, a pobierany zostaje plik swagger.yaml. Tam też znajduje się opis naszego intefejsu API.

Pod adresem redoc/ znajduje się narzędzie które generuje dokumentację API.

![38](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/38.png?raw=true)

Główną funkcją ReDoc jest możliwość dokumentowania złożonych "ładunków" (payloads) żądań/odpowiedzi. Obsługuje zagnieżdżone schematy i wyświetla je z możliwością zwijania/rozwijania.

![39](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/39.png?raw=true)

Pod tym znajduje się odpowiedź metody, która jest kolorowana zgodnie z kodem odpowiedzi.

![40](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/40.png?raw=true)

Po prawej znajdują się "samples" generowane na podstawie schematu JSON. Można je kopiować za pomocą przycisku "Copy".

![41](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/41.png?raw=true)




### Laboratorium 6
W Laboratorium 4 utworzyłam dwa API (v1,v2), a dodatkowo opcję wyszukiwania i sortowania. Laboratorium 6 jest kontynuacją Laboratorium 4.

#### Viewsets
W ramach Laboratorium 4 użyłam już viewsets do wyświetlania postów i albumów. 

![42](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/42.png?raw=true)

![43](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/43.png?raw=true)

(Czasem Visual Studio Code mi się psuje i podreśla coś, co nie jest błędem na czerwono)

Dodałam w ramach API v1 wyświetlanie listy użytkowników, więc stworzyłam dla nich viewset.

![44](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/44.png?raw=true)

We wszystkich przypadkach używam ModelViewSet, który zapewnia nam widok listy jak i widok szczegółowy wybranego elementu.


#### Routers
Routers również użyłam już poprzednio. Musiałam dodać ścieżkę dla utworzonej listy użytkowników.

![45](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/45.png?raw=true)


![46](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/46.png?raw=true)


#### Serializer
Dodatkowo by utworzyć listę użytkowników musiałam stworzyć dla nich serializer: 

![47](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/47.png?raw=true)

I tak dzięki temu powstała lista użytkowników:

![48](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/48.png?raw=true)

Szczegółowy widok użytkownika:

![49](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/49.png?raw=true)


#### Uwierzytelnianie
Domyślnym ustawieniem w Django REST Framework jest połączenie Basic i Session Authentication. Dlatego najpierw zdefiniowałam te dwa sposoby uwierzytelniania i nic się nie zmieniło. Definiowane są one na raz ponieważ służą one różnym celom. Session służy do zasilania interfejsu API Browsable oraz możliwości logowania się i wylogowywania z niego, a Basic służy do przekazywania ID sesji w nagłówkach HTTP dla samego interfejsu API.

Trzecim sposobem uwierzytelniania jest Token Authentication. Jest to najpopularniejsze podejście w ostatnich latach ze względu na wzrost liczby aplikacji jednostronnicowych. Jest ono bezstanowe, po wysłaniu przez klienta początkowych danych użytkownika do serwera generowany jest unikalny token, który jest następnie przechowywany przez klienta jako plik cookie lub w pamięci lokalnej. Ten token jest następnie przekazywany w nagłówku każdego przychodzącego żądania HTTP, a serwer używa go do weryfikacji uwierzytelnienia użytkownika, sam serwer nie prowadzi rejestru użytkownika, tylko tego, czy token jest ważny, czy nie. 

By zdefiniować ten posób uwierzytelniania nadal trzeba umieścić w ustawieniach Session Authentication ponieważ potrzebujemy go dla naszego interfejsu API z możliwością przeglądania, ale teraz użyjemy tokenów do przekazywania poświadczeń uwierzytelniania tam i z powrótem w naszych nagłówkach HTTP. 

![50](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/50.png?raw=true)

By zaimplementować Token Authentication należy dodać w ustawieniach aplikację authtoken. Po dodaniu jej w panelu administratora wyświetla nam się pole Tokens. 

![51](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/51.png?raw=true)

![52](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/52.png?raw=true)

Odrazu po pojawieniu się pola Tokens, nie było tam żadnych Tokenów, tworzą się one dopiero po wywołaniu interfejsu API dla użytkownika w celu zalogowania się. Dlatego musiałam utworzyć "endpoints'y", by użytkownicy mogli się logować i wylogowywać. By to zrobić musiałam zainstalować django-rest-auth i dodać tą aplikację do ustawień. 

![53](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/53.png?raw=true)

Musiałam też w urls dla całego projektu dodać jedną "ścieżkę":

![54](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/54.png?raw=true)

Dodanie tego url powoduje, że mamy teraz dostęp do 4 adresów url:
- rest-auth/login/
- rest-auth/logout/
- rest-auth/password/reset
- rest-auth/password/reset/confirm.

![55](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/55.png?raw=true)

![56](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/56.png?raw=true)

![57](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/57.png?raw=true)

![58](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/58.png?raw=true)

Następnie utworzyłam opcję rejestracji. Wykorzystałam do tego django-allauth. Po zainstalowaniu dodałam ją, django.contrib.sites i rest_auth.registration do aplikacji w ustawieniach.

![60](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/60.png?raw=true)

![59](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/59.png?raw=true)

Do ustawień musiałam dodać również poniższe dwie linijki kodu:

![61](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/61.png?raw=true)

W adresach url całego projektu zdefiniowałam ścieżkę dla rejestracji:

![62](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/62.png?raw=true)

Teraz gdy wejdziemy w ten adres wyświetla nam się to:

![63](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/63.png?raw=true)

By mieć pewność, że wszystko działa, utworzę testowego użytkownika:

![64](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/64.png?raw=true)

Po wciśnięciu POST wyświetla się status HTTP 201 Created, czyli konto zostało utworzone. Widać też "key". Jest to token wygenerowany dla nowego użytkownika.

![65](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/65.png?raw=true)

W konsoli ukazał się mail:

![66](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/66.png?raw=true)

Gdy wejdziemy teraz w panel administracyjny w zakładkę Tokens, pojawi się tutaj Token nowego użytkownika. Mam tu dwa Tokeny, jeden należy do innego testowego usera.

![67](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/67.png?raw=true)

Zalogujmy się teraz na konto nowego użytkownika używając utworzonego przez nas endpoint'u umożliwiającego logowanie.

![68](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/68.png?raw=true)

Logowanie powiodło się. Na górze po prawej widać nazwe naszego użytkownika. Wyświetlany jest status HTTP 200 OK i nasz key czyli Token.

![69](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/69.png?raw=true)

Gdy wejdziemy teraz w widok listy użytkowników, wyświetla nam się tam nasz nowy user.

![70](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/70.png?raw=true)


#### Prosty licznik wizyt z użyciem cookies

Utworzyłam nowy widok, który nazwałam counter. Do zaimplementowania licznika mówiłam zaimportować dwie rzeczy:

![71](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/71.png?raw=true)

Utworzyłam obiekt HttpResponse. Za pomocą if'a sprawdzam, czy w Cookies przechowywane są już jakieś informacje o ilości wizyt, jeśli nie to znaczy, że weszliśmy na stronę pierwszy raz. Wyświetlana jest odpowiednia wiadomość i za pomocą metody set_cookie() przypisujemy plikowi cookie o nazwie "visits" wartość 1. Jeśli tak, to pobierany jest plik cookie z ilością odwiedzin i zapisywany jako int. Wypisywany jest odpowiedni tekst i zwiększana jest wartość w pliku "visits".

![72](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/72.png?raw=true)

Musiałam również w url dla projektu dodać ścieżkę z tym widokiem.

![73](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/73.png?raw=true)

Teraz, jak wejdziemy na stronę po raz pierwszy ukazuje nam się napis:

![74](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/74.png?raw=true)

Gdy wciśniemy F12 i wejdziemy w Dane -> Ciasteczka to ukazuje nam się plik visits z wartością 1. 

![75](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/75.png?raw=true)

Gdy odświeżymy stronę liczba odwiedzin zmienia się i wyświetlany zostaje inny napis.

![76](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/76.png?raw=true)

W konsoli wartość odwiedzin również zmieniła się.

![77](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4oraz6/screenshots/77.png?raw=true)

Warto zaznaczyć, że licznik ten będzie zwiększał liczbę odwiedzin dla jednej sesji. Znaczy to, że liczba wyświetleń będzie rosła, gdy mamy włączoną ciągle tą samą przeglądarkę i nie wyłączaliśmy jej. Możemy zamknąć kartę z tą stroną i po jakimś czasie znowu na nią wejść, ale nie możemy zamknąć zupełnie przeglądarki. Spowoduje to usunięcie naszego pliku visits i przy kolejnym włączeniu przeglądarki ukaże się wiadomość, że jeszcze nigdy nie odwiedziliśmy tej strony.

