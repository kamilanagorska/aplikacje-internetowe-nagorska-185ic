from django.shortcuts import render
from django.views.generic import TemplateView, ListView
import requests
from bs4 import BeautifulSoup
from lxml import html

class HomePageView(TemplateView):
    template_name = 'webscraping/home.html'

def search_el(request):
    if request.method == "POST":
        website_link = request.POST.get('web_link', None)
        element = request.POST.get('element', None)
        url = website_link
        source=requests.get(url).text # url source
        all_links = []
        #beautifulsoup
        soup = BeautifulSoup(source, "html.parser")
        items = soup.find_all(element)
        amount = len(items)

        for i in items:
            idd = i.get('id')
            idd = idd.strip() if idd is not None else ""

            clas = i.get('class')
            if clas is None:
                clas = ""

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
            
            all_links.append({"idd": idd, "clas": clas, "text": text, "href": href, "src": src, "alt": alt, "content": content, "name": name})

        return render(request, 'webscraping/search_results.html', {'all_links':all_links, 'amount': amount})

    return render(request, 'webscraping/home.html')


class SearchIDView(TemplateView):
    template_name='webscraping/search_id.html'


def search_id(request):
    if request.method == "POST":
        website_link = request.POST.get('web_link', None)
        iddd = request.POST.get('idd', None)
        url = website_link
        source=requests.get(url).text # url source
        #beautifulsoup
        soup = BeautifulSoup(source, "html.parser")

        item = soup.find(id=iddd)
        if item is not None:
            item = item.prettify()
            amount = 1
        else: 
            item = ""
            amount = 0

        return render(request, 'webscraping/search_results_id.html', {'item':item, 'amount':amount})

    return render(request, 'webscraping/search_id.html')

class SearchClassView(TemplateView):
    template_name='webscraping/search_class.html'

def search_class(request):
    if request.method == "POST":
        website_link = request.POST.get('web_link', None)
        clas = request.POST.get('clas', None)
        element = request.POST.get('element', None)
        url = website_link
        source=requests.get(url).text # url source
        all_links = []
        #beautifulsoup
        soup = BeautifulSoup(source, "html.parser")
        items = soup.find_all(element, class_=clas)
        amount = len(items)

        for i in items:
            el = i.name

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
    
    return render(request, 'webscraping/random.html', {'ex1': ex1, 'ex2': ex2})