from ast import Delete
from urllib import request
from django.shortcuts import render
from ..serializers import UserInfoSerializer, UserSerializer, MyTokenObtainPairSerializer
from ..models import Users
from rest_framework import permissions, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView


class UserCreate(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(Util.response(True, serializer.data, 201), status=status.HTTP_201_CREATED)
        return Response(Util.response(False, serializer.errors, 400), status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):
    permission_classes = [permissions.AllowAny]

    def get_object(self, pk):
        try:
            user = Users.objects.get(pk=pk)
            return user
        except Users.DoesNotExist:
            return Response(data=Util.response(False, "NOT FOUND", 400), status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        serializer = UserInfoSerializer(self.get_object(pk))
        return Response(Util.response(True, serializer.data, 200), status=status.HTTP_200_OK)

    def put(self, request, pk):
        user = self.get_object(pk)
        serializer = UserInfoSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(Util.response(True, serializer.data, 200), status=status.HTTP_200_OK)
        return Response(Util.response(False, serializer.errors, 400), status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class Util():
    def response(success, data, status):
        return {
            "success": success,
            "result": data,
            "status": status
        }
