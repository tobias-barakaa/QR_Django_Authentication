from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
# class Departments(models.Model):
#     DepartmentId = models.AutoField(primary_key=True)
#     DepartmentName = models.CharField(max_length=100)

# class Employees(models.Model):
#     EmployeeId = models.AutoField(primary_key=True)
#     EmployeeName = models.CharField(max_length=100)
#     Department = models.CharField(max_length=100)
#     DateOfJoining = models.DateField()
#     PhotoFileName = models.CharField(max_length=100)

class User(AbstractUser):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=100)
    username = None
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
class UserToken(models.Model):
    user_id = models.IntergerField()
    token = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    expired_at = models.DateTimeField()