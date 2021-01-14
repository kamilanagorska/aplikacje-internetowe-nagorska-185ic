### Laboratorium 9

Django + React (aplikacja CRUD)
Backend napisany w Django, a frontend napisany za pomocą React.js.

Utworzyłam aplikację z recenzjami jedzenia. Jest to aplikacja CRUD (Create Read Update Delete). Oznacza to, że te cztery podstawowe funkcje są dostępne w stosunku do recenzji (tworzenie, odczytywanie, edytowanie, usuwanie recenzji).

#### Spis treści:
- Backend - Django [TUTAJ](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/tree/main/Laboratorium9#backend----django)
- Backend - działanie [TUTAJ](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/tree/main/Laboratorium9#dzia%C5%82anie-backendu)
- Frontend - React.js [TUTAJ](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/tree/main/Laboratorium9#frontend-reactjs)
- Frontend - działanie [TUTAJ](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/tree/main/Laboratorium9#dzia%C5%82anie-frontendu)

#### Backend -  Django
Do utworzenia tego projektu potrzebne były dwa pakiety: djangorestframework i django-cors-headers. Pierwszy z nich już był używany w ramach zajęć, drugi nie.

Corsheaders to pakiet umożliwiający zdefiniowanie CORS (Cross Origin Resource Sharing). Jest on przydatny, gdy tworzymy aplikację Django, a frontend wykonujemy np. za pomocą React.js. W takich sytuacjach używamy zazwyczaj dwóch serwerów, osobny dla backendu i frontendu. CORS umożliwia aplikacjom klienckim łączenie się z interfejsami API hostowanymi w różnych domenach. Powoduje ominięcie błędu Same Origin Policy w przeglądarce internetowej. 

Umieściłam w INSTALLED_APPS zainstalowane pakiety i utworzoną przeze mnie aplikację reviews:

![1](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/1.png?raw=true)

Dodatkowo dla CORS trzeba wprowadzić oprogramowanie pośredniczące, by móc nasłuchiwać odpowiedzi. Ważne jest, by CorsMiddleware znajnowało się przed CommonMiddleware. (!!! Zwłaszcza jeśli używane jest ustawienie USE_ETAGS = True, bo inaczej nagłówki CORS zostaną utracone z powodu 304 not-modified responses, powodując błędy w niektórych przeglądarkach !!!)

![2](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/2.png?raw=true)

Zdefiniowałam ustawienia CORS. Chcę, by CORS był dostępny dla mojej domeny z frontendem, która znajduje się pod adresem localhost:3000, więc dodałam ją do Whitelist i wyłączyłam ustawienie powodujące włączenie CORS dla wszyskich domen.

![3](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/3.png?raw=true)

Utworzyłam model recenzji. Każda recenzja posiada wartości food, description, score i published. Dodatkowo zdefiniowałam score jako wartość od 0 do 10. 

![4](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/4.png?raw=true)

Utworzyłam klasę ReviewSerializer (serializer), która będzie zarzadzać serializacją i deserializacją z formatu JSON. Wybrałam pola, które mają zostać uwzględnione (wszystkie).

![5](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/5.png?raw=true)


Zdefiniowałam trasy/ścieżki dla aplikacji, by określić w jaki sposób serwer odpowie na żądanie klienta wysłane do endpoint'u. Ostatni adres url znajdował się na stronie podanej w poleceniu, jednak nigdy nie jest wykorzystywany, więc go zakomentowałam. 

![6](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/6.png?raw=true)

Oczywiście w urls całego projektu musiałam umieścić odwołanie do tras aplikacji:

![7](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/7.png?raw=true)

Następnie zdefiniować trzeba było widoki:
- review_list()
- review_detail()

review_list_published() nie jest używany, dlatego zakomentowałam go (ale później i tak pokażę jak działa)

Pierwszy widok review_list pobiera listę recenzji, jeśli żądanie to GET. Umieszczona jest tam też implementacja wyszukiwania recenzji po nazwie jedzenia. Wystarczy wpisać kawałek nazwy, np. zamiast cake wystarczy c i znalezione zostaną wszystkie recenzje zawierające tą literę.

![8](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/8.png?raw=true)

Jeśli żądanie to POST tworzona jest nowa recenzja.

![9](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/9.png?raw=true)

Jeśli żądanie to DELETE usuwane zostają wszystkie recenzje.

![10](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/10.png?raw=true)

Widok review_detail umożliwia wyświetlanie szczegółów dotyczących recenzji. Pobierany jest obiekt Review o zadanym pk.

![11](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/11.png?raw=true)

Jeśli żadanie to GET to zwracane zostają detale dotyczące wybranej recenzji.

![12](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/12.png?raw=true)

Żądanie PUT powoduje nadpisanie istniejącego już obiektu Review, czyli edycje recenzji.

![13](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/13.png?raw=true)

Żądanie DELETE usuwa wybraną recenzję.

![14](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/14.png?raw=true)

Zakomentowany przeze mnie widok wyszukuje obiekty Review o wartości published równej True i zwraca je, gdy żądanie jest równe GET.

![15](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/15.png?raw=true)

#### Działanie backendu

Po zaimplementowaniu całego backendu, gdy wejdę na localhost:8080/api/reviews wyświetlony zostanie JSON ze wszystkimi recenzjami.

![16](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/16.png?raw=true)

Gdy po reviews dopiszę np. /18 to wyświetlone zostaną informacje jedynie o recenzji o id = 18.

![17](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/17.png?raw=true)

Gdy wybiorę numer, który nie jest id żadnej z istniejących recenzji dostanę taki komunikat:

![18](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/18.png?raw=true)

Gdy odkomentuje zakomentowane url i widok to mam dostęp również do strony localhost:8080/api/reviews/published. Wyświetlają się wtedy tylko recenzje opublikowane.

![19](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/19.png?raw=true)

Dodatkowo mogę też wyszukiwać recenzje z wybraną frazą w nazwie jedzenia, np. wchodząc w localhost:8080/api/reviews?food=ma wyświetlane zostają tylko recenzje zawierające ma w nazwie jedzenia:

![20](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/20.png?raw=true)

Recenzje są też oczywiście wwyświetlane w panelu administracyjnym Django:

![54](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/54.png?raw=true)

#### Frontend React.js
Aplikacja korzysta z pakietu react-router-dom, używanego już nie raz na zajęciach. W komponencie App umieściłam navbar, który umożliwia nam przejście do podstrony ze wszystkimi recenzjami i podstrony umożliwiającej dodanie nowej recenzji. Na stronie głównej (ścieżka "/") też wyświetlana jest lista recenzji. Dodatkowo zdefiniowałam ścieżkę do podstrony wyświetlającej szczegóły jednej recenzji i umożliwiającej jej edycje lub usunięcie ("/reviews/:id").

![21](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/21.png?raw=true)

Zainstalować musiałam axios'a by móc za pomocą niego "konsumować" API i utworzyłam plik http-common.js, który inicjalizuje axios'a z baseURL, ktorym jest adres interfejsu API REST i nagłówkiem  "Content-type": "application/json".

![22](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/22.png?raw=true)

Plik review.service.js używa powyższego axios'a do wysyłania żądań HTTP. Wywoływane są metody axios'a get, post, put, delete które odpowiadają żądaniom HTTP: GET, POST, PUT, DELETE.

![23](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/23.png?raw=true)

##### Komponent rewiews-list.component.js
W konstruktorze następuje związanie metod z instancją komponentu i zdefiniowanie stanu.

![24](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/24.png?raw=true)

Poniżej zdefiniowane są metody:
- componentDidMount() - metoda wywoływana bezpośrednio po zamontowaniu komponentu, pobranie listy recenzji:

![25](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/25.png?raw=true)

- onChangeSearchFood(e) - wykonywana, gdy zmienia się wartość w formularzu umożliwiającym wyszukiwanie po nazwie jedzenia, pobiera wartość wpisaną w formularzu, wywoływane jest setState, pod searchFood podstawiamy wartość pobraną z formularza. setState informuję Reacta, że stan się zmienił i ponownie wykonywana jest metoda render():

![26](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/26.png?raw=true)

- retrieveReviews() - pobiera wszystkie recenzje za pomocą metody getAll zdefiniowanej w pliku review.service.js:

![27](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/27.png?raw=true)

- refreshList() - odświeża listę recenzji po wykonaniu metody removeAllReviews():

![28](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/28.png?raw=true)

- setActiveReview(review, index) - wykonywana po kliknięciu na konkretną recenzje, zmienany jest stan, pod currentReview podstawiana jest wybrana recenzja, a pod currentIndex podstawiany jest indeks wybranej recenzji:

![29](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/29.png?raw=true)

- removeAllReviews() - wykonywana po wciśnięciu guzika Remove All, usuwa wszystki recenzje z wykorzystaniem deleteAll zdefiniowanego w review.service.js:

![30](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/30.png?raw=true)

- searchFood() - wykonywana po kliknięciu guzika Search, wyszukuje recenzje z nazwą jedzenia zawierającą wpisaną fraze przez użytkownika, wykorzystuje findByFood zdefiniowaną w review.service.js:

![31](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/31.png?raw=true)

W render() umieszczone są wszystkie wyświetlane elementy na stronie. Formularz do wyszukiwania i napis:

![32](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/32.png?raw=true)

Jeśli aktualnie wybrana recenzja istnieje to są wyświetlane jej szczegóły. Pod szczegółami znajduje się znaczek Edit, którego kliknięcie przekierowuje nas na podstronę z wybraną recenzją.

![33](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/33.png?raw=true)

Wyświetlana jest lista wszystkich recenzji:

![34](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/34.png?raw=true)

Na samym dole znajduje się guzik umożliwiający usunięcie wszystkich recenzji.

![35](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/35.png?raw=true)

##### Komponent review.component.js
W konstruktorze związane są metody i zdefiniowany stan, który składa się z obiektu currentReview z zdefiniowanymi wartościami i message.

![36](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/36.png?raw=true)

Zdefiniowane metody:
- componentDidMount() - wykonywana jest w niej funkcja getReview, pobierana jest aktualnie wybrana recenzja:

![37](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/37.png?raw=true)

- onChangeFood(e), onChanfeDescription(e), onChangeScore(e) - wszystkie działają tak samo, ale dotyczą innej wartości recenzji. Wykonywane są, gdy zmieniana jest wartość w odpowiednim polu formularza (np. dla pierwszej z nich jest to pole, gdzie możemy wpisywać nazwę recenzowanego jedzenia). Wartość z formularza jest pobierana, następnie bieżący stan zastępujemy parametrami ostatniego stanu prevState, czyli pod currentReview podstawiamy wartość z poprzedniego stanu, a jedną wartość zmieniamy, np. food dla onChangeFood, score dla onChangeScore. Pod tą wartość podstawiamy tą pobraną z formularza:

![38](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/38.png?raw=true)

- getReview(id) - wywoływana przez componentDidMount(), pobierana jest tutaj wybrana recenzja:

![39](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/39.png?raw=true)

- updatePublished(status) - wywoływana po wciśnięciu guzika Publish lub UnPublish, zmienia status published na true lub false. Korzysta z poprzedniego stanu:

![40](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/40.png?raw=true)

- updateReview() - wykonywana po wciśnięciu guzika Update, umożliwia edycję recenzji:

![41](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/41.png?raw=true)

- deleteReview() - wywoływana po wciśnięciu guzika Delete, usuwa wybraną recenzję i przekierowuje nas na podstronę '/reviews':

![42](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/42.png?raw=true)

W render() umieszczone jest to, co wyświetlane na stronie. 

Jeśli istnieje aktualnie wybrana recenzja wyświetlany jest formularz z 3 polami:
- name of food
- description
- score.

![43](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/43.png?raw=true)

Poniżej wyświetlany jest status recenzji: published lub pending w zależności od wartości currentReview.published:

![44](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/44.png?raw=true)

W zależności od statusu published aktualnej recenzji wyświetlany jest guzik UnPublish, który powoduje zmienienie statusu na pending lub guzik Publish, który zmienia status na published.

![45](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/45.png?raw=true)

Poniżej znajdują się jeszcze dwa guziki:
- Delete, który powoduje usunięcie recenzji i przejście do listy wszyskich recenzji.
- Update, ktory powoduje zapisanie wprowadzonych zmian do recenzji i wyświetlenie wiadomości o udanej edycji.

![46](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/46.png?raw=true)

##### Komponent add-review.component.js
W konstruktorze jak za każdym razem znajduje się stan i związanie metod:

![48](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/48.png?raw=true)

Poniżej zdefiniowane metody:
- onChangeFood(e), onChangeDescription(e), onChangeScore(e) - działają tak samo, wykonują się, gdy zmieniona zostaje wartość w formularzu, zmieniają stan:

![49](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/49.png?raw=true)

- saveReview() - tworzy nową recenzję i zmienias wartość stanu - submitted na true, co powoduje ponownie wykonanie render() i zmienienie tego, co jest wyświetlane na stronie:

![50](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/50.png?raw=true)

- newReview() - wykonywana po wciśnięciu guzika Add more, który wyświetla się po utworzeniu już nowej recenzji, ustawia wartości w stanie na te początkowe, "czyści" stan przed utworzeniem nowej recenzji:

![51](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/51.png?raw=true)

W render() znajduje się to, co jest wyświetlane na stronie. Jeśli utworzona już została nowa recenzja wyświetlany jest komunikat o udanym utworzeniu i guzik Add more umożliwiający ponowne utworzenie nowej recenzji. Dodałam tutaj też guzik All reviews, który powoduje przejście do podstrony z listą wszystkich recenzji, bo jest to wygodniejsze niż wciskanie za każdym razem navbara, gdy po utworzeniu recenzji chcemy zobaczyć ją na liście.

![52](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/52.png?raw=true)

Jeśli submitted jest równe false, czyli nie utworzyliśmy jeszcze nowej recenzji to wyświetlany jest formularz umożliwiający wpisanie szczegółów recenzji. Na końcu znajduje się guzik, którego wciśnięcie powoduje zapisanie wprowadzonych danych i utworzenie recenzji.

![53](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/53.png?raw=true)

#### Działanie frontendu
Gdy wchodzimy na stronę główną lub na podstronę '/reviews' wyświetlana jest lista wszystkich recenzji:

![55](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/55.png?raw=true)

Są one też wyświetlane w konsoli: 

![59](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/59.png?raw=true)

Na górze znajduje się navbar, który umożliwia przejście do '/' klikając na Food Reviewer, do '/reviews' klikając all reviews lub do '/add' klikając add new review. Pod navbarem jest pole, gdzie możemy wpisać nazwę jedzenia, które zostanie wyszukane:

![56](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/56.png?raw=true)

Po kliknięciu guzika Search:

![57](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/57.png?raw=true)

Wynik w konsoli:

![60](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/60.png?raw=true)

Gdy klikniemy na wybraną recenzje pojawią się jej szczegóły:

![58](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/58.png?raw=true)

Możemy kliknąć Edit, co spowoduje przejście do podstrony z edycją recenzji:

![61](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/61.png?raw=true)

W konsoli jest wyświetlana wybrana recenzja:

![62](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/62.png?raw=true)

Zmienienie statusu recenzji published na pending klikając UnPublish:

![63](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/63.png?raw=true)

Zmieniona recenzja pojawia się w konsoli:

![64](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/64.png?raw=true)

Edycja opisu:

![65](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/65.png?raw=true)

Po kliknięciu Update:

![66](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/66.png?raw=true)

![67](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/67.png?raw=true)

Usunięcie recenzji poprzez naciśnięcie guzika Delete. Zostajemy przekierowani do listy wszyskich recenzji, gdzie już nie ma tej usuniętej:

![68](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/68.png?raw=true)

W konsoli znajduje się nowa tablica recenzji, bez tej usuniętej:

![69](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/69.png?raw=true)

Strona umożliwiająca dodawanie nowych recenzji:

![70](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/70.png?raw=true)

Tworząc model Review zdefiniowałam, że score musi być od 0 do 10, więc gdy w aplikacji wpiszę np. 20 to wyświetlony zostanie błąd w konsoli:

![71](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/71.png?raw=true)

![72](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/72.png?raw=true)

Dodanie nowej recenzji z poprawną oceną:

![73](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/73.png?raw=true)

![74](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/74.png?raw=true)

![75](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/75.png?raw=true)

Po wciśnięciu Add more możemy dodać nową recenzję:

![76](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/76.png?raw=true)

Dodałam nową recenzję i wcisnęłam tym razem guzik All reviews, co spowodowało przejście do listy z recenzjami. Znajdują się tutaj też te nowo utworzone recenzje:

![77](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/77.png?raw=true)

Wciśnięcie Remove All powoduje usunięcie wszystkich recenzji:

![78](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/78.png?raw=true)

W konsoli wyświetlana jest pusta tablica, jako że wszystko recenzje zostały usunięte:

![79](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium9/screenshots/79.png?raw=true)