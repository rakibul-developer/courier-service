from django.db import models
from core.models.base_model import TimeStampedModel

class Package(TimeStampedModel):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('IN_TRANSIT', 'In Transit'),
        ('DELIVERED', 'Delivered'),
        ('CANCELLED', 'Cancelled'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    sender = models.EmailField(max_length=255,)
    receiver = models.EmailField(max_length=255,)

    def __str__(self):
        return self.name