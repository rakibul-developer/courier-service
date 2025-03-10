from django.contrib import admin
from ..models.user import User
from .user_admin import UserModelAdmin

admin.site.register(User, UserModelAdmin)