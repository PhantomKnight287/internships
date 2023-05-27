from django.urls import path
from . import views

# register the urls for the events app
urlpatterns = [
    path('auth/login',views.login),
    path('auth/register',views.register),
    path('auth/me',views.get_profile),
    path('events',views.get_events),
    path('events/me',views.my_events),
    path('events/<int:event_id>/like',views.like_event),
    path('events/<int:event_id>/unlike',views.unlike_event),
    path('event/<int:event_id>',views.get_event),
    path("event",views.create_event)
]