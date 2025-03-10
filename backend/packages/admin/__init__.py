from django.contrib import admin
from ..models import *
from .package_admin import PackageAdmin

admin.site.register(Package, PackageAdmin)