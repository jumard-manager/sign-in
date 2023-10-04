from django.db import models
from django.utils import timezone

# Create your models here.

class MyModel(models.Model):
    id         = models.UUIDField(primary_key=True)
    name       = models.CharField(max_length = 100)
    param1     = models.CharField(max_length = 200)
    param2     = models.CharField(max_length = 200)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        #managed = False
        db_table = 'm_users'