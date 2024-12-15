from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    image_1 = serializers.ImageField(use_url=True)
    image_2 = serializers.ImageField(use_url=True)
    image_3 = serializers.ImageField(use_url=True)

    class Meta:
        model = Product
        fields = [
            'id', 'user', 'brand', 'year', 'km_driven', 
            'title', 'description', 'price', 
            'image_1', 'image_2', 'image_3', 'state_name', 'phone_number', 'created_at'
        ]
        read_only_fields = ['user', 'created_at']