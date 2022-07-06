from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from ncteApp.models import Summary
from ncteApp.serializers import SummarySerializer

# Create your views here.
class SummaryAPI(APIView):
    #특정 note의 summary 정보를 가져옵니다.
    def get(self, request, pk):
        queryset = Summary.objects.filter(note_id=pk)
        serializer = SummarySerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #특정 note의 summary 정보를 수정합니다.
    def put(self, request, pk):
        summary_instance = Summary.objects.get(note_id=pk)
        data = request.data
        serializer = SummarySerializer(instance=summary_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
