from django.urls import path

from chatgora.views import get_token, index, room

urlpatterns = [
    path("", index, name="index"),
    path("room/", room, name="room"),
    path("get-token/", get_token, name="get-token"),
]
