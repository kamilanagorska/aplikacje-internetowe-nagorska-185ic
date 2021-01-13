from rest_framework import serializers 
from reviews.models import Review
 
#Serializer tłumaczy dane na format, który jest łatwy do wykorzystania w Internecie,
#zazwyczaj JSON, i jest wyświetlany w punkcie końcowym interfejsu API
#Serializer może też określić, które pola mają zostać uwzględnione lub wykluczone
class ReviewSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Review
        fields = ('id',
                  'food',
                  'description',
                  'score',
                  'published') 