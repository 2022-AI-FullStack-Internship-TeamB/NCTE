from ..models import Notes
from rest_framework import permissions, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import NoteSerializer
from django.db.models import Q, F

class NotesList(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk):
        queryset = Notes.objects.filter(user_id=pk)
        serializer = NoteSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateNote(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.data, status.HTTP_400_BAD_REQUEST)


class NoteDetail(APIView):
    permission_classes = [permissions.AllowAny]

    def get_object(self, pk):
        try:
            note = Notes.objects.get(pk=pk)
            return note
        except Notes.DoesNotExist:
            return Response(data={"data": "not found"}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk):
        note = Notes.objects.filter(note_id=pk)
        querysest = note.select_related(
            "category_id", "user_id").values('category_id__category', 'user_id__username')
        querysest = querysest.values(category=F(
            'category_id__category'), username=F('user_id__username'))

        return Response(querysest.values("note_id", "username", "title", "contents", "date", "category"), status=status.HTTP_200_OK)

    def put(self, request, pk):
        user = self.get_object(pk)
        serializer = NoteSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(data={"data": "fail"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        note = Notes.objects.filter(note_id=pk)
        note.delete()
        return Response(data={"data": "success"}, status=status.HTTP_200_OK)
