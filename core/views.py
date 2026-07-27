from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import check_password
from django.db.models import Q
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import os

# ---------------- HOME ----------------
def home(request):
    if request.user.is_authenticated:
        return redirect("dashboard")  # Redirect to the URL NAME, not the file
    return render(request, "talk_home.html")

def talk_home2(request):
    return render(request, "talk_home2.html")

# ---------------- REGISTER ----------------
def register(request):
    if request.method == "POST":
        username = request.POST.get("reg_username", "").strip()
        email = request.POST.get("reg_email", "").strip()
        password = request.POST.get("password", "")
        confirm = request.POST.get("confirm_password", "")

        if password != confirm:
            messages.error(request, "Passwords do not match.")
            return redirect("home")

        if User.objects.filter(Q(username__iexact=username) | Q(email__iexact=email)).exists():
            messages.error(request, "Username or Email already exists.")
            return redirect("home")

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        login(request, user)
        messages.success(request, "Account created successfully!")
        return redirect("talk_home2")

    return redirect("home")


# ---------------- LOGIN ----------------
def login_view(request):
    if request.method == "POST":
        username_or_email = request.POST.get("username", "").strip()
        password = request.POST.get("password", "")

        user_obj = User.objects.filter(
            Q(username__iexact=username_or_email) |
            Q(email__iexact=username_or_email)
        ).first()

        user = None
        if user_obj:
            user = authenticate(request, username=user_obj.username, password=password)


        if user is not None:
            login(request, user)
            return redirect("dashboard")

        messages.error(request, "Invalid username or password.")

    return redirect("home")


# ---------------- LOGOUT ----------------
def logout_view(request):
    logout(request)
    messages.error(request, "Logged out Successfully.")
    return redirect("home")

@login_required(login_url="home")
def delete_account(request):
    if request.method == "POST":
        user = request.user
        password = request.POST.get("confirm_password")

        storage = messages.get_messages(request)
        for _ in storage:
            pass

        if not check_password(password, user.password):
            messages.error(request, "Incorrect password")
            return redirect("dashboard")

        logout(request)
        user.delete()
        messages.success(request, "Account removed successfully")
        return redirect('home')
    return redirect('dashboard')


# ---------------- DASHBOARD ----------------
@login_required(login_url="home")
def dashboard(request):
    messages.success(request, "Login Successful")
    return render(request, "talk_home3.html", {
        "username": request.user.username
    })

# ---------------- TALK ----------------
def talk_page(request):
    return render(request, "talk.html")

@csrf_exempt
def talk(request):
    if request.method == "POST":
        audio_file = request.FILES.get("audio")

        if not audio_file:
            return JsonResponse({"error": "No audio received"}, status=400)

        result = process_audio(audio_file)
        return JsonResponse(result)

    return JsonResponse({"error": "POST only"}, status=405)
