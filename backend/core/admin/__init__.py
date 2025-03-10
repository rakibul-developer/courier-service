from ..models.base_model import TimeStampedModel
from .mixins import TimestampMixin
from django.contrib import admin

admin.site.register(TimeStampedModel, TimestampMixin)