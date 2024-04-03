# from django.shortcuts import render
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework import exceptions, status
# from .serializers import UserSerializer
# from .models import User
# from .authentication import decode_refresh_token, create_access_token,JWTAuthentication , create_refresh_token
# from rest_framework.authentication import get_authorization_header
from django.urls import path
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import exceptions, status
import datetime
from .serializers import UserSerializer
from .models import Reset, User, UserToken
from .authentication import decode_refresh_token, create_access_token, JWTAuthentication, create_refresh_token
from rest_framework.authentication import get_authorization_header
import random
import string
# Create your views here.
class RegisterAPIView(APIView):
    def post(self, request):
        data = request.data
        
        if data['password'] != data['password_confirm']:
            raise exceptions.APIException('Passwords do not match')
        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginAPIView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        
        user = User.objects.filter(email=email).first()
        
        if user is None:
            raise exceptions.AuthenticationFailed('User not found')
        
        if not user.check_password(password):
            raise exceptions.AuthenticationFailed('Incorrect password')
        
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)
        UserToken.objects.create(
            user_id=user.id,
            token=refresh_token,
            expired_at=datetime.datetime.urcnow() + datetime.timedelta(days=7)
        )

        response = Response({'token': access_token}, status=status.HTTP_200_OK)
        response.set_cookie(key='refresh_token', value=refresh_token, httponly=True)

        return response

class UserAPIiew(APIView):
    authentication_classes = [JWTAuthentication]
    
    def get(self, request):
        return Response(UserSerializer(request.user).data)

class RefreshAPIVIEW(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        id = decode_refresh_token(refresh_token)
        if not UserToken.objects.filter(
            user_id=id, 
            token=refresh_token,
            expired_at__gt=datetime.datetime.now(tz=datetime.timezone.utc)
            
        ).exists():
            raise exceptions.AuthenticationFailed('Unauthenticated')
        
        access_token = create_access_token(id)
        return Response(access_token)
    

class LogoutAPIVIEW(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        UserToken.objects.filter(token=refresh_token).delete()
        
        response = Response()
        response.delete_cookie('refresh_token')  # Provide the name of the cookie directly
        response.data = {
            'message': 'success'
        }
        return response

class ResetAPIView(APIView):
    def post(self, request):
        token = ''.join(random.choice(string.ascii_lowercase + string.digits) for i in range(10))
        
        Reset.objects.create(
            email=request.data['email'],
            token=token
        )
        
        return Response({'message': 'success'})