from ..models import Keywords
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import KeywordSerializer
from django.db.models import Q, F


class KeywordList(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk):
        queryset = Keywords.objects.filter(note_id=pk)
        serializer = KeywordSerializer(queryset, many=True)
        return Response(Util.response(True, serializer.data, 200), status=status.HTTP_200_OK)


class KeywordDetail(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        keyword = request.GET.get('keyword')
        note_id = request.GET.get('id')
        queryset = Keywords.objects.filter(note_id=note_id, keyword=keyword)
        serializer = KeywordSerializer(queryset, many=True)
        return Response(Util.response(True, serializer.data, 200), status=status.HTTP_200_OK)

    def delete(self, request):
        keyword = request.GET.get('keyword')
        note_id = request.GET.get('id')
        note = Keywords.objects.filter(note_id=note_id, keyword=keyword)
        note.delete()
        return Response(Util.response(True, "", 204), status=status.HTTP_204_NO_CONTENT)


class Util():
    def response(success, data, status):
        return {
            "success": success,
            "result": data,
            "status": status
        }
