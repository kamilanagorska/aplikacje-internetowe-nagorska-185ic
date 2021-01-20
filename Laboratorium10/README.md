### Laboratorium 10

Django + React (aplikacja typu ToDo)
Backend napisany w Django, a frontend napisany za pomocą React.js.

Utworzyłam aplikację z planami związanymi z uczelnią. Można dodawać tam egzaminy, kolokwia lub sprawozdania, które musimy wykonać. Każde wydarzenie jest powiązane z przedmiotem i ma swój "deadline".

#### Spis treści:
- Backend - Django [TUTAJ](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/tree/main/Laboratorium10#backend----django)
- Backend - działanie [TUTAJ](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/tree/main/Laboratorium10#dzia%C5%82anie-backendu)
- Frontend - React.js [TUTAJ](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/tree/main/Laboratorium10#frontend-reactjs)
- Frontend - działanie [TUTAJ](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/tree/main/Laboratorium10#dzia%C5%82anie-frontendu)

#### Backend -  Django
Utworzyłam model planu. Plan ma tytuł, opis, przedmiot i date (czyli deadline). Na model ten składa sie też pole done, które będzie informowało nas, czy dane zadanie zostało wykonane, czy nie.

![1](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/1.png?raw=true)

Do wykonania tego projektu musiałam zainstalować dwa pakiety: django-cors-headers i djangorestframework. Oba już dobrze znane z poprzednich zajęć. Umieściłam je w zainstalowanych aplikacjach w ustawieniach. Oczywiście dla CORS musiałam dodać oprogramowanie pośredniczące, pamiętając, by umieścić je przed CommonMiddleware!

![2](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/2.png?raw=true)

Umieściłam w ustawieniach również ustawienia CORS, czyli wyłączyłam go dla wszystkich domen, a do Whitelist dodałam adres, pod którym znajduje się mój frontend, ponieważ chce, by miał on dostęp do backendu, czyli by mógł pobierać plany i wykonywać na nich różne operacje. Bez tego ustawienia pojawia się błąd Same Origin Policy w przeglądarce internetowej. 

![3](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/3.png?raw=true)

Utworzyłam serializer, który będzie zarzadzać serializacją i deserializacją z formatu JSON. Wybrałam pola, które mają zostać uwzględnione (wszystkie).

![4](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/4.png?raw=true)

Utworzyłam widok PlanView. Jest to jedyny widok i do tego bardzo prosty. Zwraca on wszystkie obiekty Plan, jakie istnieją w bazie danych. 

![5](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/5.png?raw=true)

Do zdefiniowania adresów url wykorzystałam obsługę automatycznego trasowania adresow URL (Routers). Pod adresem api/plans/ będzie znajdować się lista wszystkich planów i będziemy mogli wykonywać tam operacje Create i Read, a pod adresem /api/plans/id pojawi się tylko jedno wybrane zdarzenie i będzie tam można wykonywać operacje Update i Delete.

![6](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/6.png?raw=true)


#### Działanie backendu
Gdy wejdę na localhost:8000/api/plans ukazuje się lista utworzonych przeze mnie planów. 

![7](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/7.png?raw=true)

Mogę tutaj odczytywać zaplanowane zdarzenia (Read) oraz dodawać nowe (Create).

![8](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/8.png?raw=true)

Utworzę nowy obiekt Plan, by pokazać, że tworzenie działa:

![9](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/9.png?raw=true)

Po wciśnięciu POST, gdy zobaczymy teraz listę wszystkich planów ukazuje nam się (na samym końcu) plan utworzony przed chwilą:

![10](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/10.png?raw=true)

Gdy przejdziemy teraz do np. localhost:8000/api/plans/27, ukaże nam się tylko jeden plan o id równym 27. Mogę go tutaj edytować (Update) i usunąć (Delete). 

Zedytuje plan, by pokazać, że działa:

![11](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/11.png?raw=true)

Po wciśnięciu PUT strona odświeża się i wyświetla się plan ze zmienionym opisem:

![12](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/12.png?raw=true)

Usunę teraz ten plan, wciskając guzik DELETE:

![13](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/13.png?raw=true)

Jak widać, ostatnim planem nie jest już ten o id równym 27, ponieważ go usunęłam:

![14](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/14.png?raw=true)

Oczywiście plany są widoczne również w panelu administratora Django.

![15](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/15.png?raw=true)

![16](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/16.png?raw=true)


#### Frontend React.js

#### Działanie frontendu