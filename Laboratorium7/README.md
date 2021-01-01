### Laboratorium 7
Python + Redis + Django

Redis jest skrótem od REmote DIctionary Service. Jest to nowoczesna baza danych NoSQL typu klucz-wartość. 
Magazyn klucz–wartość korzysta z asocjacyjnej tablicy (znanej również jako mapa lub słownik) jako podstawowego modelu danych. W tym modelu dane są reprezentowane jako zbiór par klucz–wartość, tak że każdy możliwy klucz pojawia się najwyżej jeden raz. Dane przechowywane są w pamięci RAM, dzięki czemu dostęp do nich jest znacznie szybszy niż w przypadku tradycyjnych rozwiązań. Serwer Redis ma gigantyczne znaczenie dla cache oraz na przechowywanie danych sesji klientów. Poprawia czas wczytywania i wydajność strony. Im większa i chętniej odwiedzana jest dana strona, tym większy pozytywny wpływ na jej działanie.


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


