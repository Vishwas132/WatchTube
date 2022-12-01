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
    window.location.assign("/view/pages/homepage.html");
  } else {
    console.log("response.status", response.status);
  }
}

const signinForm = document.querySelector("#signin");

if (signinForm) signinForm.addEventListener("submit", signinUser);
