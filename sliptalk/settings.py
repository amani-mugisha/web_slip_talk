from pathlib import Path
import os


# ---------------- BASE DIR ----------------
BASE_DIR = Path(__file__).resolve().parent.parent

# ---------------- SECURpyITY ----------------
SECRET_KEY = 'your-secret-key-here'

DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

# ---------------- APPLICATIONS ----------------
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'core',  # your app
]

# ---------------- MIDDLEWARE ----------------
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# ---------------- ROOT URL ----------------
ROOT_URLCONF = 'sliptalk.urls'

# ---------------- TEMPLATES ----------------
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # global templates folder
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# ---------------- WSGI ----------------
WSGI_APPLICATION = 'sliptalk.wsgi.application'

# ---------------- DATABASE (POSTGRESQL) ----------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'sliptalk_db',
        'USER': 'sliptalk_user',
        'PASSWORD': 'Umupira@1234',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# ---------------- PASSWORD VALIDATION ----------------
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
]

# ---------------- LANGUAGE & TIME ----------------
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Africa/Kigali'

USE_I18N = True
USE_TZ = True

# ---------------- STATIC FILES ----------------
STATIC_URL = 'static/'

STATICFILES_DIRS = [
    BASE_DIR / "static"
]

# ---------------- DEFAULT PRIMARY KEY ----------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# ---------------- MESSAGES ----------------
from django.contrib.messages import constants as messages

MESSAGE_TAGS = {
    messages.ERROR: 'error',
    messages.SUCCESS: 'success',
    messages.INFO: 'info',
    messages.WARNING: 'warning',
}