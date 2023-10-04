from django.urls import path
from . import views

urlpatterns = [
    path('a/', views.AdminPage.as_view(), name="admin_page"),
    path('', views.UsersPage.as_view(), name="Users_page"),
]