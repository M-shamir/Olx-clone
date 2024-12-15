from django.urls import path
from . import views
from .views import ProductListView,ProductDetailView

urlpatterns = [
    path('create/', views.create_product, name='product-create'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:id>/', ProductDetailView.as_view(), name='product-detail')

]
