import { checkTokenValidity } from "./refreshToken.js";

const divs = document.querySelectorAll("div");

async function fetchProfile() {
  const response = await fetch("http://localhost:3000/user/profile", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({ email: localStorage.getItem("email") }),
  });
  return response;
}

async function fillValues() {
  await checkTokenValidity();
  const response = await fetchProfile();
  if (response.status === 200) {
    const userProfile = await response.json();
    divs.forEach((div) => {
      div.append(userProfile[div.id]);
    });
  } else {
    console.log("response.status", response.status);
  }
}

window.addEventListener("DOMContentLoaded", fillValues);
