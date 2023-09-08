from rest_framework import serializers
from .models import Event


class BaseSerializer(serializers.Serializer):
    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass


class LoginSerializer(BaseSerializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=255)

    class Meta:
        fields = ["username", "password"]


class EventResponseSerializer(BaseSerializer):
    name = serializers.CharField(max_length=255)
    id = serializers.IntegerField()
    data = serializers.CharField()
    time = serializers.DateTimeField()
    author_username = serializers.CharField()
    location = serializers.CharField()
    image = serializers.CharField()
    is_liked = serializers.BooleanField()

    class Meta:
        fields ="__all__"
