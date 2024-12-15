from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, parser_classes
from rest_framework import generics
# Create your views here.

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def create_product(request):
    user = request.user  # Assuming user is authenticated

    brand = request.data.get('brand')
    year = request.data.get('year')
    km_driven = request.data.get('km_driven')
    title = request.data.get('title')
    description = request.data.get('description')
    price = request.data.get('price')
    state_name = request.data.get('location')
    name = request.data.get('name')
    phone_number = request.data.get('phone_number')

    product = Product.objects.create(
        user=user,
        brand=brand,
        year=year,
        km_driven=km_driven,
        title=title,
        description=description,
        price=price,
        state_name=state_name,
        name=name,
        phone_number=phone_number,
        image_1=request.FILES.get('image1'),
        image_2=request.FILES.get('image2'),
        image_3=request.FILES.get('image3'),
    )

    return Response({'message': 'Product created successfully', 'product': product.id})


class ProductListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        
        products = Product.objects.exclude(user=request.user)
        
       
        serializer = ProductSerializer(products, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

class ProductDetailView(generics.RetrieveAPIView):
     queryset = Product.objects.all()
     serializer_class = ProductSerializer
     lookup_field ='id'