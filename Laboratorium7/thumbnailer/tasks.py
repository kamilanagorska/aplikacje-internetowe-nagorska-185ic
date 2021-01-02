import os
#moduł ten udostępnia narzędzia do tworzenia, 
#czytania, pisania, dołączania i wyświetlania plików zip
from zipfile import ZipFile
from celery import shared_task
#moduł Image udostepnia klasę o tej samej nazwie, która
#używana jest do reprezentowania obrazu PIL
#zapewnia szereg funkcji fabrycznych, w tym funkcje 
#ładowania obrazów z plików i tworzenia nowych obrazów
from PIL import Image
#django.conf.settings to klasa tworząca abstrakcję pojęć,
#ustawień domyślnych i specyficznych dla serwisu
from django.conf import settings

#shared_task to dekorator ktory umozliwia tworzenie zadan
#bez koniecznosci posiadania konkretnej instancji aplikacji
@shared_task
#task, który akceptuje ścieżkę do pliku obrazu oraz listę
#2-krotkowych wymiarów szerokości i wysokości do utworzenia miniatury
def make_thumbnails(file_path, thumbnails=[]):
    #metoda os.chdir() w Pythonie służy do zmiany bieżącego katalogu
    #roboczego na określoną ścieżkę
    os.chdir(settings.IMAGES_DIR)
    #os.path.split() jest metodą służącą do dzielenia nazwy ścieżki
    #na parę: nagłówek i koniec. Koniec to ostatni składnik nazwy
    #ścieżki, a nagłówek to wszystko, co do niego prowadzi
    path, file = os.path.split(file_path)
    #os.path.splitext() służy do podziału nazwy ścieżki na parę root i ext
    #ext oznacza rozszerzenie, a root to wszystko prócz części ext
    file_name, ext = os.path.splitext(file)
    #utworzenie zmiennej, w której przechowywany jest powyżej pobrany
    #root z rozszerzeniem zip
    zip_file = f"{file_name}.zip"
    #adres URL zwracany na końcu
    results = {'archive_path': f"{settings.MEDIA_URL}images/{zip_file}"}
    #spróbuj zrobić to:
    try:
        #do instancji Pillow Image ładowany jest plik obrazu
        #otwierany i identyfikowane jest plik obrazu
        img = Image.open(file_path)
        #Zipfile otwiera plik zip o utworzonej wcześniej nazwie
        #parametr w powoduje "obcięcie" i zapisanie nowego pliku
        zipper = ZipFile(zip_file, 'w')
        #zapisuje plik o nazwie file do archiwum
        zipper.write(file)
        #usuwa ścieżkę pliku, nie moze usunąc katalogu, zglasza
        #wtedy błąd!
        os.remove(file_path)
        #pętla po liście wymiarów przekazanej do zadania
        #tworzona jest miniatura dla każdego
        #każda jest dodawana do archiwum zip
        #jednoczeście czyszczone są pliki pośrednie
        for w, h in thumbnails:
            #kopiowany jest obraz wczesniej zaladowany w img
            img_copy = img.copy()
            #skopiowany obraz jest zmieniany na miniaturkę
            #obliczany jest odpowiedni rozmiar miniatury
            #nie może być większy od oryginalnego obrazu
            #w oraz h to wymiary obrazu
            img_copy.thumbnail((w, h))
            #zmienna, w której znajduje się nazwa miniaturki
            #składa się z nazwy oryginalnego pliku _ {wymiaru w}x{wymiaru h}
            #rozszerzenie jest brane z ext, jest to rozszerzenie oryginalnego
            #obrazu otrzymane za pomocą splitext() prawie na początku kodu
            thumbnail_file = f'{file_name}_{w}x{h}.{ext}'
            #save() zapisuje kopię oryginalnego obrazu już zmniejszoną
            #pod nazwą utworzoną powyżej
            img_copy.save(thumbnail_file)
            #miniaturka zapisywana jest do archiwum
            zipper.write(thumbnail_file)
             #usuwana jest ścieżka pliku z miniaturką
            os.remove(thumbnail_file)
        
        #zamknięcie
        img.close()
        zipper.close()
    #jak się nie uda ^ to "złap" error i go wypisz
    #IOError to błąd głaszany, gdy operacja wejścia/wyjścia 
    #nie powiedzie się, na przykład za pomocą open() dokona się 
    #próba otwarcia pliku, który nie istnieje
    except IOError as e:
        print(e)
    
    #zwracany jest prosty słownik określający adres URL,
    #z którego można pobrać archiwum ZIP z miniaturką. 
    return results

#def adding_task(x, y):
    #return x + y
