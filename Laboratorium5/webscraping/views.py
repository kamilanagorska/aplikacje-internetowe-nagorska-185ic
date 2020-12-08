from django.shortcuts import render
from django.views.generic import TemplateView, ListView
import requests
from bs4 import BeautifulSoup
from lxml import html

class HomePageView(TemplateView):
    template_name = 'webscraping/home.html'

#SZUKANIE ELEMENTU HTML NA STRONIE WYBRANEJ
def search_el(request):
    if request.method == "POST":
        #pobranie danych z formularza, url strony i element do wyszukania
        #None to domyslna wartosc
        website_link = request.POST.get('web_link', None)
        element = request.POST.get('element', None)
        #podpisanie wartosci z formularza do zmiennej url
        url = website_link
        #pobranie tekstu z odp to nasze zrodlo, bez tego bledy
        source=requests.get(url).text 
        all_links = []
        #beautifulsoup
        soup = BeautifulSoup(source, "html.parser")
        #szukamy elementow wszyskich 
        #find_all(nazwa,atrybuty,rekursywne,ciag,limit,**kwargs)
        #przeszukuje elementy podrzędne tagu i pobiera wszystkie elementy 
        #podrzędne, które pasują do podanych filtrów
        #gdy podaje wartośc "nazwa" to brane są pod uwagę tylko tagi
        #(elementy html) o okreslonej nazwie
        #ignorowane są stringi i tagi, których nazwy się nie zgadzają
        items = soup.find_all(element)
        #len() zwraca ilosc rzeczy w objekcie (dlugosc)
        #czyli ile znaleziono wyników naszego szukania elementow o danym tagu
        amount = len(items)

        for i in items:
            #pobranie id z elementu
            idd = i.get('id')
            #usuniecie "whitespaces" na przodzie i tyle jesli nie puste, jesli puste to by nie wyswietlalo napisu
            #None i zastepuje go pustym polem ""
            #whitespaces to np gdy mamy ' to jest napis ' to po uzyciu split() bedzie wygladac to
            #w taki sposob = 'to jest napis'
            idd = idd.strip() if idd is not None else ""

            #pobranie klasy elementu
            #tutaj nie moglam uzyc strip() bo klasy
            #znajdują się w liście
            clas = i.get('class')
            #jeśli element nie ma przypisanej zadnej klasy
            #to zastepuje to ""
            if clas is None:
                clas = ""
            
            #pobranie tekstu czyli np zawartosc w tagach p, albo title, albo div 
            #ktore są tekstem!
            text = i.text
            #usuwamy biale spacje, jesli tekstu nie ma to zastepujemy go pustym stringiem 
            text = text.strip() if text is not None else ""
            
            #pobranie linku (href)
            href = i.get('href')
            #usuniecie bialych spacji jesli None to pusty string
            href = href.strip() if href is not None else ""

            #pobranie żródła np w przypadku obrazka, tutaj tez nie mogla uzyc strip()
            #'NoneType' object has no attribute 'strip'
            src = i.get('src')
            #jesli zrodla nie ma to pusty string
            if src is None:
                src = ""
            
            #pobranie alt elementu
            alt = i.get('alt')
            #usuniecie bialych spacji gdy puste to ""
            alt = alt.strip() if alt is not None else ""

            #dodatkowo by bylo wiecej wzielam atrybut content ktory wystepuje w przypadku elementu meta
            content = i.get('content')
            #gdy puste to "" + usuwanie whitespaces
            content = content.strip() if content is not None else ""

            #pobranie name czyli np buttom ma name="subject"
            name = i.get('name')
            name = name.strip() if name is not None else ""

            #polaczenie wszystkich pobranych wartosci, by kazdy element w all_links mial je wszystkie
            all_links.append({"idd": idd, "clas": clas, "text": text, "href": href, "src": src, "alt": alt, "content": content, "name": name})

        return render(request, 'webscraping/search_results.html', {'all_links':all_links, 'amount': amount})

    return render(request, 'webscraping/home.html')


class SearchIDView(TemplateView):
    template_name='webscraping/search_id.html'

#SZUKANIE ELEMENTU O DANYM ID
def search_id(request):
    if request.method == "POST":
        #pobranie wartosci z formularza
        website_link = request.POST.get('web_link', None)
        iddd = request.POST.get('idd', None)
        #nasze url
        url = website_link
        #zrodlo url
        source=requests.get(url).text
        #beautifulsoup
        soup = BeautifulSoup(source, "html.parser")
        
        #szukamy elementu o id rownym iddd czyli temu pobranemu z formularza
        #find(name, attrs, recursive,string, **kwargs)
        #find w porównaniu do find_all przeszukue dokument i gdy znajdzie szukany element
        #konczy szukanie, find_all nawet jak znajdzie juz jeden, ktory jest jedynym na stronie to
        #i tak bedzie szukac dalej, bo przeciez nie wie co jest dalej, a jak nazwa mowi ma znalesc
        #wszystkie czyli ALL
        #różnicą między find_all a find jest też to, że find_all jak nie znajdzie nic zwraca pustą tablicę
        #a find zwraca None
        item = soup.find(id=iddd)
        #jesli cos sie znalazlo czylie nie zwróciło None
        if item is not None:
            #prettify() zamienia "drzewo parsowania" w ładnie sformatowany
            #ciąg znakow Unicode
            #bez tego nie wyswietla sie nic, pusta lista
            #ilosc na 1 bo znalezlismy cos
            item = item.prettify()
            amount = 1
        #jeśli się nic nie znalazło
        else: 
            #zamieniamy None na ""
            #i wpisujemy ilosc znalezionych elementow jako 0
            item = ""
            amount = 0

        return render(request, 'webscraping/search_results_id.html', {'item':item, 'amount':amount})

    return render(request, 'webscraping/search_id.html')

class SearchClassView(TemplateView):
    template_name='webscraping/search_class.html'

#SZUKANIE DANEGO ELEMENTU O DANEJ KLASIE
def search_class(request):
    if request.method == "POST":
        #pobranie z formularza
        website_link = request.POST.get('web_link', None)
        clas = request.POST.get('clas', None)
        element = request.POST.get('element', None)
        url = website_link
        source=requests.get(url).text 
        all_links = []
        #beautifulsoup
        soup = BeautifulSoup(source, "html.parser")
        #szukamy wszystkich wybranych elementow o danej klasie
        items = soup.find_all(element, class_=clas)
        #dlugosc, ile wynikow znalezionych
        amount = len(items)

        for i in items:
            #name czyli np div, p, title
            el = i.name
            
            #reszta tak samo jak w szukaniu pierwszym tym (elementów html)
            idd = i.get('id')
            idd = idd.strip() if idd is not None else ""

            classs = clas

            text = i.text
            text = text.strip() if text is not None else ""

            href = i.get('href')
            href = href.strip() if href is not None else ""

            src = i.get('src')
            if src is None:
                src = ""
                
            alt = i.get('alt')
            alt = alt.strip() if alt is not None else ""

            content = i.get('content')
            content = content.strip() if content is not None else ""

            name = i.get('name')
            name = name.strip() if name is not None else ""
            
            all_links.append({"el": el,"idd": idd, "classs": classs, "text": text, "href": href, "src": src, "alt": alt, "content": content, "name": name})

        return render(request, 'webscraping/search_results_class.html', {'all_links':all_links, 'amount':amount})

    return render(request, 'webscraping/search_class.html')

#lxml scraping
def examples(request):
    #LXML WEB SCRAPING EX1
    #url do scrapowania
    url = 'https://lxml.de/'
    #xpath do wybranego elementu
    path = '//*[@id="bug-tracker"]'
    #wziecie odpowiedzi
    response = requests.get(url)
    #pobranie ciągu bajtów
    byte_data = response.content
    #przefiltrowany kod źródłowy
    source_code = html.fromstring(byte_data)
    #przejscie do wybranego elementu
    tree = source_code.xpath(path)
    #pierwszy element w liscie to nasz element do wyswietlania
    ex1 = tree[0].text_content()

    #LXML WEB SCRAPING EX2
    url = 'https://zacniewski.gitlab.io/teaching/2020-internet-apps/'
    #full xpath do wybranego elementu
    path = '/html/body/div/div/div/article/ul[5]'
    #wziecie odpowiedzi
    response = requests.get(url)
    #pobranie ciągu bajtów
    byte_data = response.content
    #przefiltrowany kod źródłowy
    source_code = html.fromstring(byte_data)
    #przejscie do wybranego elementu
    tree = source_code.xpath(path)
    #pierwszy element w liscie to nasz element do wyswietlania
    ex2 = tree[0].text_content()
    
    #EX3 wyswietlanie produktow ze sklepu
    page = requests.get(
    "https://rockmetalshop.pl/pol_m_BUTY_OUTLET_Demonia-11561.html"
    )
    soup = BeautifulSoup(page.content, "html.parser")
    items = []
    products = soup.select("div.product_wrapper")
    amount = len(products)
    for prod in products:
        #bez [0] zwraca liste wszyskieeeego co w a z klasa product_name i nie da się zrobic .text
        name = prod.select("a.product-name")[0].text
        price = prod.select("span.price")[0].text
        #niestety linki do obrazkow nie wyświetlają się (witryna nieosiągalna) wiec z nich zrezygnowalam
        #image = prod.select('img')[0].get('src')
        items.append({"name": name, "price": price})
    
    #EX4 wymieszane różne rzeczy
    page = requests.get("https://blog-kamila-nagorska.herokuapp.com")
    soup = BeautifulSoup(page.content, "html.parser")
    #pobranie całego head
    page_head = soup.head
    #pobranie pierwszego elementu p i wziecie tylko jego tekstu
    fp = soup.select("p")[0].text
    #pobranie trzeciego elementu p
    ap = soup.select("p")[2].text
    #pobranie tekstu w title
    t = soup.title.text

    #EX5 wymieszane ale inna strona
    page = requests.get("https://myforum-nagorska.herokuapp.com/accounts/signup/")
    soup = BeautifulSoup(page.content, "html.parser")
    #kolejny element po h2 jak h2 to np <h2 id="name">Imie<h2> to wyswietli Imie
    ne = soup.h2.next_element
    #nie wyswietla nic, bo kolejny element nie jest rodzenstwem p, nie mają one tego samego rodzica, elementu znadują się w p czyli
    #ich rodzicem jest p a nie form, jak dla tego p
    ns = soup.p.next_sibling
    #tu juz wyswietla sie kolejny p, maja tego samego rodzica form
    nss = soup.p.next_sibling.next_sibling.prettify()

    return render(request, 'webscraping/random.html', {'ex1': ex1, 'ex2': ex2, 'items': items, "amount": amount, "page_head": page_head, "fp": fp, "ap": ap, "t": t, "ne": ne, "ns": ns, "nss": nss})
