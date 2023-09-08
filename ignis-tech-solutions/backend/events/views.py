from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from .models import Event, User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .serializers import LoginSerializer, EventResponseSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.db.models import F, Q
from datetime import datetime, timedelta


@api_view(["POST"])
@permission_classes([]) # Allow any user (authenticated or not) to hit this endpoint
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = authenticate(
            username=serializer.data["username"], password=serializer.data["password"]
        )
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"username": user.username, "token": token.key})
        else:
            return Response({"message": "Invalid username or password"})
    else:
        return Response({"message": "Invalid username or password"})


@api_view(["POST"])
@permission_classes([])
def register(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid() == False:
        return Response({"message": "Invalid data"}, status=400)
    oldUser = User.objects.filter(username=serializer.data["username"])
    if oldUser:
        return Response({"message": "Username is already taken"}, status=409)
    if serializer.is_valid():
        user = User.objects.create_user(
            username=serializer.data["username"], password=serializer.data["password"]
        )
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"username": user.username, "token": token.key}, status=201)
    else:
        return Response({"message": "Invalid username or password"}, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def get_profile(request):
    token = request.headers["Authorization"].split(" ")[1]
    user = Token.objects.get(key=token).user
    if not user:
        return Response({"message": "Invalid token"}, status=400)
    return Response({"username": user.username}, status=200)


@api_view(["GET"])
@permission_classes([])
def get_events(request):
    events = (
        Event.objects.all()
        .annotate(author_username=F("author__username"))
        .filter(time__gte=datetime.now())
        .values(
            "id",
            "name",
            "data",
            "time",
            "author_username",
            "location",
            "image",
            "is_liked",
        ).order_by("time")
    )
    serializer = EventResponseSerializer(events, many=True)
    return Response(serializer.data, status=200)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def like_event(request, event_id: int):
    token = request.headers["Authorization"].split(" ")[1]
    user = Token.objects.get(key=token).user
    if not user:
        return Response({"message": "Invalid token"}, status=400)
    print(event_id)
    event = Event.objects.get(id=event_id)
    if event.is_liked == True:
        return Response({"message": "Event already liked"}, status=400)
    event.is_liked = True
    event.save()
    return Response({"message": "Event liked"}, status=200)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def unlike_event(request, event_id: int):
    token = request.headers["Authorization"].split(" ")[1]
    user = Token.objects.get(key=token).user
    if not user:
        return Response({"message": "Invalid token"}, status=400)
    event = Event.objects.get(id=event_id)
    if event.is_liked == False:
        return Response({"message": "Event not liked"}, status=400)
    event.is_liked = False
    event.save()
    return Response({"message": "Event unliked"}, status=200)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def create_event(request):
    token = request.headers["Authorization"].split(" ")[1]
    user = Token.objects.get(key=token).user
    if not user:
        return Response({"message": "Invalid token"}, status=400)
    name = request.POST.get("name")
    data = request.POST.get("data")
    time = request.POST.get("time")
    location = request.POST.get("location")
    image = request.data.get("image")
    print(image)
    event = Event.objects.create(
        name=name, data=data, time=time, author=user, location=location, image=image
    )
    return Response({"message": "Event created", "id": event.id}, status=200)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def my_events(request):
    token = request.headers["Authorization"].split(" ")[1]
    user = Token.objects.get(key=token).user
    if not user:
        return Response({"message": "Invalid token"}, status=400)
    events = (
        Event.objects.filter(author=user)
        .annotate(author_username=F("author__username"))
        .values(
            "id",
            "name",
            "data",
            "time",
            "author_username",
            "location",
            "image",
            "is_liked",
        ).order_by("-time")
    )
    serializer = EventResponseSerializer(events, many=True)
    return Response(serializer.data, status=200)


@api_view(["GET"])
@permission_classes([])
def get_event(request, event_id: int):
    event = (
        Event.objects.filter(id=event_id)
        .annotate(author_username=F("author__username"))
        .values(
            "id",
            "name",
            "data",
            "time",
            "author_username",
            "location",
            "image",
            "is_liked",
        )
        .first()
    )
    serializer = EventResponseSerializer(event)
    return Response(serializer.data, status=200)
