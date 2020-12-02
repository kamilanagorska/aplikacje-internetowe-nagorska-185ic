### Laboratorium 4
Wykorzystanie Django Rest Framework w tym Swaggera.

#### DRF
Stworzyłam projekt blog_project a w nim dwie aplikacje:
- posts
- cds 

Najpierw opiszę aplikację posts. 

Jest to aplikacja z postami na blogu. Utworzyłam model posta. Każdy wpis zawiera autora, tytuł, zawartość (body), date utworzenia i datę ostatniej modyfikacji. 
Autorami są zarejestrowani użytkownicy. Lista postów wyświetla się w panelu administratora.

![1](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/1.png?raw=true)

Dla aplikacji utworzyłam interfejs API REST. Znajduje się on pod adresem /api/v1/.

![2](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/2.png?raw=true)

Widać tutaj listę postów z naszej aplikacji. Wyświetlane dane określiłam za pomocą serializera. Są to: id (jest ono dodawane automatycznie), autor (id autora), tytuł, zawartość, data utworzenia. Gdy zjedziemy niżej mamy opcję dodania nowego wpisu.

![3](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/3.png?raw=true)

Dodany wpis wyświetla się teraz na liście wszystkich postów.

![4](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/4.png?raw=true)

Dodatkowo dodałam opcję wyszukiwania/filtracji danych. Gdy kliekniemy na ikonkę Filters pojawia nam się pasek, w którym możemy wpisać czego szukamy. Ustawiłam, że wpisana fraza będzie wyszukiwana w sekcjach "title" i "body".

![5](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/5.png?raw=true)

Po wciśnięciu "Search" pojawia nam się wynik wyszukiwania. Znaleźliśmy post z takim tytułem.

![6](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/6.png?raw=true)

Gdy wyszukamy np. słowo "post" wyświetla nam się więcej wyników:

![7](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/7.png?raw=true)

Pod paskiem do wyszukiwania dodałam opcję "Ordering". Umożliwia nam ona ułożenie postów w wybranej kolejności, np. tytułami malejąco lub datą utworzenia rosnąco.

![8](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/8.png?raw=true)

Ustawienie postów według zawartości malejąco, czyli przeciwnie do kolejności alfabetycznej.

![9](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/9.png?raw=true)

Wciskając "GET" możemy pobrać dane w postaci JSON lub API.

![10](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/10.png?raw=true)

Dane dotyczące postów w postaci JSON wyglądają następująco:

![11](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/11.png?raw=true)

Na górze po prawej pokazuje się moja nazwa użytkownika (jako, że jestem zalogowana). Wciskając ją mam opcję wylogowania. 

![12](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/12.png?raw=true)

Jako osoba niezalogowana mam dostęp do listy postów, mogę też posty dodawać.

![13](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/13.png?raw=true)

Jednak jeśli wejdę w /api/v1/1 czyli w informacje dotyczące jedynie pierwszego wpisu, nie mam do niczego dostępu. 

![14](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/14.png?raw=true)

Po prawej znajdują się opcje GET i DELETE. Jednak opcja GET pokaże nam jedynie "detail": "Authentication credentials were not provided.", a opcja DELETE nawet jeśli ją wciśniemy, nie spowoduje usunięcia posta.

Zaloguje się teraz na konto zwykłego użytkownika. Klikam opcję Log in i zostaję przekierowana na stronę z logowaniem.

![15](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/15.png?raw=true)

Po zalogowaniu widzę informację dotyczące posta. Mogę też np. pobrać dane za pomocą GET, jednak nie mam opcji edycji i usuwania wpisu. 

![16](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/16.png?raw=true)

Jest to spowodowane tym, że stworzyłam swoje własne zezwolenie (permission), które pozwala na odczyt informacji o konretnym poście tylko zalogowanym użytkownikom. Edycja wpisu i jego usuwanie jest tylko możliwe dla autora wpisu. Użytkownik testuser nie jest autorem wpisu o ID 1. Autorem tego wpisu jest admin, czyli tylko on jest w stanie edytować ten post. Testuser jest natomiast autorem wpisu o ID = 2, więc jeśli wejdziemy w /api/v1/2/ to pojawią nam się opcję edycji i usuwania.

![17](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/17.png?raw=true)

Do zdefiniowania adresów URL użyłam obsługi automatycznego trasowania adresów URL do Django (router). Dzięki temu nie musiałam wypisywać adresów dla posta czyli path('<int:pk>/', PostDetail.as_view()) oraz path('', PostList.as_view()).



#### Aplikacja cds
Jest to aplikacja, która posiada muzyków i albumy. Muzyk ma swoją nazwę, a album składa się z ID (dodanego automatycznie), artysty (ID artysty, artystą jest któryś z muzyków), tytułu, gatunku muzycznego, daty wydania i ilości piosenek na płycie. Muzycy jak i Albumy są wyświetlani w panelu administratora.

![18](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/18.png?raw=true)

![19](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/19.png?raw=true)

![20](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/20.png?raw=true)

Dla tej aplikacji również utworzyłam interfejs API REST. Znajduje się on pod adresem /api/v2/. Utworzyłam serializer, w którym wpisałam wszystkie informacje o albumie.

![21](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/21.png?raw=true)

Tak jak w api/v1 mamy tutaj opcję wyszukiwania i ustawiania w wybranej kolejności. Wyszukiwanie odbywa się w komórkach "genre' i 'title', czyli możemy wyszukiwać piosenek po gatunkach muzycznych i po ich tytule.

Przykład dla wyszukiwania "punk":

![22](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/22.png?raw=true)

Ustawianie albumów w wybranej kolejności ogarniczyłam do ustawiania według id albumu, tytułu i daty wydania. 

![23](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/23.png?raw=true)

Ustawienie od najnowszego do najstarszego albumu:

![24](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/24.png?raw=true)

Zalogowana jako administrator mam możliwość dodawania i edycji albumu, gdy wejdę w /api/v2/2/. Mogę też dodawać nowe albumy pod Album List.

![25](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/25.png?raw=true)

![27](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/27.png?raw=true)

Gdy się wyloguje, możliwość ta znika.

![26](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/26.png?raw=true)

![28](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/28.png?raw=true)

Gdy zaloguję się jako zwykły użytkownik też nie mam tych możliwości. 

![29](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/29.png?raw=true)

Dzieje się tak, dlatego, że tym razem utworzyłam zezwolenie, które pozwala na odczyt danych każdemu, nawet niezalogowanemu użytkownikowi, ale nie pozwala na edycje tych danych. Tylko zalogowany administrator może zmienić coś, usunąć, bądź dodać nowy album. 

Tu też wykorzystałam obsługę automatycznego trasowania adresów URL do Django (router).


#### Swagger
Swagger to zestaw narzędzi, które pomagają programistom projektować, tworzyć, dokumentować i korzystać z usług REST API. Skonfigurowałam go dla moich aplikacji. Gdy wejdziemy w adres /swagger/, wyświetla nam się to:

![30](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/30.png?raw=true)

Dlaczego? Dlatego, że zablokowałam dostęp do tego panelu dla wszystkich użytkowników, którzy nie są administratorem. Gdy przeloguje się na konto administratora ukazyje nam się Swagger.

![31](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/31.png?raw=true)

Widać napis "Django kamila", czyli jesteśmy zalogowani jako użytkownik kamila. 

Swagger pokazuje nam informacje o wszystkich dostępnych kontrolerach oraz akcje, które udostępnia. Widzimy, jakie są typy żądań. Pokazuje to informacje o v1 oraz v2.

![32](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/32.png?raw=true)

Widać też informacje o modelach Post i Album:

![33](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/33.png?raw=true)

Swagger daje nam również możliwość testowania. Wybieramy wybraną akcję i znajduje się tam opcja "Try it out".

![34](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/34.png?raw=true)

Możemy np. przetestować żądanie GET. Musimy podać ID Albumu, który chcemy pobrać i klikamy "Execute".

![35](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/35.png?raw=true)

Wyświetla nam się odpowiedż z API, informacje o Albumie o danym ID:

![36](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/36.png?raw=true)

Pod adresem swagger.json wyświetla nam się JSON zawierający szczegółowy opis całego interfejsu API.

![37](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/37.png?raw=true)

Wchodząc w swagger.yaml nie wyświetla nam się żadna strona, a pobierany zostaje plik swagger.yaml. Tam też znajduje się opis naszego intefejsu API.

Pod adresem redoc/ znajduje się narzędzie które generuje dokumentację API.

![38](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/38.png?raw=true)

Główną funkcją ReDoc jest możliwość dokumentowania złożonych "ładunków" (payloads) żądań/odpowiedzi. Obsługuje zagnieżdżone schematy i wyświetla je z możliwością zwijania/rozwijania.

![39](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/39.png?raw=true)

Pod tym znajduje się odpowiedź metody, która jest kolorowana zgodnie z kodem odpowiedzi.

![40](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/40.png?raw=true)

Po prawej znajdują się "samples" generowane na podstawie schematu JSON. Można je kopiować za pomocą przycisku "Copy".

![41](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium4/screenshots/41.png?raw=true)

