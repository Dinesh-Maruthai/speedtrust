import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

username = os.environ["DJANGO_SUPERUSER_USERNAME"]
email = os.environ["DJANGO_SUPERUSER_EMAIL"]
password = os.environ["DJANGO_SUPERUSER_PASSWORD"]

username_field = User.USERNAME_FIELD

if not User.objects.filter(**{username_field: username}).exists():
    fields = {username_field: username}

    if username_field != "email":
        fields["email"] = email

    user = User.objects.create_superuser(
        **fields,
        password=password,
    )
    print("Django superuser created successfully")
else:
    print("Django superuser already exists")