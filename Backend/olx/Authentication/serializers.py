from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate



class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,min_length=8)
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # Create and return the user instance
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    def validate(self,data):
        username = data.get("username")
        password = data.get("password")
        if username and password:
            user = authenticate(username=username,password=password)
            if not user:
                raise serializers.ValidationError("Invalid username or password")
            data['user']=user
        else:
            raise serializers.ValidationError("Both fields are required")
        return data