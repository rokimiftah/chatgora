from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, "chatgora/index.html")


def room(request):
    return render(request, "chatgora/room.html")
