from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    sName = models.CharField(max_length=100, default='Default Name')
    sAge = models.IntegerField(default=0)
    address = models.CharField(max_length=200, default='Default Address')
    image = models.ImageField(upload_to='profile_images/', default='profile_images/default.jpg')
    email = models.EmailField(default='default@example.com')

    def __str__(self):
        return self.sName

