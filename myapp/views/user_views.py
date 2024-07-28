
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from myapp.serializer import  UserSerializer

# List users (Authenticated users only)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_list(request):
    if request.user.is_staff:
        users = User.objects.all()
    else:
        return Response({"error": "You do not have permission to view all users"}, status=status.HTTP_403_FORBIDDEN)
    
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

# Retrieve user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_retrieve(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if not request.user.is_staff and user != request.user:
        return Response({"error": "You do not have permission to view this user"}, status=status.HTTP_403_FORBIDDEN)

    serializer = UserSerializer(user)
    return Response(serializer.data)

# Update user (Authenticated users only)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def user_update(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if not request.user.is_staff and user != request.user:
        return Response({"error": "You do not have permission to update this user"}, status=status.HTTP_403_FORBIDDEN)

    serializer = UserSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete user (Authenticated users only)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def user_delete(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if not request.user.is_staff and user != request.user:
        return Response({"error": "You do not have permission to delete this user"}, status=status.HTTP_403_FORBIDDEN)

    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
