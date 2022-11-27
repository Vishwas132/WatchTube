async function refreshAccessToken() {
  const response = await fetch("http://localhost:3000/session/token", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: localStorage.getItem("email") }),
  });
  return response;
}

export async function checkTokenValidity() {
  if (Date.now() > localStorage.getItem("accessTokenExpiry") * 1000) {
    console.log("accessToken expired");
    const response = await refreshAccessToken();
    if (response.status === 200) {
      console.log("accessToken refreshed successfully");
      const { accessToken, accessTokenExpiry } = await response.json();
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("accessTokenExpiry", accessTokenExpiry);
    } else {
      console.log("response.status", response.status);
    }
  }
}
