from django.urls import path

from chatgora.views import index

urlpatterns = [
    path("", index, name="index"),
]
