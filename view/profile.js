import checkTokenValidity from "./refreshToken.js";

async function fetchProfile() {
  const response = await fetch("http://localhost:3000/user/profile", {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response;
}

async function fillValues() {
  await checkTokenValidity();
  const response = await fetchProfile();
  if (response.status === 200) {
    const userProfile = await response.json();
    const divs = document.querySelectorAll("div");
    divs.forEach((div) => {
      div.append(userProfile[div.id]);
    });
  } else {
    console.log("response.status", response.status);
  }
}

window.addEventListener("DOMContentLoaded", fillValues);
