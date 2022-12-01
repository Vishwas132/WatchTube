export default function addNavButtons() {
  const button = document.createElement("button");

  if (localStorage?.accessToken) {
    if (!document.URL.includes("videoUploadPage.html")) {
      const uploadButton = document.createElement("button");
      uploadButton.textContent = "Upload Video";
      uploadButton.id = "uploadButton";
      uploadButton.addEventListener("click", () => {
        location.assign(
          "http://127.0.0.1:5500/view/pages/videoUploadPage.html"
        );
      });
      document.querySelector("nav").append(uploadButton);
    }

    const profileButton = document.createElement("button");
    profileButton.textContent = "User Profile";
    profileButton.id = "profileButton";

    button.textContent = "Sign Out";
    button.id = "logout";

    const logOutScript = document.createElement("script");
    logOutScript.setAttribute("type", "module");
    logOutScript.setAttribute("src", "../scripts/signout.js");
    logOutScript.defer = true;

    document.head.append(logOutScript);
    document.querySelector("nav").append(profileButton);
    profileButton.addEventListener("click", () => {
      location.assign("http://127.0.0.1:5500/view/pages/profile.html");
    });
  } else {
    button.textContent = "Sign In";
    button.id = "signin";
    button.addEventListener("click", () => {
      location.assign("http://127.0.0.1:5500/view/pages/signin.html");
    });
  }

  document.querySelector("nav").append(button);
}
