import os
from celery import Celery

#moduł os używany jest do powiązania zmiennej o nazwie DJANGO_SETTINGS_MODULE
#z modułem ustawień projektu Django, czyli po prostu z plikiem z ustawieniami
#naszego projektu
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'image_parroter.settings')

#utworzenie instancji klasy Celery, aby utworzyć zmienną instancji celery_app
celery_app = Celery('image_parroter')
#aktualizacja konfiguracji aplikacji Celery za pomocą ustawień (znajdujących
#się w pliku ustawień settings.py)
#CELERY oznacza, że wszystkie powiązane konfigurację powinny zaczynac się
#od CELERY_
celery_app.config_from_object('django.conf:settings', namespace='CELERY')
#instancja celery_app będzie automatycznie wykrywała zadania w projekcie
celery_app.autodiscover_tasks()