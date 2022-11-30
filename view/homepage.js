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
  const response = await fetchVideos();
  if (response.status === 200) {
    addNavButtons();
    const div = document.querySelector("div");

    const videos = await response.json();
    videos.forEach((video) => {
      const url = document.createElement("a");
      url.href = "#";
      url.textContent = video.videoTitle;
      url.id = video.id;
      div.append(url);
    });
    const urls = document.querySelectorAll("a");
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
  location.assign("/view/video.html");
}

window.addEventListener("DOMContentLoaded", fillValues);
