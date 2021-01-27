### Laboratorium 8

Czat z użyciem socket.io + wykorzystanie Web Workers.


#### Chat - FunChat
Postanowiłam wdrożyć przykład z socket.io z [tej](https://socket.io/get-started/chat/) strony.

Utworzyłam chat o nazwie FunChat. Prócz podstawowego chatu opisanego w przykładzie, dodałam kilka modyfikacji, które zostały zaproponowane na stronie właśnie z tym przykładem jako 'homework'.

Moje modyfikacje:
- strona z logowaniem, każdy przed dołączeniem do czatu musi wpisać nazwę użytkownika, która potem jest wyświetlana przed jego wiadomością, nazwy użytkowników mają różne kolory
- wyświetlanie napisu "is typing", gdy ktoś coś pisze.


W pliku html utworzyłam element ul o klasie pages i w nim mam dwa elementy li, jeden to strona logowania, drugi to strona z czatem. W zależności od sytuacji jedna strona jest ukrywana, a druga pokazywana.

![1](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/1.png?raw=true)

W pliku index.js inicjowana jest nowa instancja socket.io i obsługiwane są tam główne wydarzenia (add user, chat message, typing, stop typing). Wszystkie te zdarzenia sa obsługiwane, pod warunkiem, że zostanie obsłużone zdarzenie connection, czyli jeśli nastąpi udane połączenie.

![2](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/2.png?raw=true)

- 'add user' - tworzenie użytkownika i wysyłanie zdarzenia login, które jest obsługiwane w pliku scripts.js:

![3](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/3.png?raw=true)

- 'chat message' - tworzenie wiadomości, w pliku scripts.js jest wysyłane zdarzenie 'chat message' i po jego wysłaniu następuje wykonanie poniższego kodu, powoduje wysłanie wiadomości do każdego:

![4](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/4.png?raw=true)

- 'typing' i 'stop typing' potrzebne do wyświetlania napisu 'is typing...' i jego usuwania, zdarzenie 'typing' lub 'stop typing' jest wysyłane do każdego (broadcast) z odpowiednią nazwą użytkownika, który właśnie pisze lub zakończył pisanie:

![5](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/5.png?raw=true)

Na samym końcu pliku serwer ustawiany jest, by nasłuchiwał na porcie 3000. W konsoli wyświetlane jest 'listening on *:3000':

![6](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/6.png?raw=true)

W pliku scripts.js znajdują się między innymi funkcje wyświetlające wiadomości, czy pobierające wartości wpisane przez użytkowników. Na początku tego pliku zdefiniowałam tablicę z kolorami (takie kolory będą miały nazwy użytkowników), pobrałam potrzebne elementy dokumentu html i zdefiniowałam kilka potrzebnych zmiennych:

![7](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/7.png?raw=true)

Poniżej zdefiniowałam kilka metod:
- setUsername - pobiera nazwę uzytkownika z inputa o klasie usernameInput, wyświetla stronę z chatem, a ukrywa tą z logowaniem, gdy username zostanie podany. Wysyłane jest zdarzenie 'add user', które obsługiwane jest w pliku index.js (wyżej opisane):

![8](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/8.png?raw=true)

- sendMessage - pobiera wiadomość wpisaną przez użytkownika, czyści inputa odpowiedzialnego za wiadomości, wywoływana jest metoda, która umożliwia wyświetlanie wiadomości i wysyłane jest zdarzenie 'chat message' obsługiwane w index.js:

![9](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/9.png?raw=true)

- showChatMessage - tworzone są tutaj elementy span z nazwą użytkownika i wiadomością, wiadomość może mieć wartość 'is typing..', jeśli użytkownik pisze właśnie wiadomość. Następnie elementy span umieszczane są w li i ten element li jest przesyłany do metody addMessageElement():

![10](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/10.png?raw=true)

- addChatTyping i removeChatTyping - pierwsza z nich umożliwia wyświetlanie napisu 'is typing...', dokładniej pod data.message podstawiany jest ten napis i następnie wykonywana jest metoda showChatMessage dla tej wiadomości. Druga metoda usuwa napis 'is typing...', gdy osoba przestanie pisać:

![11](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/11.png?raw=true)

- addMessageElement - dodaje przekazany do niej element li na stronę, umieszczany jest on w elemencie ul o klasie messages:

![12](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/12.png?raw=true)

- getUsernameColor - obliczany jest hash dla nazwy użytkownika i na jego podstawie jest wybierany kolor dla użytkownika, ta sama nazwa zawsze ma ten sam kolor:

![13](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/13.png?raw=true)

- updateTyping - wykonywane jest, gdy nastąpi wpisywanie danych do inputa z wiadomością, zmienia wartość zmiennej typing na true jeśli ma wartość false i wysyłane jest zdarzenie 'typing':

![14](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/14.png?raw=true)

- getTypingMessages - pobiera nazwę użytkownika, który właśnie pisze:

![15](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/15.png?raw=true)

Na dole obsługiwane są różne zdarzenia:
- keydown - gdy wciśnięty zostaje enter pobierana jest wiadomość, jeśli istnieje już username lub username, jeśli jeszcze nie istnieje:

![16](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/16.png?raw=true)

- input - gdy wpisywane jest coś w inputa o klasie messages:

![17](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/17.png?raw=true)

- zdarzenia związane z socket'em (login, chat message, typing, stop typing):

![18](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/18.png?raw=true)

Tak wygląda strona po wejściu na localhost:3000:

![19](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/19.png?raw=true)

Po wciśnięciu klawisza Enter przechodzimy do strony z czatem (co ważne maksymalna ilość znaków w nazwie użytkownika to 14, nie da się wpisać więcej):

![20](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/20.png?raw=true)

Wiadomości wyświetlane są dla wszyskich użytkowników:

![21](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/21.png?raw=true)

Gdy ktoś pisze wiadomość ukazuje się napis 'is typing...':

![22](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/22.png?raw=true)

![23](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/23.png?raw=true)

Każda nazwa użytkownika ma inny kolor.

Widok konsoli:

![30](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/30.png?raw=true)


#### Dwa przykłady z Web Workerami

Stworzyłam worker wypisujący kolejne elementy ciągu  Fibonacciego i drugi worker, który wylicza największy wspólny dzielnik dla dwóch liczb. Oba działania są dość czasochłonne dla dużych liczb i bez pomocy workerów mogą być niemożliwe do wykonania dla niektórych przeglądarek internetowych. 

Ważne przy pracy z workerami jest to, że nie da się ich użyć po prostu włączając plik html. Trzeba utworzyć serwer np. za pomocą komendy python -m http.server i dopiero tak zaczną one działać.

##### Ciąg Fibonacciego
W pliku index.html utworzyłam input, do którego należy wpisać liczbę, a po wciśnięciu guzika Oblicz wywoływana jest funkcja, która tworzy Worker:

![24](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/24.png?raw=true)

Pobierana jest wprowadzona przez użytkownika liczba. Sprawdzane jest, czy przeglądarka wspiera Workery, jeśli nie to wyświetlany jest odpowiedni komunikat. Tworzony jest Worker, wykona on to, co znajduje się w pliku fibonacci.js. Przesyłam do Workera pobraną liczbę, dzieje się to za pomocą metody postMessage(). W tym momencie wykonywane jest to, co w fibonacci.js. Po przesłaniu wyniku przez funkcję z fibonacci.js następuje obsługa zdarzenia message za pomocą onmessage(). Na stronie wyświetlany jest wynik działania:

![25](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/25.png?raw=true)

W pliku fibonacci.js dodałam Event Listener na zdarzenie 'message', czyli gdy w pliku index.html nastąpi przesłanie danych do Workera nastąpi wykonanie tego, co w fibonacci.js. Sprawdzam tutaj, czy przypadkiem podana liczba nie jest ujemna, co jest niedozwolone. Co ciekawe przekazana do funkcji liczba kryje się pod zmienną data. (e.data) Jeśli jest dodatnia nastepuje wyliczanie kolejnych wartości ciągu i zapisuje je w tablicy. Na koniec tablica jest przesyłana za pomocą postMessage(). 

![26](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/26.png?raw=true)


##### NWD - Największy wspólny dzielnik
Przykład ten działa na takiej samej zasadzie co poprzedni. W pliku index.html dodałam dwa inputy, do których należy wpisać liczby.

![27](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/27.png?raw=true)

Po wciśnięciu guzika Oblicz wykonywana jest funkcja, w której tworzę drugi Worker. Tym razem przekazuję do niego dwie wartości: a oraz b.

![28](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/28.png?raw=true)

Po przesłaniu tych danych wykonywane jest to, co w pliku nwd.js. Dostęp do zmiennej a mamy tam za pomocą e.data.a, a do zmiennej b - e.data.b.

![29](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/29.png?raw=true)


##### Działanie
Jak wspomniałam wcześniej, by uruchomić pliki z Workerami muszę najpierw utworzyć serwer:

![31](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/31.png?raw=true)

Teraz, gdy wejdę w localhost:8000 wyświetla się mój plik index.html:

![32](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/32.png?raw=true)

Fibonacci dla liczby ujemnej:

![33](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/33.png?raw=true)

Fibonacci dla 30:

![34](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/34.png?raw=true)

NWD dla liczby ujemnej:

![35](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/35.png?raw=true)

NWD dla 1 i 100000 (co wymaga 99999 iteracji, by wkońcu obliczyć NWD = 1):

![36](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium8/screenshots/36.png?raw=true)