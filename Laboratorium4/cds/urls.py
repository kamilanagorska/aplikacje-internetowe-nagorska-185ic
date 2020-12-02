from django.urls import path
from .views import AlbumViewSet
from rest_framework.routers import SimpleRouter

urlpatterns = [
    
]

#Nie potrzebujemy urlpatterns gdy używamy routers
#obsługa automatycznego trasowania adresów URL do Django
#prosty, szybki i spójny sposób łączenia logiki widoku z zestawem adresów URL
router = SimpleRouter()
router.register('', AlbumViewSet, basename='posts')
urlpatterns = router.urls