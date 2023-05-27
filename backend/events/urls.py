from django.urls import path
from . import views

urlpatterns = [
    path('',views.get_events),
    path('login/',views.login),
    path('register/',views.register)
]