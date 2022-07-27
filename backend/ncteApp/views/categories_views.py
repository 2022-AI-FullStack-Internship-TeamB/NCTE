from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import CategorySerializer
from ..models import Categories


class CreateCategory(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, pk):
        serializer = CategorySerializer(data={"user_id": pk, "category": str(request.data)})
        if serializer.is_valid():
            serializer.save()
            return Response(Util.response(True, serializer.data, 200), status=status.HTTP_200_OK)
        return Response(Util.response(False, serializer.errors, 400), status=status.HTTP_400_BAD_REQUEST)

class CategoryDetails(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk, pk2):
        queryset = Categories.objects.filter(user_id=pk, category_id=pk2)
        serializer = CategorySerializer(queryset, many=True)
        return Response(Util.response(True, serializer.data, 200), status=status.HTTP_200_OK)

    def put(self, request, pk, pk2):
        category_instance = Categories.objects.get(user_id=pk, category_id=pk2)
        data = request.data
        serializer = CategorySerializer(
            instance=category_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(Util.response(True, serializer.data, 200), status=status.HTTP_200_OK)
        return Response(Util.response(False, serializer.errors, 400), status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, pk2):
        category = Categories.objects.filter(user_id=pk, category_id=pk2)
        category.delete()
        return Response(Util.response(True, "", 204), status=status.HTTP_204_NO_CONTENT)

class Util():
    def response(success, data, status):
        return {
            "success": success,
            "result": data,
            "status": status
        }
