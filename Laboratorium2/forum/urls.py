from django.urls import path
from .views import HomePageView, SignUpView
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('password_change/', auth_views.PasswordChangeView.as_view(template_name='registration/password_change.html', success_url='done/'), name='password_change'),
    path('password_change/done/', auth_views.PasswordChangeDoneView.as_view(template_name='registration/password_changed.html'), name='password_changed'),
    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='registration/password_reset.html', success_url='done/', email_template_name='registration/password_resetemail.html'), name='passwordreset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='registration/password_resetdone.html'), name='passwordresetdone'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='registration/password_resetconfirm.html'), name='password_reset_confirm'),
    path('signup/', SignUpView.as_view(), name='signup'),
]