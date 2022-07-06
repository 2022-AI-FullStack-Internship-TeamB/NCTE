from django.urls import path, include
from ncteApp.views.summary_views import SummaryAPI

# backend url에서 시작 url 확인가능
# backend 서버 실행 시 api 접근을 위해서는 api/v1/~의 방식으로 접근
# url 명이 겹칠경우 분리하기 위해 v1, v2,...의 방식을 사용
# 대부분의 api는 v1으로 적고 겹칠경우에만 version 숫자를 변경

urlpatterns = [
    path('summary/<int:pk>', SummaryAPI.as_view()),
]