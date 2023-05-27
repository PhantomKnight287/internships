from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    events = models.ManyToManyField('Event', related_name='events', blank=True)

class Event(models.Model):
    name = models.CharField(max_length=255)
    data = models.TextField()
    time = models.DateTimeField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.TextField()
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    likes = models.ManyToManyField(User, related_name='likes', blank=True)

    def __str__(self):
        return f"{self.name} - {self.author}"
