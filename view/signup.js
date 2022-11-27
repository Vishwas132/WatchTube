async function sendData(formData, route) {
  const response = await fetch(`http://localhost:3000${route}`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return response;
}

async function signupUser(evt) {
  evt.preventDefault();
  const route =
    evt.target.id === "signin" ? "/session/signin" : "/session/signup";

  const formData =
    evt.target.id === "signin"
      ? new FormData(signinForm)
      : new FormData(signupForm);

  const response = await sendData(Object.fromEntries(formData), route);

  if (response.status === 200) {
    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("accessTokenExpiry", data.accessTokenExpiry);
    localStorage.setItem("email", formData.get("email"));
    window.location.assign("/view/profile.html");
  } else {
    console.log("response.status", response.status);
  }
}

const signupForm = document.querySelector("#signup");
const signinForm = document.querySelector("#signin");

if (signupForm) signupForm.addEventListener("submit", signupUser);
if (signinForm) signinForm.addEventListener("submit", signupUser);
