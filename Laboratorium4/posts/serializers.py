#import klasy serializerów Django REST Framework
from rest_framework import serializers
from .models import Post
#Serializer tłumaczy dane na format, który jest łatwy do wykorzystania w Internecie,
#zazwyczaj JSON, i jest wyświetlany w punkcie końcowym interfejsu API
#Serializer może też określić, które pola mają zostać uwzględnione lub wykluczone
#w tym pzypadku uwzględniamy pole id, które Django automatycznie dodaje do modeli bazy danych
#ale wykluczymy pole updated_at
class PostSerializer(serializers.ModelSerializer):
    #klasa Meta używana jest do podania metadanych modelu
    class Meta:
        #pola, które mają zostać uwzględnione
        fields = ('id', 'author', 'title', 'body', 'created_at',)
        #model do użycia
        model = Post