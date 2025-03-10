from rest_framework import generics, permissions
from packages.models import Package
from packages.serializers import PackageSerializer

class PackageListCreateView(generics.ListCreateAPIView):
    queryset = Package.objects.filter(is_deleted=False)  # Only show non-deleted packages
    serializer_class = PackageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

class PackageRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Package.objects.filter(is_deleted=False)  # Only show non-deleted packages
    serializer_class = PackageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_destroy(self, instance):
        # Soft delete: Set is_deleted to True
        instance.is_deleted = True
        instance.save()