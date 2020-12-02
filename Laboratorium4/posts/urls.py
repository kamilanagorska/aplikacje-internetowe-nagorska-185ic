from django.urls import path
from .views import PostViewSet
from rest_framework.routers import SimpleRouter

urlpatterns = [
    #Wszystkie routes będą znajdować się w api/v1/, więc nasz widok PostList ma pusty ciąg „” 
    #będzie on znajdować się w api/v1/, a widok PostDetail w api/v1/# gdzie # oznacza klucz podstawowy wpisu
    #Na przykład pierwszy wpis na blogu ma podstawowy identyfikator 1, więc będzie znajdować się na w api/v1/1, 
    #drugi post w api/v1/2 i tak dalej
    #path('<int:pk>/', PostDetail.as_view()),
    #path('', PostList.as_view()),
]

#Nie potrzebujemy urlpatterns gdy używamy routers
#obsługa automatycznego trasowania adresów URL do Django
#prosty, szybki i spójny sposób łączenia logiki widoku z zestawem adresów URL
router = SimpleRouter()
router.register('', PostViewSet, basename='posts')
urlpatterns = router.urls