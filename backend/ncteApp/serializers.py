from dataclasses import field
from rest_framework import serializers
from .models import Users
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user

    class Meta:
        model = Users
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'email']
        extra_kwargs = {  # 유효성 검사에서 제외
            'username': {'validators': []},
        }


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = Users.EMAIL_FIELD

# jwt token 결과 커스텀


class MyTokenObtainPairSerializer(EmailTokenObtainPairSerializer):
    # response 커스텀
    default_error_messages = {
        'no_active_account': {'message': 'email or password is incorrect!',
                              'success': False,
                              'status': 401}
    }

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        # Add extra responses here
        data['id'] = self.user.id
        data['username'] = self.user.username
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['success'] = True

        return data
