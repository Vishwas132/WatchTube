export default function addNavButtons() {
  const button = document.createElement("button");

  if (localStorage?.accessToken) {
    const profileButton = document.createElement("button");
    profileButton.textContent = "User Profile";

    button.textContent = "Sign Out";
    button.id = "logout";

    const logOutScript = document.createElement("script");
    logOutScript.setAttribute("type", "module");
    logOutScript.setAttribute("src", "logout.js");
    logOutScript.defer = true;

    document.head.append(logOutScript);
    document.querySelector("nav").append(profileButton);
    profileButton.addEventListener("click", () => {
      location.assign("http://127.0.0.1:5500/view/profile.html");
    });
  } else {
    button.textContent = "Sign In";
    button.addEventListener("click", () => {
      location.assign("http://127.0.0.1:5500/view/signin.html");
    });
  }

  document.querySelector("nav").append(button);
}
