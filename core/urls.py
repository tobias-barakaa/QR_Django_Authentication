from django.urls import path
from .views import RegisterAPIView,LogoutAPIVIEW, LoginAPIView, UserAPIiew, RefreshAPIVIEW

# urlpatterns = [
#     path("register", RegisterAPIView.as_view(), name="register"),
#     path("login", LoginAPIView.as_view(), name="login"),
#     path("user", UserAPIiew.as_view(), name="user"),
#     path("refresh", RefreshAPIVIEW.as_view(), name="RefreshAPIVIEW"),    
#     path("logout", LogoutAPIView.as_view(), name="LogoutAPIVIEW")
       
    
# ]

urlpatterns = [
    path("register", RegisterAPIView.as_view(), name="register"),
    path("login", LoginAPIView.as_view(), name="login"),
    path("user", UserAPIiew.as_view(), name="user"),
    path("refresh", RefreshAPIVIEW.as_view(), name="RefreshAPIVIEW"),    
    path("logout", LogoutAPIVIEW.as_view(), name="LogoutAPIVIEW")  
]
