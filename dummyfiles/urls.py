# from django.urls import path
# from .dummyfiles import views

# urlpatterns = [
#     # Authentication endpoints
#     path('register/', views.register, name='register'),
#     path('login/', views.my_token_obtain_pair, name='login'),
#     path('token/refresh/', views.token_refresh, name='token_refresh'),
    
#     # User management endpoints
#     path('users/', views.user_list, name='user_list'),  # List users
#     path('users/<int:pk>/', views.user_retrieve, name='user_retrieve'),  # Retrieve user
#     path('users/<int:pk>/update/', views.user_update, name='user_update'),  # Update user
#     path('users/<int:pk>/delete/', views.user_delete, name='user_delete'),  # Delete user
    
#     # Profile management endpoints
#      path('profiles/create/', views.profile_create, name='profile_create'),
#     path('profiles/', views.profile_list, name='profile_list'),  # List profiles
#     path('profiles/<int:pk>/', views.profile_retrieve, name='profile_retrieve'),  # Retrieve profile
#     path('profiles/<int:pk>/update/', views.profile_update, name='profile_update'),  # Update profile
#     path('profiles/<int:pk>/partial-update/', views.profile_partial_update, name='profile_partial_update'),  # Partially update profile
#     path('profiles/<int:pk>/delete/', views.profile_delete, name='profile_delete'),  # Delete profile
# ]
