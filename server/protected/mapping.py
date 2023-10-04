from rest_framework import serializers
from .models import MyModel


class MyModelSerializer(serializers.Serializer):
    id       = serializers.UUIDField(read_only=False)
    name     = serializers.CharField(required=True, allow_blank=False, max_length=100)
    param1   = serializers.CharField(required=False, allow_blank=True, max_length=200)
    param2   = serializers.CharField(required=False, allow_blank=True, max_length=200)

    def create(self, validated_data):
        return MyModel.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id       = validated_data.get('id', instance.title)
        instance.name       = validated_data.get('name', instance.title)
        instance.param1     = validated_data.get('param1', instance.code)
        instance.param2     = validated_data.get('param2', instance.linenos)
        instance.updated_at = timezone.now
        instance.save()