from django.db import models


# Create your models here.
class RoomMember(models.Model):
    name = models.CharField(max_length=250)
    uid = models.CharField(max_length=250)
    room_name = models.CharField(max_length=250)

    def __str__(self) -> str:
        return self.name
