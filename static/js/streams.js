const APP_ID = "66267224dc0e484b89fd3be7e3626f09";
const CHANNEL = "main";
const TOKEN =
  "007eJxTYPj5mO/HN8HkB590TMV+lZg5BxjKn5cwLP/6Q3W1xOwf+2cpMJiZGZmZGxmZpCQbpJpYmCRZWKalGCelmqcaAyXSDCxnXOZMbQhkZFDc+4eJkQECQXwWhtzEzDwGBgCFSyAl";
let UID;

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

let localTracks = [];
let remoteUsers = {};

(joinAndDisplayLocalStream = async () => {
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
})();
