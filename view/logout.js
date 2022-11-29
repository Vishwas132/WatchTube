import { checkTokenValidity } from "./refreshToken.js";

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

export async function logOutUser(evt) {
  evt.preventDefault();
  await checkTokenValidity();
  const response = await logOut();
  if (response.status === 200) {
    localStorage.clear();
    window.location.replace("/view/signin.html");
  } else {
    console.trace("response", response);
    // window.location.replace("/view/signin.html");
  }
}

const logOutButton = document.querySelector("#logout");

if (logOutButton) logOutButton.addEventListener("click", logOutUser);
