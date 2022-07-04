from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import status
from ncteApp.models import Summary
from ncteApp.serializers import SummarySerializer

# Create your views here.
class SummaryAPI(APIView):
    #특정 note의 summary 정보를 가져옵니다.
    @api_view(['GET'])
    def summary_detail(self, v1):
        queryset = Summary.objects.filter(note_id=v1)
        serializer = SummarySerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #특정 note의 summary 정보를 수정합니다.
    @api_view(['PUT'])
    def summary_update(self, request, v2):
        summary_instance = self.get_object(Summary.summary_id, note_id=v2)
        data = {
            'summary': request.data.get('summary')
        }
        serializer = SummarySerializer(instance=summary_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)