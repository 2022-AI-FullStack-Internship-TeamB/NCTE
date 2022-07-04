from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from ..models import Summary
from ..serializers import SummarySerializer

# Create your views here.
class SummaryAPI(APIView):
    #특정 note의 summary 정보를 가져옵니다.
    def get(self, request):
        queryset = Summary.objects.filter(note_id=request.Notes.note_id)
        serializer = SummarySerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #특정 note의 summary 정보를 수정합니다.
    def put(self, request):
        summary_instance = self.get_object(Summary.summary_id, request.Notes.note_id)
        data = {
            'summary': request.data.get('summary')
        }
        serializer = SummarySerializer(instance=summary_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)