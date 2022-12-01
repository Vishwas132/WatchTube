import checkTokenValidity from "./refreshToken.js";

async function logOut() {
  const response = await fetch("http://localhost:3000/session/signout", {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response;
}

async function logOutUser(evt) {
  evt.preventDefault();
  await checkTokenValidity();
  const response = await logOut();
  if (response.status === 200) {
    localStorage.clear();
    location.assign("http://127.0.0.1:5500/view/pages/homepage.html");
  } else {
    console.trace("response", response);
  }
}

const logOutButton = document.querySelector("#logout");

if (logOutButton) logOutButton.addEventListener("click", logOutUser);
