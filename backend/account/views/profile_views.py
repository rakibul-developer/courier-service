from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from core.renderers import Renderer
from rest_framework.permissions import IsAuthenticated
from account.serializers import ProfileSerializer

class UserProfileView(APIView):
  renderer_classes = [Renderer]
  permission_classes = [IsAuthenticated]
  def get(self, request, format=None):
    serializer = ProfileSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)
