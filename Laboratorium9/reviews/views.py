from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from reviews.models import Review
from reviews.serializers import ReviewSerializer
from rest_framework.decorators import api_view


#GET liste recenzji
#POST nową recenzje 
#DELETE wszystkie recenzje
@api_view(['GET', 'POST', 'DELETE'])
def review_list(request):
    if request.method == 'GET':
        reviews = Review.objects.all()
        
        food = request.GET.get('food', None)
        if food is not None:
            reviews = reviews.filter(food__icontains=food)
        
        reviews_serializer = ReviewSerializer(reviews, many=True)
        return JsonResponse(reviews_serializer.data, safe=False)
        # 'safe=False' for objects serialization
    
    elif request.method == 'POST':
        review_data = JSONParser().parse(request)
        review_serializer = ReviewSerializer(data=review_data)
        if review_serializer.is_valid():
            review_serializer.save()
            return JsonResponse(review_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(review_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def review_detail(request, pk):
    #znajdz recenzje za pomocą pk (ID)
    try: 
        review = Review.objects.get(pk=pk) 
    except Review.DoesNotExist: 
        return JsonResponse({'message': 'The review does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET': 
        review_serializer = ReviewSerializer(review) 
        return JsonResponse(review_serializer.data) 
 
    elif request.method == 'PUT': 
            review_data = JSONParser().parse(request) 
            review_serializer = ReviewSerializer(review, data=review_data) 
            if review_serializer.is_valid(): 
                review_serializer.save() 
                return JsonResponse(review_serializer.data) 
            return JsonResponse(review_serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

    elif request.method == 'DELETE': 
        review.delete() 
        return JsonResponse({'message': 'Review was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT) 

        # delete all
        # count = Tutorial.objects.all().delete()
        # return JsonResponse({'message': '{} Tutorials were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)

#GET wszystkie opublikowane recenzje
@api_view(['GET'])
def review_list_published(request):
    reviews = Review.objects.filter(published=True)
        
    if request.method == 'GET': 
        reviews_serializer = ReviewSerializer(reviews, many=True)
        return JsonResponse(reviews_serializer.data, safe=False)