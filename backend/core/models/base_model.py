from django.db import models
from django.utils import timezone

class TimeStampedModel(models.Model):
    """
    An abstract base model that provides self-updating
    `created_at` and `updated_at` fields.
    """
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")
    is_deleted = models.BooleanField(default=False, verbose_name="Is Deleted")  # Soft delete field

    class Meta:
        abstract = True

    def delete(self, *args, **kwargs):
        """Soft delete the object instead of actually deleting it."""
        self.is_deleted = True
        self.save()

    def restore(self):
        """Restore a soft-deleted object."""
        self.is_deleted = False
        self.save()