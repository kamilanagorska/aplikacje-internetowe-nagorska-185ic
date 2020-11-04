from django.urls import path
from . import views
#import funkcji path django i wszystkie widoki z aplikacji blog
#wzorzec adresu url, przyporządkujemy widok (view) o nazwie post)list do strony glownej
urlpatterns = [
    path('', views.post_list, name='post_list'),
]