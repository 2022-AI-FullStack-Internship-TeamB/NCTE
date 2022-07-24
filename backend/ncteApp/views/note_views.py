import numpy
from django.db.models import F
from ml.ocr_model import text_conversion
from ml.summary_model import get_summary
from ml.keyword_model import get_keyword
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from PIL import Image

from ..models import Categories, Notes, NoteImages, Summary, Keywords, ConvertedText
from ..forms import FileUploadForm
from ..serializers import KeywordSerializer, NoteSerializer, SummarySerializer, ConvertedTextSerializer


class NotesList(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk):
        category_pk = request.GET.get('category')
        if category_pk == 'all' or category_pk == None:
            queryset = Notes.objects.filter(user_id=pk)
        else:
            print(Categories.objects.get(
                category=category_pk).category_id)
            category_id = Categories.objects.get(
                category=category_pk).category_id
            queryset = Notes.objects.filter(
                user_id=pk, category_id=category_id)
        queryset = queryset.order_by('-date')
        serializer = NoteSerializer(queryset, many=True)
        return Response(Util.response(True, serializer.data, 200), status=status.HTTP_200_OK)

class NoteTextConversion(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        form = FileUploadForm(request.POST, request.FILES)
        if(form.is_valid()):
            form.save()
            noteimage = NoteImages.objects.last()
            image = Image.open(noteimage.image)
            np_image = numpy.array(image)
            converted_text = text_conversion(np_image)
            contents = " ".join(map(str, converted_text))
            serializer = ConvertedTextSerializer(data={"text": contents})
            if serializer.is_valid():
                serializer.save()
                return Response(Util.response(True, serializer.data, 201), status=status.HTTP_201_CREATED)
            return Response(Util.response(False, serializer.errors, 400), status=status.HTTP_400_BAD_REQUEST)
        return Response(Util.response(False, form.errors, 400), status=status.HTTP_400_BAD_REQUEST)

class CreateNote(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            note_id = serializer.data["note_id"]
            contents = serializer.data["contents"]

            # 요약
            summary = get_summary(contents)
            s_serializer = SummarySerializer(
                data={"note_id": note_id, "summary": summary})
            s_check = True
            if s_serializer.is_valid():
                s_serializer.save()
            else:
                s_check = False

            # 키워드
            keywords = get_keyword(contents)
            k_check = True
            for i in range(len(keywords)):
                k_serializer = KeywordSerializer(
                    data={"note_id": note_id, "keyword": keywords[i]})
                if k_serializer.is_valid():
                    k_serializer.save()
                else:
                    k_check = False
            if s_check and k_check:
                return Response(Util.response(True, serializer.data, 201), status=status.HTTP_201_CREATED)
            if not s_check:
                return Response(Util.response(False, s_serializer.errors, 400), status=status.HTTP_400_BAD_REQUEST)
            if not k_check:
                return Response(Util.response(False, k_serializer.errors, 400), status=status.HTTP_400_BAD_REQUEST)
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
        queryset = note.select_related(
            "category_id").values('category_id__category').prefetch_related("summary_set")
        queryset = queryset.values(category=F(
            'category_id__category'), summary=F('summary__summary'))
        values = queryset.values('note_id', 'title', 'contents', 'date', 'summary', 'category')
        keywords = Keywords.objects.filter(note_id=pk)
        data = {
            "note_id": values[0]["note_id"],
            "title": values[0]["title"],
            "contents": values[0]["contents"],
            "date": values[0]["date"],
            "summary": values[0]["summary"],
            "category": values[0]["category"],
            "keywords": keywords.values('keyword', 'keyword_id')
            }
        
        return Response(data=Util.response(True, data, status.HTTP_200_OK), status=status.HTTP_200_OK)

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
            s_check = True
            if s_serializer.is_valid():
                s_serializer.save()
            else:
                s_check = False

            # 키워드
            keywords = get_keyword(contents)
            k_check = True
            records = Keywords.objects.filter(note_id=note_id)
            records.delete()
            for i in range(len(keywords)):
                k_serializer = KeywordSerializer(
                    data={"note_id": note_id, "keyword": keywords[i]})
                if k_serializer.is_valid():
                    k_serializer.save()
                else:
                    k_check = False

            if s_check and k_check:
                return Response(Util.response(True, serializer.data, 201), status=status.HTTP_201_CREATED)
            if not s_check:
                return Response(Util.response(False, s_serializer.errors, 400), status=status.HTTP_400_BAD_REQUEST)
            if not k_check:
                return Response(Util.response(False, k_serializer.errors, 400), status=status.HTTP_400_BAD_REQUEST)
            
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
