self.addEventListener("push", function (e) {
  const data = e.data.json();
  self.registration.showNotification(data.videoTitle, {
    body: data.videoUrl,
  });
});

self.addEventListener("notificationclick", function (event) {
  let url = "http://localhost:3000/view/video.html";
  event.notification.close(); // Android needs explicit close.
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (const i = 0; i < windowClients.length; i++) {
        let client = windowClients[i];
        // If so, just focus it.
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
