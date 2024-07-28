# your_app/urls.py
# my_token_obtain_pair acts as the log in 
from django.urls import path
from .views.auth_views import register, my_token_obtain_pair, token_refresh
from .views.user_views import user_list, user_retrieve, user_update, user_delete
from .views.profile_views import (
    profile_list,
    profile_retrieve,
    profile_update,
    profile_partial_update,
    profile_delete,
    profile_create
)

urlpatterns = [
    # Auth URLs
    path('register/', register, name='register'),
    path('login/', my_token_obtain_pair, name='login'),
    path('token/refresh/', token_refresh, name='token_refresh'),

    # User URLs
    path('users/', user_list, name='user_list'),
    path('users/<int:pk>/', user_retrieve, name='user_retrieve'),
    path('users/<int:pk>/update/', user_update, name='user_update'),
    path('users/<int:pk>/delete/', user_delete, name='user_delete'),

    # Profile URLs
    path('profiles/', profile_list, name='profile_list'),
    path('profiles/<int:pk>/', profile_retrieve, name='profile_retrieve'),
    path('profiles/<int:pk>/update/', profile_update, name='profile_update'),
    path('profiles/<int:pk>/partial-update/', profile_partial_update, name='profile_partial_update'),
    path('profiles/<int:pk>/delete/', profile_delete, name='profile_delete'),
    path('profiles/create/', profile_create, name='profile_create'),
]
