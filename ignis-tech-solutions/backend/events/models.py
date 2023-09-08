from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    liked_events = models.ManyToManyField('Event', related_name='liked_events', blank=True)

class Event(models.Model):
    name = models.CharField(max_length=255)
    id = models.AutoField(primary_key=True)
    data = models.TextField()
    time = models.DateTimeField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_events')
    location = models.TextField()
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    is_liked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.author}"
