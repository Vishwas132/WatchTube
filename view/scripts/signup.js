import sendData from "./sendFormdata.js";

async function signupUser(evt) {
  evt.preventDefault();
  const route = "/session/signup";

  const formData = new FormData(signupForm);

  const response = await sendData(Object.fromEntries(formData), route);

  if (response.status === 200) {
    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("accessTokenExpiry", data.accessTokenExpiry);
    localStorage.setItem("email", formData.get("email"));
    localStorage.setItem("userId", data.id);
    window.location.assign("/view/pages/homepage.html");
  } else {
    console.log("response.status", response.status);
  }
}

const signupForm = document.querySelector("#signup");

if (signupForm) signupForm.addEventListener("submit", signupUser);
