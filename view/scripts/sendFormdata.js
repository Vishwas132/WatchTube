export default async function sendData(formData, route) {
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
