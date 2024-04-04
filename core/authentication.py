# import jwt, datetime

# def create_access_token(id):
#     return jwt.encode({
#         'user_id': id,
#         'exp': datetime.utcnow() + datetime.timedelta(minutes=60),
#         'iat': datetime.utcnow()
        
#     }, 'access_secret', algorithm='HS256')
    

# def create_refresh_token(id):
#     return jwt.encode({
#         'user_id': id,
#         'exp': datetime.utcnow() + datetime.timedelta(days=7),
#         'iat': datetime.utcnow()
        
#     }, 'refresh_secret', algorithm='HS256')
import jwt
import datetime
from datetime import timezone
from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication
from rest_framework.authentication import get_authorization_header
from .models import User

class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth = get_authorization_header(request).split()
        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            id = decode_access_token(token)
            
            user = User.objects.get(pk=id)
            
            return (user, None)
            
        raise exceptions.AuthenticationFailed('Unauthenticated')

def create_access_token(id):
    return jwt.encode({
        'user_id': id,
        'exp': datetime.datetime.now(timezone.utc) + datetime.timedelta(seconds=59),
        'iat': datetime.datetime.now(timezone.utc)
    }, 'access_secret', algorithm='HS256')

def decode_access_token(token):
    try:
        payload = jwt.decode(token, 'access_secret', algorithms=['HS256'])
        return payload['user_id']
    except:
        raise exceptions.AuthenticationFailed('Invalid token')

def create_refresh_token(id):
    return jwt.encode({
        'user_id': id,
        'exp': datetime.datetime.now(timezone.utc) + datetime.timedelta(days=7),
        'iat': datetime.datetime.now(timezone.utc)
    }, 'refresh_secret', algorithm='HS256')



def decode_refresh_token(token):
    try:
        payload = jwt.decode(token, 'refresh_secret', algorithms=['HS256'])
        return payload['user_id']
    except:
        raise exceptions.AuthenticationFailed('Invalid token')
