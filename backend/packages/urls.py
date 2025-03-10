from django.urls import path
from .views import PackageListCreateView, PackageRetrieveUpdateDestroyView

urlpatterns = [
    path('packages/', PackageListCreateView.as_view(), name='package-list-create'),
    path('packages/<int:pk>/', PackageRetrieveUpdateDestroyView.as_view(), name='package-retrieve-update-destroy'),
]