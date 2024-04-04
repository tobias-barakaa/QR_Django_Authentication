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
from django.core.mail import send_mail


from datetime import datetime, timedelta

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

# class LoginAPIView(APIView):
#     def post(self, request):
#         email = request.data['email']
#         password = request.data['password']
        
#         user = User.objects.filter(email=email).first()
        
#         if user is None:
#             raise exceptions.AuthenticationFailed('User not found')
        
#         if not user.check_password(password):
#             raise exceptions.AuthenticationFailed('Incorrect password')
        
#         access_token = create_access_token(user.id)
#         refresh_token = create_refresh_token(user.id)
#         UserToken.objects.create(
#             user_id=user.id,
#             token=refresh_token,
#             expired_at=datetime.datetime.utcnow() + datetime.timedelta(days=7)
#         )

#         response = Response({'token': access_token}, status=status.HTTP_200_OK)
#         response.set_cookie(key='refresh_token', value=refresh_token, httponly=True)

#         return response

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
            expired_at=datetime.utcnow() + timedelta(days=7) # corrected line
        )

        # Include both tokens in the response
        response_data = {
            'access_token': access_token,
            'refresh_token': refresh_token
        }
        response = Response(response_data, status=status.HTTP_200_OK)
        
        # Set the refresh token as a cookie
        response.set_cookie(key='refresh_token', value=refresh_token, httponly=True)

        return response


class UserAPIView(APIView):
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

class ForgotResetAPIView(APIView):
    def post(self, request):
        email = request.data['email']
        token = ''.join(random.choice(string.ascii_lowercase + string.digits) for i in range(10))
        
        Reset.objects.create(
            email=request.data['email'],
            token=token
        )
        url = 'http://localhost:3000/reset/' + token
        send_mail(
            subject='Password Reset',
            message='Click <a href="%s"> here </a>is your password reset link' % url,
            from_email='from@example.com',
            recipient_list=[email]
)

        
        return Response({'message': 'success'})

class ResetAPIView(APIView):
    def post(self, request):
        data = request.data
        
        if data['password'] != data['password_confirm']:
            raise exceptions.APIException('Passwords do not match')
        
        reset_password = Reset.objects.filter(token=data['token']).first()
        
        if not reset_password:
            raise exceptions.APIException('Invalid token')
        
        user = User.objects.filter(email=reset_password.email).first()
        
        if not user:
            raise exceptions.APIException('User not found')
        
        user.set_password(data['password'])
        user.save()
        
        return Response({'message': 'success'})