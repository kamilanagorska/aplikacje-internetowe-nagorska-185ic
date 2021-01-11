from django.conf.urls import url 
from reviews import views 

#gdy wysyłane jest żądanie do endpointu za pomocą
#żądania HTTP (GET, POST, PUT, DELETE) trzeba okreslic, w jaki 
#sposob serwer odpowie
#dlatego definiujemy trasy:
urlpatterns = [ 
    #GET, POST, DELETE
    url(r'^api/reviews$', views.review_list),
    #api/reviews/id GET PUT DELETE
    url(r'^api/reviews/(?P<pk>[0-9]+)$', views.review_detail),
    #GET
    url(r'^api/reviews/published$', views.review_list_published)
]