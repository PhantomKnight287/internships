from rest_framework import serializers

class BaseSerializer(serializers.Serializer):
    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass

class LoginSerializer(BaseSerializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=255)
    class Meta:
        fields = ['username','password']