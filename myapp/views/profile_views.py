from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from myapp.models import Profile
from myapp.serializer import ProfileSerializer


# List profiles
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_list(request):
    if request.user.is_staff:
        profiles = Profile.objects.all()
    else:
        profiles = Profile.objects.filter(user=request.user)
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)

# Retrieve profile
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_retrieve(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if not request.user.is_staff and profile.user != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)

    serializer = ProfileSerializer(profile)
    return Response(serializer.data)

# Update profile
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def profile_update(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if not request.user.is_staff and profile.user != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)

    serializer = ProfileSerializer(profile, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Partially update profile
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def profile_partial_update(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if not request.user.is_staff and profile.user != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)

    serializer = ProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete profile
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def profile_delete(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if not request.user.is_staff and profile.user != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)

    profile.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def profile_create(request):
    # Extract necessary data from request
    data = request.data
    # Ensure the user is assigned to the profile
    data['user'] = request.user.id
    
    # Create and validate the serializer
    serializer = ProfileSerializer(data=data)
    if serializer.is_valid():
        serializer.save()  # Save the profile with the associated user
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)