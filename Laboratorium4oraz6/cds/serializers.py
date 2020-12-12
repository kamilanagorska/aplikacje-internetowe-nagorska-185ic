from rest_framework import serializers
from .models import Album

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'artist', 'title', 'genre', 'release_date', 'num_songs')
        model = Album
