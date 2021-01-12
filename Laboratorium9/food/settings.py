"""
Django settings for food project.

Generated by 'django-admin startproject' using Django 3.1.4.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '=2ieq#v@ji9!=wj=1d1ffmn01cl0x589#(kvk!=%+%b83d-u2s'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    #Django Rest Framework
    #używany już wcześniej na zajęciach
    'rest_framework',
    #moja utworzona aplikacja reviews
    'reviews.apps.ReviewsConfig',
    #CORS (pip install django-cors-headers)
    #skonfigurujemy go do akceptowania żądań z localhost:8081
    #CORS - Cross Origin Resource Sharing
    #przydatny gdy tworzymy aplikację za pomocą Django, a frontend
    #z pomocą nowoczesnych technologi takich jak React
    #w takim przypadku istnieje prawdopodobienstwo, ze bedziemy uzywac
    #dwoch serwerow programistycznych: jednego dla serwera backend'u oraz innego
    #dla frontend'u
    #podczas wysyłania żądań HTTP z aplikacji frontendowej przy uzyciu
    #interfejsu API przeglądatki, klienta Axios lub jQuery $.ajax(),
    #do backendu zbudowanego w ramach Django REST framework przeglądarka
    #internetowe wyswietli blad zwiazany z Same Origin Policy
    #CORS umożliwia aplikacjom klienckim łączenie się z interfejsami API hostowanymi 
    #w różnych domenach, umożliwiając nowoczesnym przeglądarkom internetowym ominięcie 
    #Same Origin Policy, która jest wymuszana domyślnie
    #!!!!!!!!!!!!!!!!!
    #CORS umożliwia dodanie zestawu nagłówków, które informują przeglądarkę internetową, 
    #czy może wysyłać/odbierać żądania z domen innych niż ta obsługująca stronę
    'corsheaders',
]

MIDDLEWARE = [
    #po zainstalowaniu django-cors-headers trzeba dodać tutaj 
    #oprogramowanie pośredniczące, by móc nasłuchiwać odpowiedzi
    #znajduje się na samej górze
    #bo takie są zalecenia
    #powinno znajdować się jak najwyżej
    #!!! A ZWŁASZCZA POWINNO ZNAJDOWAC SIE PRZED
    #!!! COMMONMIDDLEWARE KTÓRE ZNAJDUJE SIĘ TROSZKĘ NIŻEJ
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    #!!!!! tu
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'food.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

WSGI_APPLICATION = 'food.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'

#Zdefiniowanie ustawien CORS
#jeśli wstawimy tutaj True to CORS zostanie 
#włączony dla wszyskich domen i wtedy nie
#ma sensu stosowania poniższego ustawienia Whitelist
#domyślną wartością jest False
#My chcemy CORS tylko dla jednej konretnej domeny
#dlatego ustawiamy False
CORS_ORIGIN_ALLOW_ALL = False
#CORS_ALLOW_ALL_ORIGINS = False
#A tutaj definiujemy adres url tej domeny, dla której chcemy
#włączyć CORS
#Jest to lista źródeł, które są upoważnione do wysyłania
#żądań HTTP między wirtynami
#Domyślnie []
CORS_ORIGIN_WHITELIST = (
    'http://localhost:8001',
)
#COST_ALLOWED_ORIGINS = [
    #'http://localhost:8081',
#]
