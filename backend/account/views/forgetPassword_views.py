from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from account.serializers import UserPasswordResetSerializer, SendPasswordResetEmailSerializer
from core.renderers import Renderer

class SendPasswordResetEmailView(APIView):
    renderer_classes = [Renderer]

    def post(self, request, format=None):
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        return Response({
            'msg': 'Password Reset link sent. Please check your Email',
            'uid': serializer.validated_data['uid'],
            'token': serializer.validated_data['token']
        }, status=status.HTTP_200_OK)

class UserPasswordResetView(APIView):
    renderer_classes = [Renderer]

    def post(self, request, uid, token, format=None):
        serializer = UserPasswordResetSerializer(data=request.data, context={'uid': uid, 'token': token})
        serializer.is_valid(raise_exception=True)

        print("Validated Data:", serializer.validated_data)  # Debugging line

        return Response({
            'msg': 'Password Reset Successfully',
            'uid': serializer.validated_data.get('uid', 'Unknown UID'),
            'token': serializer.validated_data.get('token', 'Unknown Token')
        }, status=status.HTTP_200_OK)
