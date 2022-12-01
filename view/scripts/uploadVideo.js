import checkTokenValidity from "./refreshToken.js";
import addNavButtons from "./navButtons.js";

async function sendData(formData) {
  const response = await fetch(`http://localhost:3000/video/upload`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: formData,
  });
  return response;
}

async function uploadVideo(evt) {
  evt.preventDefault();
  const formData = new FormData(videoUploadForm);
  formData.set("userId", localStorage.getItem("userId"));
  checkTokenValidity();

  const response = await sendData(formData);

  if (response.status === 200) {
    const data = await response.json();
    console.log("data", data);
  } else {
    console.log("response.status", response.status);
  }
}

const videoUploadForm = document.querySelector("#video-upload");

if (videoUploadForm) videoUploadForm.addEventListener("submit", uploadVideo);

window.addEventListener("load", addNavButtons);
