from ..models import Notes, Summary
from ml.summary_model import get_summary
from ml.keyword_model import get_keyword
from rest_framework import permissions, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import NoteSerializer, SummarySerializer
from django.db.models import Q, F


class NotesList(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk):
        queryset = Notes.objects.filter(user_id=pk)
        serializer = NoteSerializer(queryset, many=True)
        return Response(Util.response(True, serializer.data, 200), status=status.HTTP_200_OK)


class CreateNote(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            note_id = serializer.data["note_id"]
            contents = serializer.data["contents"]
            summary = get_summary(contents)
            s_serializer = SummarySerializer(
                data={"note_id": note_id, "summary": summary})
            if s_serializer.is_valid():
                s_serializer.save()
                return Response(Util.response(True, serializer.data, 201), status=status.HTTP_201_CREATED)
            return Response(Util.response(False, s_serializer.errors, 400), status=status.HTTP_400_BAD_REQUEST)
        return Response(Util.response(False, serializer.errors, 400), status=status.HTTP_400_BAD_REQUEST)


class NoteDetail(APIView):
    permission_classes = [permissions.AllowAny]

    def get_object(self, pk):
        try:
            note = Notes.objects.get(pk=pk)
            return note
        except Notes.DoesNotExist:
            return Response(data=Util.response(False, "NOT FOUND", 400), status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        note = Notes.objects.filter(note_id=pk)
        querysest = note.select_related(
            "category_id", "user_id").values('category_id__category', 'user_id__username')
        querysest = querysest.values(category=F(
            'category_id__category'), username=F('user_id__username'))

        return Response(data=Util.response(True, querysest.values("note_id", "username", "title", "contents", "date", "category"), status.HTTP_200_OK), status=status.HTTP_200_OK)

    def put(self, request, pk):
        user = self.get_object(pk)
        serializer = NoteSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            note_id = serializer.data["note_id"]
            contents = serializer.data["contents"]
            summary = get_summary(contents)
            s = Summary.objects.filter(note_id=note_id).first()
            s_serializer = SummarySerializer(s,
                                             data={"note_id": note_id, "summary": summary})
            if s_serializer.is_valid():
                s_serializer.save()
                return Response(Util.response(True, serializer.data, 200), status=status.HTTP_200_OK)
            return Response(Util.response(False, s_serializer.errors, 400), status=status.HTTP_400_BAD_REQUEST)
        return Response(Util.response(False, serializer.errors, 400), status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        note = Notes.objects.filter(note_id=pk)
        note.delete()
        return Response(Util.response(True, "", 204), status=status.HTTP_204_NO_CONTENT)


class Util():
    def response(success, data, status):
        return {
            "success": success,
            "result": data,
            "status": status
        }
