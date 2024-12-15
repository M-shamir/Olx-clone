from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to authenticated user
    brand = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    km_driven = models.PositiveIntegerField()
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_1 = models.ImageField(upload_to='products/', blank=True, null=True)
    image_2 = models.ImageField(upload_to='products/', blank=True, null=True)
    image_3 = models.ImageField(upload_to='products/', blank=True, null=True)
    name =models.CharField(max_length=200,default="noname")
    state_name = models.CharField(max_length=100, blank=True, null=True)  
    phone_number = models.CharField(max_length=15, blank=True, null=True)  
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
