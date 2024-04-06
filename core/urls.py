from django.urls import path
from .views import TwoFactorLoginAPIView, ForgotResetAPIView,ResetAPIView, RegisterAPIView,LogoutAPIVIEW, LoginAPIView, UserAPIView, RefreshAPIView

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
    path("refresh", RefreshAPIView.as_view(), name="RefreshAPIView"),    
    path("logout", LogoutAPIVIEW.as_view(), name="LogoutAPIVIEW"),
    path("forgot", ForgotResetAPIView.as_view(), name="ForgotResetAPIView"),  
    path("reset", ResetAPIView.as_view(), name="ResetAPIView") ,
    path("two-factor", TwoFactorLoginAPIView.as_view(), name="FactorAPIView"),
]
