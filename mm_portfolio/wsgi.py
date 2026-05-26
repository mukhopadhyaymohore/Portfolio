import os
from django.core.handlers.wsgi import WSGIHandler

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mm_portfolio.settings')

application = WSGIHandler()