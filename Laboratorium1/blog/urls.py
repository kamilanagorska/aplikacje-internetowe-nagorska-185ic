from django.urls import path
from . import views
#import funkcji path django i wszystkie widoki z aplikacji blog
#wzorzec adresu url, przyporządkujemy widok (view) o nazwie post)list do strony glownej
urlpatterns = [
    path('', views.post_list, name='post_list'),
    #post/ url zaczynac sie bedzie od slowa post, po nim /
    #<int:pk> django spodziewa się liczby całkowitej i przekaze jej wartosc do widoku jako zmienną pk
    path('post/<int:pk>', views.post_detail, name='post_detail'),
    path('post/new', views.post_new, name='post_new'),
    path('post/<int:pk>/edit/', views.post_edit, name='post_edit'),
    path('post/<pk>/remove/', views.post_remove, name='post_remove'),
] 