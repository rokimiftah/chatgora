import json
import os
import random
import time

from agora_token_builder import RtcTokenBuilder
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv

from chatgora.models import RoomMember

load_dotenv()


# Create your views here.
def get_token(request):
    APP_ID = os.getenv("APP_ID")
    APP_CERTIFICATE = os.getenv("APP_CERTIFICATE")
    CHANNEL_NAME = request.GET.get("channel")
    UID = random.randint(1, 250)
    EXPIRATION_TIME_IN_SECONDS = 3600 * 24
    CURRENT_TIMESTAMP = time.time()
    ROLE = 1
    PRIVILEGE_EXPIRED_TS = CURRENT_TIMESTAMP + EXPIRATION_TIME_IN_SECONDS

    token = RtcTokenBuilder.buildTokenWithUid(
        appId=APP_ID,
        appCertificate=APP_CERTIFICATE,
        channelName=CHANNEL_NAME,
        uid=UID,
        role=ROLE,
        privilegeExpiredTs=PRIVILEGE_EXPIRED_TS,
    )
    return JsonResponse({"token": token, "uid": UID}, safe=False)


def index(request):
    return render(request, "chatgora/index.html")


def room(request):
    return render(request, "chatgora/room.html")


@csrf_exempt
def create_member(request):
    data = json.loads(request.body)

    member, created = RoomMember.objects.get_or_create(
        name=data["name"], uid=data["UID"], room_name=data["room_name"]
    )

    return JsonResponse({"name": data["name"]}, safe=False)


def get_member(request):
    uid = request.GET.get("UID")
    room_name = request.GET.get("room_name")

    member = RoomMember.objects.get(
        uid=uid,
        room_name=room_name,
    )

    name = member.name

    return JsonResponse({"name": name}, safe=False)
