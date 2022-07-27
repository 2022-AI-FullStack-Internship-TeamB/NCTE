from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import CategorySerializer
from ..models import Categories


class CreateCategory(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(Util.response(True, serializer.data, 200), status=status.HTTP_200_OK)
        return Response(Util.response(False, serializer.errors, 400), status=status.HTTP_400_BAD_REQUEST)

class CategoryDetails(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk):
        queryset = Categories.objects.filter(category_id=pk)
        serializer = CategorySerializer(queryset, many=True)
        return Response(Util.response(True, serializer.data, 200), status=status.HTTP_200_OK)

    def put(self, request, pk):
        category_instance = Categories.objects.get(category_id=pk)
        data = request.data
        serializer = CategorySerializer(
            instance=category_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(Util.response(True, serializer.data, 200), status=status.HTTP_200_OK)
        return Response(Util.response(False, serializer.errors, 400), status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        category = Categories.objects.filter(category_id=pk)
        category.delete()
        return Response(Util.response(True, "", 204), status=status.HTTP_204_NO_CONTENT)

class Util():
    def response(success, data, status):
        return {
            "success": success,
            "result": data,
            "status": status
        }
