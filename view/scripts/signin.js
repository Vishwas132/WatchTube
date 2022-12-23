import sendData from "./sendFormdata.js";

async function signinUser(evt) {
  evt.preventDefault();
  const route = "/session/signin";

  const formData = new FormData(signinForm);

  const response = await sendData(Object.fromEntries(formData), route);

  if (response.status === 200) {
    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("accessTokenExpiry", data.accessTokenExpiry);
    localStorage.setItem("email", formData.get("email"));
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("channelId", data.channelId);
    window.location.assign("/");
  } else {
    console.log("response.status", response.status);
  }
}

const signinForm = document.querySelector("#signin");

if (signinForm) signinForm.addEventListener("submit", signinUser);
