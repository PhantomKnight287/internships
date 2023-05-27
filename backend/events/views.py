from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Event,User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .serializers import LoginSerializer

@api_view(['GET'])
def get_events(request):
    return Response([{
        "name":"segs"
    }])

@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = authenticate(username=serializer.data['username'],password=serializer.data['password'])
        if user is not None:
            token,_ = Token.objects.get_or_create(user=user)
            return Response({
                "username":user.username,
                "token":token.key
            })
        else:
            return Response({
                "message":"Invalid username or password"
            })
    else:
        return Response({
            "message":"Invalid username or password"
        })
    
@api_view(['POST'])
def register(request):
    serializer = LoginSerializer(data=request.data)
    oldUser = User.objects.filter(username=serializer.data['username'])
    if oldUser:
        return Response({
            "message":"Username already exists"
        },
        status=409
        )
    if serializer.is_valid():
        user = User.objects.create_user(username=serializer.data['username'],password=serializer.data['password'])
        token,_ = Token.objects.get_or_create(user=user)
        return Response({
            "username":user.username,
            "token":token.key
        },
        status=201
        )
    else:
        return Response({
            "message":"Invalid username or password"
        },
        status=400
        )