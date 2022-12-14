import addNavButtons from "./navButtons.js";

async function fetchVideos() {
  const response = await fetch(`http://localhost:3000/video/all`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

async function fillValues() {
  addNavButtons();
  const response = await fetchVideos();
  if (response.status === 200) {
    const div = document.querySelector("div");

    const videos = await response.json();
    videos.forEach((video) => {
      const url = document.createElement("div");
      // url.href = "#";
      url.textContent = video.videoTitle;
      url.id = video.videoId;
      url.className = "videoUrl";
      div.append(url);
    });
    const urls = document.querySelectorAll(".videoUrl");
    if (urls) {
      urls.forEach((url) => {
        url.addEventListener("click", redirectPage);
      });
    }
  } else {
    console.log("response.status", response.status);
  }
}

async function redirectPage(evt) {
  localStorage.setItem("videoId", evt.srcElement.id);
  location.assign("/view/pages/video.html");
}

window.addEventListener("DOMContentLoaded", fillValues);
