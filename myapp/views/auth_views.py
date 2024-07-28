from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.exceptions import TokenError
from myapp.serializer import MyTokenObtainPairSerializer
 
 
#Register a new user view
@api_view(['POST'])
def register(request):
    data = request.data
    try:
        user = User.objects.create_user(
            username=data['username'],
            password=data['password'],
            email=data['email']
        )
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Login view
@api_view(['POST'])
def my_token_obtain_pair(request):
    serializer = MyTokenObtainPairSerializer(data=request.data)
    
    try:
        serializer.is_valid(raise_exception=True)
    except TokenError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.validated_data, status=status.HTTP_200_OK)

# Token refresh view
@api_view(['POST'])
def token_refresh(request):
    from rest_framework_simplejwt.views import TokenRefreshView
    return TokenRefreshView.as_view()(request)
