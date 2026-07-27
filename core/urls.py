from django.urls import path
from . import views

urlpatterns = [
    # The Landing Page (Login/Register)
    path("", views.home, name="home"),

    # Authentication Actions
    path("register/", views.register, name="register"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),

    # The Dashboard (User Home)
    path("dashboard/", views.dashboard, name="dashboard"),

    # Interactive Features
    path("api/talk/", views.talk, name="talker"),
    path("talk/", views.talk_page, name="talk"),

    path("talk_home2/", views.talk_home2, name="talk_home2"),

    path("delete-account/", views.delete_account, name="delete_account"),
]