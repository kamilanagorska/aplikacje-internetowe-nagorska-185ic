### Laboratorium 7
Python + Redis + Django

Redis jest skrótem od REmote DIctionary Service. Jest to nowoczesna baza danych NoSQL typu klucz-wartość. 
Magazyn klucz–wartość korzysta z asocjacyjnej tablicy (znanej również jako mapa lub słownik) jako podstawowego modelu danych. W tym modelu dane są reprezentowane jako zbiór par klucz–wartość, tak że każdy możliwy klucz pojawia się najwyżej jeden raz. Dane przechowywane są w pamięci RAM, dzięki czemu dostęp do nich jest znacznie szybszy niż w przypadku tradycyjnych rozwiązań. Serwer Redis ma gigantyczne znaczenie dla cache oraz na przechowywanie danych sesji klientów. Poprawia czas wczytywania i wydajność strony. Im większa i chętniej odwiedzana jest dana strona, tym większy pozytywny wpływ na jej działanie.

Celery to pakiet oprogramowania do kolejkowania zadań oparty na języku Python, który umożliwia wykonywanie asynchronicznych obciążeń obliczeniowych sterowanych na podstawie informacji zawartych w komunikatach tworzonych w kodzie aplikacji przeznaczonym dla kolejki zadań Celery. Może być również używany do wykonywania powtarzalnych okresowych (tj. zaplanowanych) zadań. Najlepiej używać go w połączeniu z message broker, najbardziej typowym uzywanym z Celery jest Redis. Używany jest do przechowywania komunikatów generowanych przez kod aplikacji opisujących pracę do wykonania w kolejce zadań Celery. Służy również jako przechowywanie wyników pochodzących z kolejek Celery, które są następnie pobierane przez konsumentów kolejki.


#### Spis treści:
- [Redis - ćwiczenia](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/tree/main/Laboratorium7#redis---zadania)
- [Django + Redis + Celery](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/tree/main/Laboratorium7#django--redis--celery)
- [Praca z workerami w Celery](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/tree/main/Laboratorium7#praca-z-workerami-w-celery)


#### Redis - zadania
Redisa zainstalowałam za pomoca Dockera, jako że miałam go już zainstalowanego na komputerze (używam go do projektu na innych zajęciach).

##### Sprawdzenie możliwości połączenia
By sprawdzić połączenie uruchomiłam taki kod:

![1](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/1.png?raw=true)

Importuje on Redisa i wykonuje na nim metodę ping(), która odpowiada PING w Redisie. PING zwraca PONG i jest używane do testowania, czy połączenie nadal działa lub do pomiaru opóżnienia. Napisany skrypt zwraca wartość True, jeśli połączenie działa. 

![2](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/2.png?raw=true)

##### Redis-cli 
Jest to interaktywna konsola Redisa, pozwalająca wykonywać komendy. Jest to prosty program, który umożliwia wysyłanie poleceń do Redis i odczytywanie odpowiedzi wysłanych przez serwer bezpośrednio z terminala. Ma dwa główne tryby: tryb interaktywny, w którym istnieje REPL (Read Eval Print Loop), w którym użytkownik wpisuje polecenia i otrzymuje odpowiedzi i inny tryb, w którym polecenie jest wysyłane jako argumenty redis-cli, wykonywane i drukowane na standardowym wyjściu.

Wypróbowanie Redis-cli wpisując polecenie PING z własnym tekstem:

![3](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/3.png?raw=true)

##### String
String może przechowywać maksymalnie 512MB danych. Jak już wcześniej wspomniałam Redis jest bazą typu klucz-wartość, więc by odczytać jakąś wartość musimy posłużyc się kluczem, który jest argumentem do komendy, odpowiedniej dla typu danych przechowywanych w tym kluczu.

![4](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/4.png?raw=true)

Powyższy kod pod kluczem "n" zapisał do Redisa wartość "kamila", następnie odczytał ją i wyświetlił. Wyświetlane zostaje:

![5](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/5.png?raw=true)

Dzieje się tak, ponieważ standardowo biblioteka ta zwraca odpowiedź jako ciąg bajtów. Jednak jest sposób, by to zmienić:

![6](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/6.png?raw=true)

Rozwiązaniem tego problemu jest przekazanie argumentu decode_responses=True. Sprawia to, że wynikiem programu jest string. 

![7](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/7.png?raw=true)

Do tak zdefiniowanych danych można dostać się za pomocą get w Redis-cli. 

![8](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/8.png?raw=true)

Gdy będziemy chcieli zapisać nową wartość pod kluczem, który już wcześniej zdefiniowaliśmy, Redis ją po prostu nadpisze. By dołączyć do istniejącej wartości string, można użyć metody append. Natomiast, jeśli chcemy usunąć klucz to należy użyć metody delete.

Kod wykonujący trzy powyżej opisane sytuacje:

![9](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/9.png?raw=true)

Najpierw nadpisuje istniejącą już wartość z podanym kluczem. Następnie dołączam do niej moje nazwisko, a na koniec usuwam.

![10](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/10.png?raw=true)

##### Liczby
Redis nie posiada oddzielnych typów dla liczb, mimo to radzi sobie, gdy pod wartość podstawimy liczbę. W Redisie istnieją komendy INCR i DECR, które umożliwiają zwiększanie lub zmniejszanie wartości. Kod zwiększający, a następnie zmniejszający wartość:

![11](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/11.png?raw=true)

Mamy wartość 22, następnie zwiększamy ją o 10, co daje 32, a na koniec odejmujemy 8, czyli zostaje nam 24.

![12](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/12.png?raw=true)

##### Listy
Istnieją dwie komendy LPUSH oraz RPUSH. Pierwsza z nich dodaje wartość bądź wartości na początek listy, czyli od lewej strony. Druga dodaje je na koniec, czyli z prawej strony. Tej właśnie metody użyję do utworzenia listy. 

![13](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/13.png?raw=true)

Do wyświetlenia elementów listy wykorzystałam LRANGE. Zwraca ona określone elementy listy przechowywane w kluczu. Przyjmuje trzy argumenty: klucz, indeks początkowy i indeks końcowy. Indeks może być również liczbą ujemną, jak w moim przypadku -1, która oznacza koniec listy. 

Wynikiem programu jest lista:

![14](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/14.png?raw=true)

Wyświetlenie tylko elementów od ideksu 2 do 4:

![15](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/15.png?raw=true)

![16](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/16.png?raw=true)

Istnieją również metody LPOP oraz RPOP. Pierwsza z nich usuwa i zwraca pierwszy element listy. Druga robi to samo dla ostatniego elementu. Napisałam kod, który wykorzystuje obie te metody:

![17](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/17.png?raw=true)

Najpierw usuwany i zwracany jest pierwszy element, następnie ostatni, a na koniec wyświetliłam zmienioną zawartość listy.

![18](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/18.png?raw=true)

Istnieje również metoda LINDEX, która zwraca element o konkretnym indeksie w liście o podanym kluczu oraz metoda LLEN, która zwraca długośc listy przechowywanej pod danym kluczu. Kod z wykorzystaniem tych dwóch metod:

![19](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/19.png?raw=true)

Najpierw wyświetliłam całą listę, by mieć jakieś odniesienie, czy kolejne wyniki są poprawne. Następnie zwrócony został element listy o indeksie 2 czyli 13, na koniec wyświetlana jest długość listy czyli 4.

![20](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/20.png?raw=true)

BRPOP to blokująca wersja metody RPOP, ponieważ blokuje połączenie, gdy nie ma już żadnych elementów do pobrania z listy. Istnieje też BLPOP, gdzie jedyną różnicą jest to, że BRPOP pobiera dane od końca listy, a BLPOP od początku. Wykorzystałam BLPOP w programie, który wypisuje wartości listy od początku w pętli. Program blokuje się, gdy dochodzi do końca listy, jednak nie kończy się, działa cały czas. 

![21](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/21.png?raw=true)

![22](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/22.png?raw=true)

W Redisie istnieje również polecenie SELECT. Służy ono do wyboru logicznej bazy danych mającej określony indeks numeryczny. Bazy te nazywane są przestrzeniami. Są one numerowane od 0 i jest ich 16, czyli mamy indeksy od 0 do 15. Domyślnie wybraną bazą jest baza zerowa. Klucze w jednej przestrzeni muszą być unikalne, ale już w innej przestrzeni może istnieć ten sam klucz o innej wartości. Poniżej znajduje się kod, który najpierw definiuje klucz k o wartości knag w przestrzeni domyślnej, czyli o indeksie 0, a następnie pobiera z niej jak i z przestrzeni o indeksie 1 wartość przypisaną temu kluczowi.

![23](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/23.png?raw=true)

Wynikiem działania programu jest None i knag. None jest wartością z przestrzeni pierwszej, nie ma tam zdefiniowanego klucza k, dlatego wyświetlane jest None, gdy pobieramy wartość z przestrzeni zerowej wyświetlane jest knag.

![24](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/24.png?raw=true)

##### TTL
TTL (Time to live) określa jak długo może żyć wybrany klucz. Po określonym czasie jest on automatycznie usuwany. SETEX jest metodą, która tworzy klucz wraz z wartością i przypisuje mu czas w sekundach po jakim na zostać usunięty. Jej odpowiednikiem jest użycie dwóch metod:
- SET mykey value
- EXPIRE mykey seconds.

Przykład użycia SETEX:

![25](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/25.png?raw=true)

Ustawiam czas życia dla klucza k o wartości kamila na 20 sekund, wyświetlam aktualny czas i wartość przypisaną do klucza. Czekam 10 sekund, nastepnie ponownie wyświetlam to samo, czekam 15 sekund i po tym czasie klucz już został usunięty, dokładnie 5 sekund temu, dlatego wyświetlane jest None.

![26](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/26.png?raw=true)

To samo ale za pomocą SET i EXPIRE:

![27](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/27.png?raw=true)

![28](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/28.png?raw=true)

##### Zbiory
Zbiory to nieuporządkowane kolekcje unikalnych ciągów znakowych (stringów). Podstawowymi komendami używanymi do pracy ze zbiorami do SADD i SMEMBERS. Pierwsza z nich dodaje określony element do zbioru o danym kluczu, a druga zwraca wszystkie elementy zbioru o podanym kluczu. Poniższy kod dodaje 4 wartości do zbioru, a następnie wypisywane są wszystkie jego elementy.

![29](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/29.png?raw=true)

![30](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/30.png?raw=true)

Elementy nie są wyświetlane w kolejności, w jakiej zostały dodane do zbioru, jako że jest to kolekcja nieuporządkowana. Gdy włączymy Redis-cli i użyjemy komendy SMEMBERS, tam kolejność też jest inna.

![31](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/31.png?raw=true)

Zgodnie z zasadą działania zbiorów, napisany program zwróci za każdym uruchomieniem elementy w innej kolejności.

Na zbiorach można wykonywać różne operacje logiczne, np. różnicę zbiorów (SDIFF), część wspólną (SINTER) i sumę (SUNION). Poniżej znajduje się kod wykorzystujący te metody. Utworzyłam do tego dodatkowy zbiór o kluczu s2.

![32](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/32.png?raw=true)

Najpierw wyświetlam zbiór o kluczu s, potem o s2, by zobaczyć jak wyglądają. Następnie wyświetlana jest różnica, część wspólna i na końcu suma zbiorów.

![33](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/33.png?raw=true)

##### Posortowane zbiory
Posortowane zbiory są podobne do zwykłych zbiorów. Różnica polega na tym, że każdy element posortowanego zbioru jest powiązany z oceną, wagą, która używana jest w celu uporządkowania posortowanego zestawu od najmniejszej do największej wagi. Chociaż elementy zbioru są unikalne to wagi mogą się powtarzać. Elementy układane są wtedy w kolejności alfabetycznej. Do dodawania elementów do posortowanego zbioru używana jest komenda ZADD, a do wyświetlania elementów konkretnego zbioru komenda ZRANGE.  

![34](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/34.png?raw=true)

![35](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/35.png?raw=true)

Elementy wyświetlane są według wagi, od najmniejszej do największej. Tak samo stanie się, gdy w kodzie zmienie kolejność dodawania elementów i wagi:

![36](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/36.png?raw=true)

![37](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/37.png?raw=true)

Elementy ponownie zostały ustawione według wagi, mimo że w kodzie nie są wpisane w kolejności rosnącej. 

Sprawdźmy jeszcze, czy na pewno, gdy wszystkie elementy będą miały taką samą wagę, to zostaną one ustawione alfabetycznie.

![38](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/38.png?raw=true)

![39](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/39.png?raw=true)

Jak widać elementy zostały ustawione alfabetycznie.

Za pomocą komendy ZRANGE można wyświetlić też wagi elementów. Zmienie troszkę kod z powyższego przykładu dodając parametr withscores o wartości True do zrange:

![40](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/40.png?raw=true)

Sprawia to, że przy wypisywaniu elementów wypisywane są one wraz z wagami:

![41](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/41.png?raw=true)

Istnieją metody ZPOPMAX i ZPOPMIN. Pierwsza z nich zwraca i usuwa element zbioru uporządkowanego o największej wadze, a druga robi to samo z elementem o najmniejszej wadze. Poniżej kod z ich wykorzystaniem:

![42](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/42.png?raw=true)

![43](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/43.png?raw=true)

Najpierw wyświetlam zbiór uporządkowany. Następnie zwracam i usuwam element o największej wadze, potem o najmniejsze, a na końcu wyświetlany zostaje zbiór po wykonanych na nim operacjach. 

Metoda ZINCRBY używane jest to zwiększenia wagi wybranego elementu, ZCOUNT służy do zwrócenia ilości elementów o wadze z podanego przedziały, a ZSCORE wyświetla wagę elementu. Napisałam kod, który wykorzystuje te metody:

![44](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/44.png?raw=true)

![45](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/45.png?raw=true)

Najpierw wyświetlam cały uporządkowany zbiór, by mieć do czego się odwołać i sprawdzić czy program poprawnie działa. Następnie zwiększyłam wagę elementu kamila o 10. Wcześniej wagą tego elementu było 10, po zwiększeniu jest to 20. Później wyświetlana jest ilość elementów, których waga znajduje się w przedziale od 50 do 250. Jest ich 3 a ich wagi to: 62, 104, 222. Na koniec wyświetlana jest waga elementu mateusz.

##### Hashe
Hashe są mapami między polami ciągów a wartościami ciągów. Są idealnym typem danych do reprezentowania obiektów, np. użytkownik z wieloma polami takimi jak imię, nazwisko, wiek. Hashe są też nazywane słownikami lub tablicami asocjacyjnymi. Komenda HSET ustawia pole w hashu przechowywanym w kluczu o podanej wartości. Jeśli taki klucz nie istnieje, jest on tworzony, jeśli już istnieje to jest on nadpisywany. Poniżej znajduje się kod, który wykorzystuje tą metodę:

![46](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/46.png?raw=true)

Można powiedzieć, że stworzyłam obiekt użytkownika, który posiada wartości imię, nazwisko i hasło. Do wyświetlenia wszystkich tych danych użyję w Redis-cli komendy HGETALL. Zwraca ona wszystkie pola i wartości hasha przechywowanego w kluczu.

![47](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/47.png?raw=true)

Istnieje również komenda HGET, która pozwala nam pobrać wartość jedynie jednego pola danego klucza:

![48](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/48.png?raw=true)

Polecenie HKEYS zwraca nazwy pól przechowywanych w wybranym kluczu. HEXISTS zwraca 1/True lub 0/False w zależności, czy podane pole istnieje w danym kluczu. HVALS zwraca wszystkie wartości przechowywane w słowniku. Napisałam kod, w którym wykorzystuje podane wyżej trzy metody:

![49](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/49.png?raw=true)

![50](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/50.png?raw=true)

Najpierw wypisałam wszystkie nazwy pól przechowywane w słowniku o kluczu h. Są to name, lname i password. Następnie sprawdziłam czy w słowniku tym znajduje się pole name. Program zwrócił wartość True, bo takie pole się tam znajduje. Sprawdziłam też istnienie pola age. Zwrócone zostało False, bo takie pole nie istnieje. Na koniec program wypisał mi wszystkie wartości przechowywane w hashu. 

##### Publish-subscribe
W skrócie pub-sub, jest to wzorzec przesyłania wiadomości. Komponenty wysyłające wiadomości (publishers) nie wysyłają ich do konkretnie określonej listy odbiorców, nie wiedzą nawet czy ktokolwiek wiadomość otrzyma. Komponenty odbierające wiadomość (subscribers) nie wiedzą kto wysyła daną wiadomość. Obie strony dzieli „kanał komunikatów”. To ten byt na który publikujący wypycha wiadomości i z którego subskrybent owe wiadomości odbiera. Największą zaletą tego wzorca jest łatwość dodawania kolejnych elementów do już istniejącej układanki. 

W Redisie kanał komunikatów jest pewnym kluczem. W moim przykładzie będzie to klucz o nazwie "messbr". Poniżej znajduje się kod subskrybent:

![51](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/51.png?raw=true)

Metoda SUBSCRIBE "subskrybuje" klienta do określonych kanałów. Po odpaleniu tego kodu w konsoli wyświetla on:

![52](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/52.png?raw=true)

Jest to wiadomość powitalna, informująca nas, że połączyliśmy się. Po wyświetleniu wiadomości program blokuje się w oczekiwaniu na kolejne komunikaty. Gdy teraz w Redis-cli użyjemy komendy PUBLISH, która publikuje wiadomość do wybranego kanału:

![53](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/53.png?raw=true)

Wiadomość ta zostanie odrazu wyświetlona za pomocą naszego programu:

![54](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/54.png?raw=true)

Pozwala nam to na szybką komunikację międzyprocesową i jeśli zajdzie potrzeba to też na komunikację między osobnymi maszynami. Dodatkowo można się subskrybować nie na konkretny kanał, a na pattern. Oznacza to, że jeśli w aplikacji mamy kanały:
- messbr_1
- messbr_2
- messbr_3
i chcielibyśmy, korzystając z jednego subskrybenta, podłączyć się do tych kanałów, możemy po prostu podłączyć się pod pattern "messbr_*". Poniżej kod, który podłącza nas do takiego pattern:

![55](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/55.png?raw=true)

Metoda PSUBSCRIBE "subskrybuje", podłącza nas do wybranego pattern. Kod odpalony w konsoli wyświetla nam na razie jedynie wiadomość powitalną i oczekuje na kolejne komunikaty:

![56](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/56.png?raw=true)

Gdy teraz w Redis-cli opublikujemy kilka wiadomości na różnych kanałach, ale znajdujących się w jednym pattern:

![57](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/57.png?raw=true)

To nasz program odrazu wyświetli je wszystkie:

![58](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/58.png?raw=true)

##### Strumienie
Strumienie to nowy typ danych wprowadzony w Redis 5.0, który modeluje strukturę danych dziennika w bardziej abstrakcyjny sposób. Jest to typ danych, który pracuje w trybie „append-only”. Znaczy to tylko tyle, że wiadomości które "wlejemy" do strumienia lądują na jego końcu. Nie można dodawać elementów w konkretne miejsce strumienia. W odróżnieniu od list i pub-sub, strumienie pozwalają na przesyłanie danych nieco bardziej ustrukturyzowanych niż stringi. Każda wiadomość w strumieniu ma swoje unikalne ID, generowane przez Redisa lub ustawione przez użytkownika.

Podstawowymi poleceniami używanymi do pracy ze strumieniami są XADD oraz XREAD. Pierwsza z nich dołącza określony wpis do strumienia o określonym kluczu. Wpis składa się z zestawu pole-wartość. XREAD odczytuje dane z jednego lub wielu strumieni, zwracając tylko wpisy o ID większym niż ostatni odebrany zgłosozny przez "dzwoniącego". Polecenie to ma opcję blokowania. Poniżej kod z wykorzystaniem tych dwóch metod:

![59](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/59.png?raw=true)

Parametr block określa czy i jeśli tak to na ile milisekund funkcja ma być zablokowana. Umożliwia to używanie jej w pętli. Program dodaje do strumienia słownik i odczytuje z niego podaną w parametrze country ilość elementów. Efektem wykonania programu jest:

![60](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/60.png?raw=true)

Liczba, która została wyświetlona to ID elementu strumienia. 

Dane ze strumienia nie są kasowane. Ma to kilka konsekwencji, np. jeśli program z poprzedniego „rozdziału” zostanie uruchomiony np. 5 razy to zawsze będzie odczytywana ze strumienia pierwsza dodana do niego wartość, mimo że za pomocą xadd będą dodawane nowe wartości. By to sprawdzić uruchomiłam mój program jeszcze 3 razy. Za 4. razem zmieniłam count na 3:

![61](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/61.png?raw=true)

![62](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/62.png?raw=true)

W odpowiedzi otrzumałam trzy ostatnie elementy strumienia. 

![63](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/63.png?raw=true)

Jest to zachowanie pożądane, ponieważ musimy jawnie oznaczyć wiadomość jako przetworzoną. Sprawia to że żaden niechciany exception nie spowoduje, że elementy będą nam ginąć.

W poprzednim programie zdefiniowałam "0-0", czyli chęć otrzymywania zawartości od początku. Jeśli w miejscu tym zamienimy "0-0" ma "$" to będziemy otrzymywać jedynie nowe elementy. Poniżej kod wykorzystujący tą właściwość, jak i argument block.

![64](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/64.png?raw=true)

Przed jego uruchomieniem należy wyczyścić naszą bazę. Można to zrobić w Redis-cli za pomocą FLUSHALL.

![65](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/65.png?raw=true)

Teraz, po uruchomieniu programu co 50ms wyświetla nam się pusta tablica. 

![66](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/66.png?raw=true)

Gdy w Redis-cli dodamy wpis do strumienia za pomocą XADD:

![67](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/67.png?raw=true)

To nasz program pokaże ten nowy element:

![68](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/68.png?raw=true)

Ulepszony kod:

![69](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/69.png?raw=true)

Tylko pierwsze XREAD jest z "$". Kolejne zawierają ID ostatnio odczytaj wiadomości. Bez tego wiadomości wysłane pomiędzy jednym blokiem a drugim będą ginąć. Po odpaleniu program czeka na jakieś wiadomości:

![70](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/70.png?raw=true)

Gdy za pomocą Redis-cli dodam do strumienia element:

![71](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/71.png?raw=true)

To zostanie od wyświetlony przez nasz program:

![72](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/72.png?raw=true)

Elementu nadal po odebraniu zostają w strumieniu. Potwierdzenie przetworzenia to wywołanie metody XACK. Jednak metoda ta jest dostępna w przypadku grupowania konsumentów (programów podłączonych do strumienia), więc jeśli chcemy zrobić to bez grupowania musimy użyć XDEL. Metoda ta usuwa okreslony wpis ze strumienia i zwraca liczbę usuniętych wposów, która może się różnić od liczby ID przekazanych do polecenia, jeśli pewnie ID nie istnieją.

![73](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/73.png?raw=true)

Po uruchomieniu programu czeka on na wiadomości:

![74](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/74.png?raw=true)

Dodałam dwa elementy do strumienia:

![75](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/75.png?raw=true)

Zostały one odebrane:

![76](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/76.png?raw=true)

Różnicą w tym kodzie jest to, że wiadomości po odebraniu są usuwane. Można to sprawdzić używając XREAD:

![77](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/77.png?raw=true)

Poprosiłam o wyświetlenie 5 elementów, a zostały wyświetlone tylko dwa z poprzednich przykładów. Elementy dodane przeze mnie przed chwilą zostały usunięte.

##### Pipelining
Pipelining to „przetwarzanie potokowe”. Często mamy do wykonania na kluczach jakąś sekwencję operacji. Do komunikacji z Redisem wykorzystywany jest protokół TCP. Przesyłanie danych przez sieć zawsze trwa. Szczególnie w sytuacji, kiedy wykonujemy kilka (tysięcy) operacji następujących po sobie. Aby skrócić RTT (Round Trip Time) Redis udostępnia mechanizm pipelining. Pozwala on wysłać wiele komend do Redisa „za jednym razem” – oszczędzamy tym samym czas którego potrzebujemy żeby przesłać dane przez sieć. Poniżej znajduje się przykład, który idealnie pokazuje różnicę między podejściem tradycyjnym a pipeliningiem:

![78](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/78.png?raw=true)

![79](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/79.png?raw=true)

Pierwszy czas jest czasem tradycyjnego sposobu, a czas drugi to czas pipeliningu. Jak widać różnica w czasach jest spora i oczywiście jest znacznie bardziej zauważalna, gdy wartości i oraz j są większe.

Trzeba zapamiętać, że istnieje zagrożenie wysycenia pamięci RAM. Redis w momencie pipe.execute() zwraca rezultat każdej operacji, więc oczywistym jest że wyniki wszystkich komend musi kolejkować w pamięci. Dlatego trzeba z  głową dobierać maksymalną ilość komend uruchamianych pod pipelinem. Dodatkowym atutem podejścia z użyciem pipelining jest to, że przekłada się na wzrost wydajności samego serwera Redisa. Wynika to z faktu że dla Redisa koszt wyciągnięcia jakieś danej z klucza jest niski, ale odesłanie jej via TCP – już niekoniecznie. Pipeline sprawia, że Redis odpowiada „raz, a dobrze”.

##### Transakcje
Transakcje to jedno z podstawowych pojęć współczesnych systemów baz danych. Umożliwiają one współbieżny dostęp do zawartości bazy danych. Ich istotą jest integrowanie kilku operacji w jedną niepodzielną całość. Uzyte wcześniej pipeliny idealnie łączą się z ideą teansakcyjności. Kawałek kodu, który wcześniej został pokazany jest w pełni transakcyjny. Metoda PIPELINE, która zwraca context managera może przyjąć dodatkowy parametr o nazwie transaction mający domyślną wartość ustawioną na True.

Transakcje w Redisie zapewniają, że komendy pod transakcją wykonują się sekwencyjnie i nie ma możliwości by taki ciąg komend został przerwany przez innego klienta tego samego serwera oraz, że ciąg komend pod transakcją jest atomowy. Albo wszystkie komendy zostaną wykonane albo żadna. 

Do pracy z transakcjami używane są komendy:
- MULTI
- EXEC
- DISCARD
- WATCH.

MULTI rozpoczyna transakcję. Kolejne polecenia są umieszczane w kolejce do atomowego wykonania przy użyciu EXEC. Zwraca ona rezultat wykonanych komend. DISCARD opróżnia wszystkie poprzednio umieszczone w kolejce polecenia. WATCH zaznacza klucze, które mają być obserwowane w celu warunkowego wykonania transakcji. Pozwala na detekcję tego, czy klucze nie zmieniły się od czasu kiedy zaczęliśmy je obserwować. Jeśli się zmieniły to komenda EXEC zakończy się błędem.

Transakcja może się nie udać z dwóch powodów: przed wykonaniem EXEC np. składnia komendy jest niepoprawna, po wykonaniu EXEC np. efekt wykonania się komendy nie jest poprawny (np. komenda niedopasowana do typu). W pierwszym przypadku cała transakcja zostanie odrzucona, w drugim – zostanie wykonana ta część transakcji która się udała. Zachowanie w drugim przypadku nie jest spójne z bazami SQL, gdzie taka transakcja zostałaby odrzucona.

Przykład użycia opisanych metod:

![80](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/80.png?raw=true)

Najpierw oznaczamy klucz key jako ten do obserwowania. Nastepnie rozpoczynamy transakcję. Za pomocą metody GET pobieramy wartość klucza. Otrzymujemy QUEUED. Dzieje się tak ponieważ, połączenie Redis jest w kontekście żądania MULTI. Polecenie jest umieszczene w kolejce, która zostanie wykonana po wywołaniu EXEC. Następnie wykonujemy właśnie metodę EXEC, która zwraca nam informację o niepowodzeniu. 

##### Lua
Lua to skryptowy język programowania. Pierwotnie projektowany był w celu rozszerzenia funkcjonalności różnych aplikacji, jednak jest często używany jako samodzielny język. Składnia tego języka jest prosta i przypomina składnię większości języków programowania. W odróżnieniu od Pythona, Lua jest daleki od podejścia „batteries included”, co sprawia, że pełny interpreter tego języka to zaledwie 247 kB. A to natomiast powoduje, że w pełni pasuje do tego do czego był tworzony – do rozszerzania możliwości innych aplikacji. I dokładnie w takim kontekście wykorzystuje go Redis. Poniżej znajduje się przykład kodu z wykorzystaniem języka Lua:

![81](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/81.png?raw=true)

Wykonywana jest komenda EVAL, do której przekazywane jest ciało skryptu napisanego w LUA. Redis odbiera ten kod, wykonuje i zwraca rezultat:

![82](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/82.png?raw=true)

Pierwszym argumentem EVAL jest skrypt Lua. Drugi argument parametru EVAL to ilość argumentów które można przekazać do skryptu. Jeśli podamy tam wartość n to kolejne n argumentów, które przekażemy do funkcji będą przekazane również do skryptu. W skrypcie będą one dostępne w tabeli KEYS (Lua indeksuje tabele od 1!). Wszystko przekazane po określonej liczbie n, zostanie przekazane do tabeli ARGV. Kod z wykorzystaniem tablic KEYS i ARGV:

![83](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/83.png?raw=true)

Określamy w kodzie, że dwa pierwsze parametry będą znajdować się w tablicy KEYS, a kolejne w tabeli ARGV. Skrypt odczytuje dane i je zwraca:

![84](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/84.png?raw=true)

Inny przykład to wygenerowanie listy 15 liczb:

![85](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/85.png?raw=true)

![86](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/86.png?raw=true)

Działa to tak samo jak w innych językach programowania. Definiujemy tabelę arr. Mamy pętlę for która podstawia do tej tabeli kolejno zwiększające się liczby aż do 15. Na końcu tabela jest zwracana, by móc ją wyświetlić. 

Przykład pracy w formacie danych JSON:

![87](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/87.png?raw=true)

Przekazujemy jedną zmienną do tablicy KEYS, ale jest ona w formacie JSON i składa się z x=20 i y=22. Skrypt w języku LUA pobiera tą daną, dekoduje a następnie dodaje x do y.

![88](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/88.png?raw=true)

Skrypty w Redisie pojawiły się by rozwiązać problem sytuacji kiedy potrzebujemy coś pobrać z Redisa, przetworzyć i zapisać wynik z powrotem lub rozpropagować go po większej ilości kluczy. Celem ogólnym jest zmniejszenie ilości interakcji po sieci przez przeniesienie części logiki właśnie do Redisa. Żeby można było tego dokonać, trzeba umieć wykonywać komendy Redisowe ze skryptów Lua. Przykład:

![89](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/89.png?raw=true)

Wykonywany jest skrypt, który odczytuje wartość z pod klucza key1, dodaje do niej wartość przekazaną jako argument i wynik zapisuje jako wartość w kluczu key2. Skrypt zwraca nil, dlatego program najpierw wyświetla None, a potem dopiero wynik dodawania czyli 222.

![90](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/90.png?raw=true)

Inny przykład:

![91](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/91.png?raw=true)

Najpierw przygotowujemy dane. Określana jest nazwa uprawnienia, wypełniana jest grupa użytownikami i ich ID i dodane jest uprawnienie do listy przechowującej wszystkie możliwe uprawnienia. Do skryptu Lua przekazywane jest ID grupy i uprawienie, które chcemy rozpropagować. Skrypt sprawdza czy uprawnienie jest poprawne czyli czy znajduje się w zbiorze poprawnych i jeśli tak to dla każdego użytkownika w grupie dodaje uprawnienie. Ewentualną duplikację uprawnień załatwiamy odpowiednim typem danych, klucz „user_permissions:ID” jest SETtem, więc nie pozwala na duplikacje. Skrypt zwraca true/1, gdy dodanie uprawnienia powiodło się:

![92](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/92.png?raw=true)

Redis pozwala na zapisanie ciała skruptu u siebie i posługiwanie się skrótem SHA w celu jego uruchomienia. Skrypt zapisujemy komendą SCRIPT LOAD gdzie jako argument podajemy skrypt a zwraca on nam skrót, którego możemy użyć w celu uruchomienia naszego kawałka kodu LUA. Możemy tak zedytować nasz powyższy kod:

![93](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/93.png?raw=true)

##### Notyfikacje redisowe
Notyfikacje to powiadomienia które wysyła Redis (via publish na konkretnym kanale) generowane w momencie pracy na innych kluczach. Można je włączyć na dwa sposoby. Jeden z nich jest trwały, tj ustawienie jest respektowane nawet po restarcie Redisa, a drugi pozwala na konfigurację ulotną. Oczywiście tę drugą można zapisać i tym samym sprawić, że zostanie zapamiętana.

Program, który nasłuchuje każdą zmianę klucza wynikającą z komend dedykowanych stringowi:

![94](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/94.png?raw=true)

Program wypisuje wiadomość powitalną i oczekuje na zmiany:

![95](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/95.png?raw=true)

W Redis-cli ustawiamy wartość klucza test_key na 22:

![96](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/96.png?raw=true)

Co powoduje wyświetlenie tego przez program:

![97](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/97.png?raw=true)

Teraz w Redis-cli wykonujemy komendę APPEND:

![98](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/98.png?raw=true)

Na co program reaguje wyświetleniem powiadomienia:

![99](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/99.png?raw=true)

Teraz usuńmy klucz:

![100](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/100.png?raw=true)

Wykonajmy komendę LPUSH:

![101](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/101.png?raw=true)

Nasz program nie zareagował na tą zmianę, ponieważ publikuje on tylko zdarzenia wygenerowane w wyniku użycia komend dedykowanych stringom.

![102](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/102.png?raw=true)

Poniższy kod działa podobnie, ale po wykonaniu komendy SET jako wiadomość przyjdzie nazwa klucza, na której komenda ta została wykonana:

![103](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/103.png?raw=true)

Po uruchomieniu kodu wyświetlana jest wiadomość powitalna:

![104](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/104.png?raw=true)

Następnie, gdy wykonam komendę SET w Redis-cli:

![105](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/105.png?raw=true)

Program wyświetli w wiadomości nazwę klucza, na której wykonany został SET:

![106](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/106.png?raw=true)

##### Walrus
Walrus to alternatywny sposób pracy z Redisem. Instalacja:

![107](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/107.png?raw=true)

Przykładowy kod:

![108](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/108.png?raw=true)

Walrus ukrywa za wygodną implementacją komendy Redisowe dając tym samym API naśladujące Pythonowe rozwiązania.

Walrus umożliwia tworzenie modeli:

![109](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/109.png?raw=true)

Utworzony został model książki, która posiada id (typ UUIDField, atomatycznie staje się kluczem głównym), tytuł, opis, ilość stron i tagi. Na końcu utworzona została jedna konkretna książka.

Uruchomienie tego kodu generuje kilka kluczy w Redisie:

![110](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/110.png?raw=true)

Za pomocą HGETALL można wyświetlić wszystkie wartości przypisane do naszej książki:

![111](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/111.png?raw=true)

##### Nieużywane klucze
Redis w prosty sposób umożliwia sprawdzenie ile czasu minęło od użycia klucza:

![112](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/112.png?raw=true)

##### Szukanie dużych kluczy
Redis dostarcza narzędzie pozwalające określić największe elementy:

![113](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/113.png?raw=true)


#### Django + Redis + Celery

![132](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/132.png?raw=true)

Do wykonania tego polecenia zainstalowałam Redisa na komputerze. Nie korzystałam już z Dockera. 

![114](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/114.png?raw=true)

Prócz pakietów Pythona: Django, Celery i redis musiałam zainstalować też Pillow i django-widget-tweaks, gdzie Pillow to pakiet niezwiązany z Celery do przetwarzania obrazu, a Django Wdget Tweaks to wtyczna Django zapewniająca elastyczność w sposobie renderowania danych wejściowych formularzy.

By zintegrować Celery z projektem Django należy utworzyć plik celery.py w folderze naszego projektu. W nim importujemy pakiet os i klasę Celery z pakietu celery.

![115](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/115.png?raw=true)

Używamy modułu os do powiązania zmiennej DJANGO_SETTINGS_MODULE z ustawieniami naszego projektu Django. Następnie tworzymy instancję klasy Celery, aby utowrzyć zmienną instancji celery_app. Aktualizujemy konfigurację aplikacji Celery za pomocą ustawień i na końcu "mówimy" nowo utworzonej celery_app, by automatycznie wykrywała zadania w projekcie. 

W pliku settings.py na końcu zdefiniowałam ustawienia dotyczące Celery:

![116](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/116.png?raw=true)

Ustawienia te informują Celery, by używał Redis jako message broker, a także gdzie się z nim łączyć. Zdefiniowany został typ wiadomości jako MIME application/json. Inne typy będą odrzucane z błędem. 

By upewnić się, że wcześniej utworzona i skonfigurowana aplikacja Celery zostanie "wstrzyknięta" do aplikacji Django, gdy zostanie uruchomiona należy w głównym skrypcie init.py (z pokreśleniami po bokach) zaimportować aplikację Celery i zarejestrować ją jako symbol przestrzeni nazw w pakiecie Django image_parroter.

![117](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/117.png?raw=true)

W aplikacji thumbnailer utworzyłam plik tasks.py. Na początku, by upewnić się, że wszystko działa utworzyłam tam proste zadanie dodające dwie liczby.

![118](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/118.png?raw=true)

W INSTALLED_APPS w pliku settings.py należy dodać aplikację widget_tweaks.

![119](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/119.png?raw=true)

By sprawdzić, czy nasz task z dodawaniem działa należy mieć odpalony redis-server w jednym terminalu. W drugim należy uruchomić program Celery:

![120](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/120.png?raw=true)

Wyświetlony zostaje tutaj nasz task adding_task. W trzecim terminalu można przetestować adding_task:

![121](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/121.png?raw=true)

Jak widać, działa! Metoda .delay() używana jest do przekazywania wszelkich niezbędnych parametrów do obiektu zadania, a także inicjowania wysyłania go do message broker'a i kolejki zadań. Wynikiem wywołania tej metody jest obiecana wartość zwracana typu celery.result.AsyncResult. Ta zwracana wartość zawiera informacje, takie jak identyfikator zadania, jego stan wykonania i stan zadania, a także możliwość dostępu do wyników wygenerowanych przez zadanie za pośrednictwem metody .get().

W pliku tasks.py tworzę zadanie, które będzie tworzyło miniaturkę podanego obrazu i zwracało miniaturkę + oryginalne zdjęcie w pliku zip. Zacząć trzeba od odpowiednich importów. Potrzebne będzie nam, prócz os i shared_task używanych wcześniej, zipfile, by móc tworzyć pliki zip, PIL z pakietu Image, który umożliwia ładowanie i tworzenie nowych obrazów i django.conf.

![122](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/122.png?raw=true)

W zadaniu na początku przygotowujemy zmienne, których będziemy używac póżniej. Rozdzielamy ścieżkę do pliku na nagłówek i koniec. Końcem jest nazwa naszego pliku. Następnie nazwę tą dzielimy na nazwę i rozszerzenie. Tworzymy nazwę pliku zip, do którego będziemy zapisywać obrazy i przygotowujemy zmienną results, w której przechowywany jest adres URL, z którego będzie można pobrać zipa. 

![123](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/123.png?raw=true)

Dalej znajduje się sekcja try, w której otwieramy plik obrazu. Tworzymy plik zip i zapisujemy w nim oryginalny obraz. Następnie usuwana jest ścieżka do tego pliku. Poniżej znajduje się pętla for, w której kopiowany jest oryginalny obraz, tworzona jest miniaturka dla wymiarów w i h, tworzona jest również zmienna z nazwą miniaturki, zapisywana jest zmniejszona kopia oryginalnego obrazu pod inną nazwą i jest ona również zapisywana w archiwum zip. Na koniec usuwana jest ścieżka pliku z miniaturką. Jeśli nie uda się wykonać sekcji try, ponieważ np. chcemy uruchomić plik, który nie istnieje, to łapany i zwracany jest błąd. Na koniec zwracany jest URL zapisany pod zmienną results.

![124](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/124.png?raw=true)

W pliku settings.py definiuje lokalizacje, w której mogą znajdować się pliki obrazów i archiwa zip (MEDIA_ROOT), a także MEDIA_URL, IMAGES_DIR i tworzę warunek if, który w przypadku nie istniejących lokalizacji MEDIA_ROOT lub IMAGES_DIR, tworzy je.

![125](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/125.png?raw=true)

W pliku views.py utworzyłam 3 klasy. Pierwsza z nich to FileUploadForm(forms.Form), która jest po prostu formularzem z jednym polem wejściowym:

![126](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/126.png?raw=true)

Następną klasą jest HomeView. Jest to widok strony domowej. Posiada dwie metody. Pierwsza z nich get zwraca szablon i przekazuje mu formularz (FileUploadForm):

![127](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/127.png?raw=true)

Druga metoda to post. Konstruuje ona obiekt FileUploadForm przy użyciu danych przesłanych w żądaniu. Następuje weryfikacja danych, jeśli są one poprawne do plik zapisywany jest w IMAGES_DIR. Uruchamiane jest zadanie make_thumbnails. Pobierane jest id zadania i jego status. Status jest przekazywany do zwracanego szablonu. Jeśli dane są niepoprawne to zwracany jest formularz z błędami do szablonu home.html.

![128](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/128.png?raw=true)

Ostatnia klasa używana jest przez żądanie AJAX do sprawdzenia statusu zadania make_thumbnails.

![129](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/129.png?raw=true)

Utworzyłam plik urls.py w folderze aplikacji i zdefiniowałam w nim dwie ścieżki:

![130](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/130.png?raw=true)

Następnie zedytowałam plik urls.py w folderze projektu:

![131](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/131.png?raw=true)

Umieściłam w nim odwołanie do ścieżek z aplikacji i dodałam kawałek kodu, który umożliwia udostępnianie plików przesłanych przez użytkownika. 

Utworzyłam szablon home.html, w którym wykorzystałam Bootstrapa, Bulmę i Fontawasome.

![133](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/133.png?raw=true)

W sekcji body znajduje się navbar Bootsrapa i poniżej formularz umożliwiający wybranie pliku.

![134](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/134.png?raw=true)

Na dole mamy sekcję ze skryptem:

![135](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/135.png?raw=true)

Tworzone jest odniesienie do pola wejściowego (input) pliku. Następnie, jeśli nastąpi zdarzenie change to wykonywana jest funkcja, która dodaje nazwę wybranego pliku do interfejsu użytkownika. 

Poniżej znajduje się warunek if. Sprawdzamy, czy istnieje id task_id, które jest przekazywane z widoku HomeView. Wskazuje ono odpowiedź po przesłaniu zadania make_thumbnails. Tworzony jest odpowiedni adres URL do sprawdzania statusu zadania. Pobierany jest element, za pomocą którego wyświetlana będzie informacja o progresie. Wywoływana jest funkcja aktualizująca powyższy element (updateProgressTile) i wywoływana jest metoda setInterval(), która wykonuje pewną funkcję co określony czas (800ms):

![136](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/136.png?raw=true)

W funkcji wykonywanej co 800s do pobrania statusu zadania wykorzystywany jest już wcześniej poznany na zajęciach axios. Odpowiedź jest zapisywana i sprawdzana. Jeśli status jest równy "SUCCESS" to wywoływana jest funkcja clearTimer() (opisana kawałeczek dalej). Tworzony jest adres url, z którego pobierany będzie plik zip, tworzony jest element a jest on wstawiany na koniec sekcji body, nie jest om jednak wyświetlany. Definiowane jest łącze i plik, który zostanie pobrany, gdy użytkownik kliknie hiperłącze. Użytkownik jednak nic sam nie klika. Na elemencie a wywoływana jest funkcja click(), która sama wywołuje kliknięcie, co powoduje rozpoczęcie pobierania. Na koniec element a jest usuwany.

![138](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/138.png?raw=true)

W innym przypadku wywoływana jest funkcja clearTimer(). Przekazywany jest do niej argument w postaci tekstu z informacją o błędzie. Funkcja clearTimer czyści timer uruchomiony za pomocą setInterval() i zmienia tekst wyświetlany na stronie.

![137](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/137.png?raw=true)

Funkcja updateProgressTile, która wyświetla "progress images ..." i "porusza" kropkami:

![139](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/139.png?raw=true)

Gdy wejdziemy na strone ukazuje nam się guzik, który wciskamy by przesłać plik. Ważne jest, by przed odpaleniem strony mieć uruchomiony serwer Redis i aplikację Celery!

Wyskakuje okno, gdzie możemy wybrać zdjęcie z plików na naszym komputerze:

![140](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/140.png?raw=true)

Po wybraniu pliku jego nazwa jest widoczna w polu formularza:

![141](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/141.png?raw=true)

Wciskamy Submit i wyświetlany jest tekst, że strona jest w trakcie przetwarzania obrazów:

![142](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/142.png?raw=true)

Gdy przetwarzanie kończy się wyświetlany jest napis, by sprawdzić pobrane pliki i plik .zip jest pobierany automatycznie:

![143](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/143.png?raw=true)

Przetwarzanie obrazów może się też nie powieść, wtedy wyświetlana jest wiadomość o zaistniałym błędzie.

W pobranym zipie znajdują się dwa zdjęcia: oryginalne i miniaturka o wymiarach 128x128 pixeli:

![144](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/144.png?raw=true)

Przesłany obraz, miniaturka i otrzymany plik zip jest zapisywany również w folderze media/images:

![145](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium7/screenshots/145.png?raw=true)


#### Praca z workerami w Celery
...









