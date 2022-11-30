import addNavButtons from "./navButtons.js";

async function fetchVideo() {
  const response = await fetch(
    `http://localhost:3000/video/${localStorage.getItem("videoId")}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Range": "bytes=0-",
      },
    }
  );
  return response;
}

async function fillValues() {
  const response = await fetchVideo();
  if (response.status === 206) {
    addNavButtons();
    const video = document.querySelector("video");
    video.src = `http://localhost:3000/video/${localStorage.getItem(
      "videoId"
    )}`;
  } else {
    console.log("response.status", response.status);
  }
}

window.addEventListener("DOMContentLoaded", fillValues);
