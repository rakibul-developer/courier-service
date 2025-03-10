from rest_framework import serializers
from .models import Package
from account.models import User

class PackageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Package
        fields = '__all__'