"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView

#Django udostępnia kilka widoków, których można użyć do obsługi logowania, wylogowania i zarządzania hasłami. 
#Wykorzystują one standardowe formularze autoryzacji, ale można też przekazywać własne formularze
#Wpisanie drugiej linijki w urlpatterns zawiera w sobie poniższe wzorce adresów URL:
# accounts/login/ [name='login']
# accounts/logout/ [name='logout']
# accounts/password_change/ [name='password_change']
# accounts/password_change/done/ [name='password_change_done']
# accounts/password_reset/ [name='password_reset']
# accounts/password_reset/done/ [name='password_reset_done']
# accounts/reset/<uidb64>/<token>/ [name='password_reset_confirm']
# accounts/reset/done/ [name='password_reset_complete']

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),    
    path('accounts/', include('django.contrib.auth.urls')),
    # umożliwia korzystanie z uwierzytelniania przez sociale
    path('social-auth/', include('social_django.urls', namespace="social")),
    # wyświetlanie strony głównej
    #TemplateView klasa Django służy do wyświetlania statycznych widoków html
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
]
