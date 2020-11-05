#import formularzy Django
from django import forms
#nasz model Post
from .models import Post

#postform - nazwa formularza,  modelForm formularz
class PostForm(forms.ModelForm):
    #class Meta przekazujemy informacje o tym jaki model powinien
    #Byc wykorzystany do stworzenia formularza czyli Post
    class Meta:
        model = Post
        #ktore pola maja byc w formularzu
        fields = ('title', 'text',)