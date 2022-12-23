import addNavButtons from "./navButtons.js";

async function fetchVideos(url) {
  const response = await fetch(url, {
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
  const searchField = document.querySelector("#video-search");
  const textAt = document.URL.search("=");
  searchField.value = document.URL.slice(textAt + 1);

  const at = document.URL.search("search");
  const url = `http://localhost:3000/video?${document.URL.slice(at)}`;

  const response = await fetchVideos(url);
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
  location.assign(`id/${evt.srcElement.id}`);
}

window.addEventListener("DOMContentLoaded", fillValues);
