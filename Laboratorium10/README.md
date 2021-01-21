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
Musiałam zainstalować axiosa, za pomocą którego będzie można "konsumować" API. W pliku package.json zdefiniowałam proxy jako adres, na którym działa backend czyli localhost:8000. Ułatwia to pracę z axiosem i zamiast pisania axios.get("http://localhost:8000/api/plans/") wystarczy teraz napisać axios.get("/api/plans/"). 

![17](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/17.png?raw=true)

Frontend składa się głównie z pliku App.js, tam dzieje się większość rzeczy oraz komponentu Modal.js.

##### App.js
W konstruktorze zdefiniowałam stan, czyli te wartości, które będą się zmieniać w trakcie działania aplikacji.

![18](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/18.png?raw=true)

Poniżej znajdują się wszystkie potrzebne funkcje:
- componentDidMount() - uruchamia się po wyrenderowaniu komponentu do drzewa DOM, inaczej mówiąc, wykonywana jest, gdy cały komponent zostanie wyrenderowany prawidłowo. Wywoływana jest w niej funkcja refreshList().

![19](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/19.png?raw=true)

- refreshList() - pobiera plany za pomocą axiosa i zmienia stan, podstawiając pod plannedList pobrane dane.

![20](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/20.png?raw=true)

- displayDone(status) - zmienia stan viewDone na true lub false w zależności od wciśnięcia guzika done lub not done.

![21](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/21.png?raw=true)

- sortUp(property) - funkcja zwracająca funkcje, umożliwia sortowanie tablicy obiektów (w górę), ponieważ samo sort() nie zadziała w przypadku typu JSON, zwracana funkcja jest funkcją porownującą i zwracana przez nią wartość identyfikuje kolejność sortowania kolejnych elementów tablicy.

![22](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/22.png?raw=true)

- sortDown(property) - funkcja działająca tak samo jak ta powyżej opisana, jedyna różnica to to, że używana jest do sortowania w dół, a nie w górę.

![23](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/23.png?raw=true)

- sortList(property, order) - funkcja sortująca, przekazujemy do niej argument property, który przekazywany jest do funkcji porównującej i argument order, który definiuje czy sortujemy w dół, czy w górę. Zmieniamy stan, by "odświeżyć" wyświetlane treści, czyli wowoływana jest dzięki temu metoda render i zmienia się kolejność wyświetlania planów w zależności od wybranej opcji sortowania.

![24](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/24.png?raw=true)

- renderTabList() - metoda wyświetlająca guziki, które umożliwiają nam zmianę widoku planów. Wciskając guzik done, wyświetlane są tylko plany wykonane, wciskając not done te niewykonane, a dwa guziki sort by date pozwalają nam ustawić kolejność wyświetlania planów: datą rosnąco albo malejąco.

![25](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/25.png?raw=true)

- checkTodayDate(item) - sprawdza, czy data przekazanego planu jest równa dzisiejszej dacie, jeśli tak to zwraca true, jeśli nie to false.

![26](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/26.png?raw=true)

- checkPast(item) - sprawdza, czy data przekazanego planu już minęła względem dzisiejszej daty, jeśli tak zwraca true, jak nie to false.

![27](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/27.png?raw=true)

- checkTom(item) - sprawdza, czy data przekazanego planu jest równa dacie jutrzejszej, działa na takiej samej zasadzie co powyższa funkcja, jedynie ma inny warunek w if'ie i tworzona jest tutaj data jutrzejsza, by ładno porównać ją z datą planu.

![28](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/28.png?raw=true)

- renderItems - wyświetla plany w zależności od wartości stanu viewDone, jeśli jest równy false wyświetla tylko plany niewykonane (domyślnie, gdy włączymy aplikację, plany są wyświetlane właśnie w taki sposób, jest to spowodowane zdefiniowaniem w konstruktorze viewDone jako false), jeśli jest równy true to wyświetlane są plany wykonane. Wywoływane są tutaj funkcje sprawdzające datę planu i w zależności od zwracanych przez nie wartości pod opisem planu wyświetlany jest napis today, too late albo tomorrow. Wyświetlane są również dwa guziki. Jeden umożliwia edycję wybranego planu, a drugi jego usunięcie.

![29](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/29.png?raw=true)

- toggle - zmienia stan, co powoduje zamknięcie lub otwarcie modalu.

![30](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/30.png?raw=true)

- handleSubmit - wywoływane jest onSave dla modalu, czyli gdy wciśniemy guzik Save, modal jest zamykany i w zależności, czy id planu istnieje, to jest on albo aktualizowany z wykorzystaniem put() albo jest tworzony nowy plan z użyciem post().

![31](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/31.png?raw=true)

- handleDelete - wywoływane po wciśnięciu guzika Delete, ktory znajduje się obok każdego wypisanego planu, usuwa wybrany plan za pomocą delete().

![32](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/32.png?raw=true)

- createItem - wywoływane po wciśnięciu guzika Add new, tworzony jest nowy plan z pustymi wartościami, zmieniany jest stan.

![33](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/33.png?raw=true)

- editItem - wywoływane po wciśnięciu guzika Edit, który znajduje się obok każdego planu, tak samo jak Delete, zmienia stan activeItem na plan wybrany przez nas do edycji, otwierany jest modal.

![34](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/34.png?raw=true)

W render() znajduje się to, co wyświetlane na stronie. Mamy tutaj napis Planner, pod nim dzisiejszą datę, by mieć jakieś odwołanie, patrząc na daty naszych planów. Poniżej jest guzik umożliwiający dodawanie nowych zdarzeń, poniżej za pomocą funkcji renderTabList() wyświetlane są guziki done, not done i dwa sort by date, jeszcze niżej wyświetlana jest lista z naszymi planami, dzieje sie to dzięki funkcji renderItems(). Na samym dole znajduje sie warunek, jeśli this.state.modal jest równy true to wyświetlany jest modal dla activeItem, którym może być wybrany obiekt z listy planów lub nowo utworzony plan. Jeśli this.state.modal jest równy false to modal nie jest wyświetlany. Co ważne to to, że pod activeItem dla modala podstawiany jest aktualnie wybrany plan, który będzie używany w Modal.js!!! Czyli do Modal.js jest przekazywany wybrany plan.

![35](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/35.png?raw=true)

##### Modal.js
W konstruktorze zdefiniowałam stan activeItem. Jest nim ten activeItem (wybrany plan) przekazany do modala w App.js.

![36](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/36.png?raw=true)


Jedyną zdefiniowaną tutaj metodą jest handleChange. Wykonywana jest, gdy zmieni się jakaś wartość w formularzu. Z input'a, którego wartość się zmieniła, pobierana jest wartość name, czyli jaka własność planu została zmieniona i value, czyli jaka wartość została wprowadzona przez użytkownika. Sprawdzane jest, czy input był typu checkbox, jeśli tak to pod value podstawiane jest true lub false w zależności czy checkbox był zaznaczony lub nie. Zmieniany jest stan, dokładniej zmienia się tylko ta własność planu, która została zmieniona za pomocą inputa.

![37](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/37.png?raw=true)

W render() wszystko to, co wyświetlane na stronie. Mamy tutaj nasz Modal a w nim formularz umożliwiający nam zmianę własności wybranego planu. Po wciśnięciu Save zapisywane są wszelkie wprowadzone zmiany i Modal jest zamykany.

![38](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/38.png?raw=true)

![39](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/39.png?raw=true)


#### Działanie frontendu
Otwierając aplikację ukazuje nam się lista niewykonanych jeszcze planów/zadań. Sa one ustawione według daty utworzenia danego obiektu.

![40](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/40.png?raw=true)

Gdy wciśniemy done, wyświetlają się te, wykonane już zadania. 

![41](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/41.png?raw=true)

Plany mają swoją datę:
- jeśli zadanie jest do wykonania dzisiaj ma pod sobą na czerwono napis today

![42](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/42.png?raw=true)

- jeśli jest na jutro to ma żółte tomorrow

![43](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/43.png?raw=true)

- jak data wykonania już minęła ma czarne too late

![44](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/44.png?raw=true)

- a jak jeszcze mamy trochę czasu to wyświetlana jest po prostu data:

![45](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/45.png?raw=true)

Plany można ustawić według daty rosnąco lub malejąco.

Rosnąco, czyli im dalsza data tym niżej na liście:

![46](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/46.png?raw=true)

Malejąco, czyli im dalsza data tym wyżej na liście:

![47](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/47.png?raw=true)


Można dodawać nowe plany wciskając Add new. Pojawia nam się wtedy okienko do wpisania własności planu:

![48](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/48.png?raw=true)

![49](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/49.png?raw=true)

Po wciśnięciu Save nasz nowy plan umieszczany jest na liście wraz z innymi planami:

![50](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/50.png?raw=true)

Plany można edytować klikając Edit:

![51](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/51.png?raw=true)

Po wciśnięciu Save wyświetla nam się zmieniony plan:

![52](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/52.png?raw=true)

Mogę też zmienić plan z not done na done. Po zaznaczeniu done w edycji planu i wciśnięciu Save zostanie on automatycznie przeniesiony do seksji "Done":

![53](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/53.png?raw=true)

![54](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/54.png?raw=true)

Plany można też oczywiście usuwać, po wciśnięciu Delete, plan znika, zostaje usunięty:

![55](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/55.png?raw=true)

![56](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium10/screenshots/56.png?raw=true)