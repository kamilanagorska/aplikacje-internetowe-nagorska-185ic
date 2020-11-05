from django.shortcuts import render
from django.utils import timezone
from .models import Post
from django.shortcuts import render, get_object_or_404
from .forms import PostForm
from django.shortcuts import redirect
#funckja post_list, ktora pobiera request i zwraca wartosc uzyskaną dzięki wywołaniu innej funkcji render, która wyrenderuje
#(złoży w całość) nasz szablon blog/post_list.html
def post_list(request):
    #posty bedą posortowane wedlug daty publikacji (QuerySet)
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    #request - wszystko, co otrzymujemy od użytkownika za pośrednictwem Internetu
    #blog/post_list.html plik szablonu
    #{} miejsce, w którym możemy dodać rzeczy do wykorzystania w szablonie u nas to posts
    return render(request, 'blog/post_list.html', {'posts':posts})

#jeśli nie bedzie posta o numerze to wyswietli page not found
def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'blog/post_detail.html', {'post': post})

def post_new(request):
    #mamy 2 sytuacje, gdy wchodzimy pierwszy raz na strone i chcemy pusty formularz
    #druga, gdy ponownie znajdziemy się w widoku wraz ze wszyskimi wpisanymi danymi
    if request.method == "POST":
        #zbudowanie formularza z danymi z formularza
        form = PostForm(request.POST)
        #sprawdzenie, czy wypełniony poprawnie
        #jak tak to można go zapisać
        if form.is_valid():
            #commit=false sygnalizuje, że jeszcze nie chcemy zapisywac modelu Post,
            #najpierw chcemy dodać autora
            post = form.save(commit=False)
            post.author = request.user
            post.published_date = timezone.now()
            post.save()
            #przejście na strone post_detail/pk/
            return redirect('post_detail', pk=post.pk)
    else:
        form = PostForm()
    return render(request, 'blog/post_edit.html', {'form': form})


def post_edit(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if request.method == "POST":
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.published_date = timezone.now()
            post.save()
            return redirect('post_detail', pk=post.pk)
    else:
        form = PostForm(instance=post)
    return render(request, 'blog/post_edit.html', {'form': form})