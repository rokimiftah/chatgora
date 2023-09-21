from django.urls import path

from chatgora.views import (
    create_member,
    delete_member,
    get_member,
    get_token,
    index,
    room,
)

urlpatterns = [
    path("", index, name="index"),
    path("room/", room, name="room"),
    path("get-token/", get_token, name="get-token"),
    path("create-member/", create_member, name="create-member"),
    path("get-member/", get_member, name="get-member"),
    path("delete-member/", delete_member, name="delete-member"),
]
