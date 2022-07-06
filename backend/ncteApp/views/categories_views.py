from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import CategorySerializer


class CreateCategory(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.data, status.HTTP_400_BAD_REQUEST)
