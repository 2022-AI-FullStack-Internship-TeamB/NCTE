from django.urls import path, include
from .views import user_views, categories_views, summary_views, note_views, keyword_views
# from .serializers import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from rest_framework_simplejwt.views import TokenVerifyView
# backend url에서 시작 url 확인가능
# backend 서버 실행 시 api 접근을 위해서는 api/v1/~의 방식으로 접근
# url 명이 겹칠경우 분리하기 위해 v1, v2,...의 방식을 사용
# 대부분의 api는 v1으로 적고 겹칠경우에만 version 숫자를 변경

urlpatterns = [
    # 사용자
    path('signup', user_views.UserCreate.as_view()),
    path('user/<int:pk>', user_views.UserDetail.as_view()),

    # 토큰
    path('login', user_views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify', TokenVerifyView.as_view(), name='token_verify'),

    # 메모
    path('notes/<int:pk>/all', note_views.NotesList.as_view()),
    path('notes/textconversion', note_views.NoteTextConversion.as_view()),
    path('notes', note_views.CreateNote.as_view()),
    path('notes/<int:pk>', note_views.NoteDetail.as_view()),

    # 카테고리
    path('category/<int:pk>', categories_views.CreateCategory.as_view()),
    path('category/<int:pk>/<int:pk2>', categories_views.CategoryDetails.as_view()),

    # 요약
    path('summary/<int:pk>', summary_views.SummaryAPI.as_view()),

    # 키워드
    path('keyword/<int:pk>/all', keyword_views.KeywordList.as_view()),
    path('keyword/<int:pk>', keyword_views.KeywordDetail.as_view()),
]
