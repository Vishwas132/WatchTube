import checkTokenValidity from "./refreshToken.js";

async function fetchPdf() {
  const response = await fetch(
    `http://localhost:3000/user/profile/report/${localStorage.getItem(
      "userId"
    )}`,
    {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response;
}

async function generatePdf() {
  await checkTokenValidity();
  const response = await fetchPdf();
  if (response.status === 200) {
    const blob = await response.blob();
    const getFile = blob && window.URL.createObjectURL(blob);
    window.open(getFile, "_blank");
    // const link = document.createElement("a");
    // link.href = window.URL.createObjectURL(blob);
    // link.download = `your-file-name.pdf`;
    // link.click();
  } else {
    console.log("response.status", response.status);
  }
}

const pdfButton = document.querySelector("#pdf");

if (pdfButton) pdfButton.addEventListener("click", generatePdf);
