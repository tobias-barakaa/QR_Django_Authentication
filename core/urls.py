from django.urls import path
from .views import ForgotResetAPIView,ResetAPIView, RegisterAPIView,LogoutAPIVIEW, LoginAPIView, UserAPIView, RefreshAPIVIEW

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
    path("user", UserAPIView.as_view(), name="user"),
    path("refresh", RefreshAPIVIEW.as_view(), name="RefreshAPIVIEW"),    
    path("logout", LogoutAPIVIEW.as_view(), name="LogoutAPIVIEW"),
    path("forgot", ForgotResetAPIView.as_view(), name="ForgotResetAPIView"),  
    path("reset", ResetAPIView.as_view(), name="ResetAPIView")  

]
