export default function addNavButtons() {
  if (localStorage?.accessToken) {
    if (!document.URL.includes("upload")) {
      const uploadButton = document.createElement("button");
      uploadButton.textContent = "Upload Video";
      uploadButton.id = "uploadButton";
      uploadButton.addEventListener("click", () => {
        location.assign("/upload");
      });
      document.querySelector("nav").append(uploadButton);
    }

    const signoutButton = document.createElement("button");
    signoutButton.textContent = "Sign Out";
    signoutButton.id = "logout";
    document.querySelector("nav").append(signoutButton);

    const logOutScript = document.createElement("script");
    logOutScript.setAttribute("type", "module");
    logOutScript.setAttribute("src", "scripts/signout.js");
    logOutScript.defer = true;

    document.head.append(logOutScript);

    const profileButton = document.createElement("button");
    profileButton.textContent = "User Profile";
    profileButton.id = "profileButton";
    document.querySelector("nav").append(profileButton);
    profileButton.addEventListener("click", () => {
      location.assign("/profile");
    });
  } else {
    const signinButton = document.createElement("button");
    signinButton.textContent = "Sign In";
    signinButton.id = "signin";
    document.querySelector("nav").append(signinButton);
    signinButton.addEventListener("click", () => {
      location.assign("/signin");
    });
  }
}
