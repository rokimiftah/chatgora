const APP_ID = "66267224dc0e484b89fd3be7e3626f09";
const CHANNEL = "main";
const TOKEN =
  "007eJxTYFjHNet9lqRWgkTWFROhgORlT2r1Xj/TbX60okViRkC7xzYFBjMzIzNzIyOTlGSDVBMLkyQLy7QU46RU81RjoESageXsOdypDYGMDOaSggyMUAjiszDkJmbmMTAAAM/ZHPI=";
let UID;

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

let localTracks = [];
let remoteUsers = {};

let joinAndDisplayLocalStream = async () => {
  client.on("user-published", handleUserJoined);
  client.on("user-left", handleUserLeft);

  UID = await client.join(APP_ID, CHANNEL, TOKEN, null);

  localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

  let player = `
            <div id="user-container-${UID}" class="video-container">
              <div class="username-wrapper">
                <span class="user-name">My Name</span>
              </div>
              <div id="user-${UID}" class="video-player"></div>
            </div>
  `;

  document
    .getElementById("video-streams")
    .insertAdjacentHTML("beforeend", player);

  localTracks[1].play(`user-${UID}`);

  await client.publish([localTracks[0], localTracks[1]]);
};

let handleUserJoined = async (user, mediaType) => {
  remoteUsers[user.uid] = user;
  await client.subscribe(user, mediaType);

  if (mediaType === "video") {
    let player = document.getElementById(`user-container-${user.uid}`);

    if (player != null) {
      player.remove();
    }

    player = `
          <div id="user-container-${user.uid}" class="video-container">
            <div class="username-wrapper">
              <span class="user-name">My Name</span>
            </div>
            <div id="user-${user.uid}" class="video-player"></div>
          </div>
    `;

    document
      .getElementById("video-streams")
      .insertAdjacentHTML("beforeend", player);
    user.videoTrack.play(`user-${user.uid}`);
  }

  if (mediaType === "audio") {
    user.audioTrack.play();
  }
};

let handleUserLeft = async (user) => {
  delete remoteUsers[user.uid];
  document.getElementById(`user-container-${user.uid}`).remove();
};

joinAndDisplayLocalStream();
