from django.shortcuts import render
#funckja post_list, ktora pobiera request i zwraca wartosc uzyskaną dzięki wywołaniu innej funkcji render, która wyrenderuje
#(złoży w całość) nasz szablon blog/post_list.html
def post_list(request):
    return render(request, 'blog/post_list.html', {})
