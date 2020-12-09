### Laboratorium 5
Web Scraping z użyciem Beautiful Soup, XPath i lxml.

Utworzyłam aplikację Django, która umożliwia wyszukiwanie różnych elementów na wybranej stronie. 

Wyszukiwanie podzieliłam na:
- wyszukiwanie elementu HTML
- wyszukiwanie za pomocą ID 
- wyszukiwanie wybranego elementu z podaną klasą. 

Dodatkowo utworzyłam podstronę z różnymi przykładami web scrapingu z wykorzystaniem lxml i XPath.


#### Szukanie wybranego elementu HTML (Beautiful Soup, formularz)
![1](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/1.png?raw=true)

Utworzyłam w szablonie formularz, gdzie podać należy url strony internetowej, na której chcemy wyszukiwać elementów i wyszukiwany element. Po wciśnięciu guzika Search dane są pobierane i odbywa się wyszukiwanie. 

![2](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/2.png?raw=true)

Wpisanie danych jest wymagane. Niemożliwe jest też w pole podpisane "URL of website to scrape" wpisanie nie adresu url. 

![3](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/3.png?raw=true)

![5](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/5.png?raw=true)

![4](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/4.png?raw=true)

Kod od wyszukiwania umieściłam w widoku search_el(request). Jeśli dane zostały wprowadzone są one pobierane z formularza i przypisywane do zmiennych. Następnie wykonywane jest żądanie HTTP do wybanego adresu URL. Pobierane są dane, które serwer nam odsyła i przypisywane są one do zmiennej. Tworzę obiekt Beautiful Soup, który przyjmuje dwa agrumenty, string HTML do "sparsowania" i opcjonalnie nazwę "parsera". Używam html.parser, który jest zawarty w standardowej bibliotece Pythona. 

![6](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/6.png?raw=true)

Następnie odbywa się wyszukiwanie. Wykorzystałam tu metodę find_all(). Przeszukuje ona cały plik w poszukiwaniu wpisanej nazwy elementu HTML. Ignorowane jest wszystko, czego nazwa się nie zgadza. Po znalezieniu wszystkich elementów sprawdzam ile zostało ich znalezionych za pomocą metody len(). 

![7](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/7.png?raw=true)

Dla każdego pobranego elementu pobieram wybrane atrybuty Zdecydowałam się na pobieranie ID, klasy, tekstu (to string znadujący się między tagami, np <a>tekst</a>), linku (href), źródła (src), tekstu alternatywnego (alt), atrybuty content wykorzystywanego wraz z elementem meta i atrybutu name używanego np z button. Pobieranie tych atrybutów odbywa się za pomocą get('nazwa atrybuty'). Dodatkowo dla każdego atrybutu, dla którego jest to możliwe użyłam metody strip(), która usuwa tak zwane białe spacje. Sprawdziłam też, czy przypadkiem atrybut nie jest pusty, czyli czy po prostu go nie ma i jeśli tak jest, to zamieniłam wartość None na pustego stringa "", by lepiej wyglądało to przy wyświetlaniu. Wszystkie pobrane dane połączyłam za pomocą append(), by każdy element w tablicy miał te własności czyli np. item.text lub item.src. Ułatwi to wyświetlanie. 

![8](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/8.png?raw=true)

Na końcu zwracam listę znalezionych elementów i ich ilość. 

![9](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/9.png?raw=true)

Wyświetlanie wyniku wyszukiwania odbywa się na innej podstronie. Najpierw wyświetlam ile wyników udało się znaleźć. Następnie za pomocą pętli for wyświetlane są wszystkie pobrane atrybuty dla każdego znalezionego elementu.

![10](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/10.png?raw=true)

Pokażę teraz jak to działa  na przykładzie mojego blogu robionego w ramach Laboratorium 1. 

Wyszukiwanie elementu div:

![11](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/11.png?raw=true)

![12](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/12.png?raw=true)

Znalezione zostało 12 elementów div. Dla każdego wyświetlane są te same atrybuty, jeśli ich nie ma to wyświetlane jest puste pole. Klasy wyświetlane są w liście, jako, że jeden element może mieć przypisane kilka klas. 

Pokażę również, co dzieje się jeśli żaden element nie zostanie znaleziony. 

![22](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/22.png?raw=true)

![23](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/23.png?raw=true)

Wyświetlany jest wtedy napis, że znaleziono 0 wyników.


#### Szukanie za pomocą ID (Beautiful Soup, formularz)
![13](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/13.png?raw=true)

W szablonie znajduje się formularz, w którym podać należy adres URL strony, na której będziemy szukać elementu i ID elementu. 

![14](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/14.png?raw=true)

Tak jak ostatnio dodane są zabezpieczenia, że URL musi byś URL, a nie jakimś innym tekstem i oba pola muszą zostać uzupełnione.

Wyszukiwanie odbywa się w widoku search_id(request). Pobieram w nim wpisane dane z formularza. Tak jak ostatnio wysyłam zapytanie, pobieram odpowiedź i parsuje za pomocą BeautifulSoup. 

![15](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/15.png?raw=true)

Szukanie elementu o danym ID wykonałam za pomocą metody find(id=iddd), gdzie iddd jest nazwą ID pobraną z formularza. Metoda find() w porównaniu do find_all(), gdy znajdzie już jeden odpowiadający kryteriom element to nie szuka dalej. Dlatego wynikiem szukania jest tylko jeden element. Dodatkowo ID jest unikatowe, więc to nawet niemożliwe, by znaleźć inny element o takim samym ID. 

Za pomocą if'a sprawdziłam, czy udało się znaleźć jakiś element, jeśli nie to zamiast None podstawiam pustego stringa i do zmiennej pokazującej ilość znalezionych elementów podstawiam 0. Gdy element się znalazł używam na nim metody prettify(), która zamienia go na przyjazny dla oka ciąg znaków. Dodatkowo ilość zmieniam na 1. Na końcu zwracam element znaleziony i ilość.

![16](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/16.png?raw=true)

Wyświetlanie wyniku pojawia się na innej podstronie. Jeśli nie znaleziono żadnego elementu to pojawia się napis "No result found", w przeciwnym przypadku wyświetla się "Searching completed successfully" i wyświetlany jest ten element. 

![17](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/17.png?raw=true)

Pokażę jak to działa również na przykładzie bloga z pierwszych zajęć, bo mam tam akurat jeden element, któremu przypisałam id="name".

![18](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/18.png?raw=true)

![19](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/19.png?raw=true)

Wyświetlił nam się cały element a, który ma id="name".

Dla odmiany wyszukam na innej stronie jakiegoś id, którego tam na pewno nie ma, by pokazać jak działa strona, gdy element nie został znaleziony. 

![20](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/20.png?raw=true)

![21](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/21.png?raw=true)


#### Szukanie wybranego elementu z wybraną klasą (Beautiful Soup, formularz)
![24](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/24.png?raw=true)

Utworzyłam jeszcze wyszukiwanie za pomocą podania klasy i elementu. Czyli szukamy np wszyskich div, które mają przypisaną klasę card-body.

W szablonie umieściłam formularz, do którego należy wpisać 3 rzeczy: url, klasę i element html. Wszystkie są wymagane i niemożliwe w pole z url wpisanie nie url.

![25](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/25.png?raw=true)

Wyszukiwanie znaduje się w widoku search_class(request). Początek wygląda tak samo jak dla każdego wyszukiwania. Jedyną różnicą jest, że pobieram 3 wartości z formularza, a nie dwie.

![26](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/26.png?raw=true)

Następnie używam find_all(), by znaleźć wszystkie wybrane elementy o podanej klasie. Może być ich kilka dlatego korzystam z find_all() a nie find(). Sprawdzam ilość znalezionych elementów i przechodzę do pobrania wybranych atrybutów dla każdego znalezionego elementu. Dzieje się to tak samo jak w moim pierwszym opisanym wyszukiwaniu. Jedynie dodałam tutaj jedną rzecz więcej czyli i.name, jest to nazwa elementu, którego szukaliśmy (nazwa tagu, np. a, b, button).

![27](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/27.png?raw=true)

Na końcu jak w pierwszym wyszukiwaniu użyłam append() i zwróciłam listę znalezionych elementów oraz ich ilość.

![28](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/28.png?raw=true)

Wyświetlanie wyników wygląda tak samo jak w pierwszym wyszukiwaniu. Dodałam tylko Element, czyli nazwę szukanego tagu (np. div).

![29](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/29.png?raw=true)

Działanie pokażę na przykładzie strony, którą wykonałam w ramach Laboratorium 2 i 3. Znajdują tam się elementy a, które należą do klasy "btn-sm", więc je wyszukam.

![30](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/30.png?raw=true)

![31](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/31.png?raw=true)

Działa, wyświetliły nam się 3 elementy a należące do klasy btn-sm.

Gdy żaden element nie zostanie znaleziony, wyświeli nam się napis "Found 0 result/s".

![32](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/32.png?raw=true)

![33](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/33.png?raw=true)


#### Pozostałe przykłady (Beautiful Soup, XPath, lxml)

Na tej podstronie umieściłam 5 różnych przykładów z wykorzystaniem web scrapingu. Wszystko umieściłam w jednym widoku o nazwie examples(request).


##### Przykład pierwszy:
Wykorzystałam tutaj do scrapingu lxml i XPath. 

Jako adres url do scrapowania wybrałam https://lxml.de/. Na stronie, gdy wciśniemy lewy klawisz myszy na końcu pojawia się opcja Zbadaj. Wybrałam ją, by znaleźć interesujący mnie element. Wcisnęłam go lewym klawiszem myszki i wybrałam Copy -> Copy XPath. Podstawiłam skopiowany XPath pod zmienną path. 

![34](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/34.png?raw=true)

Wykonywane jest żądanie HTTP i odpowiedź zapisywana jest pod zmienną reponse. Następnie z odpowiedzi tej pobieramy ciąg bajtów za pomocą .content. Robimy to, ponieważ html.fromstring, którego używamy później do parsowania oczekuje ciągu bajtów jako input. Następnie używająć .xpath(path) przechodzimy do wybranego wcześniej przez nas elementu. Tworzy nam się lista tree, gdzie na pierwszym miejscu znajduje się element, który wybraliśmy. Używamy text_content() by zwrócić zawartość tekstową elementu (bez znaczników) i by móc później go ładnie wyświetlić.

![35](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/35.png?raw=true)

Wyświetlanie:

![36](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/36.png?raw=true)

Element strony, którego XPath skopiowałam:

![37](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/37.png?raw=true)

Element wyświetlany na mojej stronie:

![38](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/38.png?raw=true)


##### Przykład drugi:
Zrobiłam to samo co w przykładzie pierwszym, ale z inną stroną, bo https://zacniewski.gitlab.io/teaching/2020-internet-apps/ i tym razem podałam full XPath czyli wygląda to tak:

![39](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/39.png?raw=true)

Wyświetlanie w szablonie:

![40](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/40.png?raw=true)

Element na stronie:

![41](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/41.png?raw=true)

Element wyświetlany na mojej stronie:

![42](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/42.png?raw=true)


##### Przykład trzeci:
W tym przykładzie użyłam Beautiful Soup to pobrania danych o produktach ze sklepu. Wybrałam tą podstronę sklepu: https://rockmetalshop.pl/pol_m_BUTY_OUTLET_Demonia-11561.html. Znajduje się tam dziewięć par butów, których nazwy i ceny postanowiłam pobrać.

Zaczęłam standardowo od wysłania żądania i go pobrania. Użyłam BeautifulSoup do parsowania. Następnie użyłam metody select(), która umożliwia w prosty sposób wyszukania wszyskich elementów o danym tagu i klasie (select("tag.class")). Dane o produktach znajdują się w div, który ma przypisaną klasę product_wrapper. 

![43](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/43.png?raw=true)

Dlatego użyłam .select("div.product_wrapper"). Za pomocą len() sprawdziłam ilość znalezionych produktów.

![44](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/44.png?raw=true)

Następnie pobrałam interesujące mnie elementy dla każdego znalezionego produktu, czyli nazwę i cenę. Nazwa znajduję się w tagu a o klasie product-name, a cena w span o klasie price. Na końcu wszystko połączyłam (append()), by mieć łatwiejszy dostęp do danych.

![45](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/45.png?raw=true)

Wyświetlanie w szablonie:

![46](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/46.png?raw=true)

Lista produktów na stronie sklepu:

![47](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/47.png?raw=true)

Lista produktów na mojej stronie:

![48](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/48.png?raw=true)


##### Przykład czwarty:
Tu wymieszałam kilka metod Beautiful Soup. Zrobiłam to na przykładzie mojego blogu z Lab1.

Pobrałam całą sekcję head za pomocą soup.head.

![49](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/49.png?raw=true)

Pobrałam pierwszy element p na stronie i wzięłam z niego jedynie tekst. To samo zrobiłam z trzecim p:

![50](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/50.png?raw=true)

Na koniec pobrałam tekst z title za pomocą soup.title.text:

![51](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/51.png?raw=true)

Wyświetlanie w szablonie:

![52](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/52.png?raw=true)

Head na blogu:

![53](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/53.png?raw=true)

Head na mojej stronie:

![54](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/54.png?raw=true)

Pierwszy element p na blogu:

![55](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/55.png?raw=true)

Pierwszy element p na mojej stronie:

![56](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/56.png?raw=true)

Trzeci element p na blogu:

![57](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/57.png?raw=true)

Trzeci element p na mojej stronie:

![58](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/58.png?raw=true)

Tytuł na blogu:

![59](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/59.png?raw=true)

Tytuł na mojej stronie:

![60](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/60.png?raw=true)


##### Przykład piąty:
Tutaj wykorzystałam dwie metody Beautiful Soup. Przykład zrobiłam na mojej stronie z Lab2 oraz 3: https://myforum-nagorska.herokuapp.com/accounts/signup/

Początek kodu wygląda jak zawsze:

![61](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/61.png?raw=true)

Następnie użyłam .next_element. Zwraca on to, co było sparsowane za elementem, na którym wykonujemy tą akcję. W moim przypadku zrobiłam to na h2:

![62](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/62.png?raw=true)

Później użyłam next_sibling. Działa to jedynie na elementami, która znajdują się na tym samym poziomie "drzewa". Muszą mieć one wspólnego rodzica.

![63](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/63.png?raw=true)

Wyświetlanie w szablonie:

![64](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/64.png?raw=true)

Następny element po h2 na forum (jest nim Sign Up):

![65](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/65.png?raw=true)

Następny element na mojej stronie:

![66](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/66.png?raw=true)

Rodzeństwo na mojej stronie:

![67](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/67.png?raw=true)

Pierwszego rodzeństwa nie wyświetla. Dzieje się tak, ponieważ następny element nie ma wspólnego rodzica z tym p, dopiero kolejny p ma tego samego rodzica, czyli form.

![68](https://github.com/kamilanagorska/aplikacje-internetowe-nagorska-185ic/blob/main/Laboratorium5/screenshots/68.png?raw=true)





