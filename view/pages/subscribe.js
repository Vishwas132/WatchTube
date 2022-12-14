import config from "../../config/default.json" assert { type: "json" };

async function registerServiceWorker() {
  const register = await navigator.serviceWorker.register("worker.js", {
    scope: "/view/pages/",
  });
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: config.vapidKey.publicKey,
  });
  return subscription;
}

const subscribeToNotifications = async () => {
  let subscription;

  if ("serviceWorker" in navigator) {
    const permission = await Notification.requestPermission();
    console.log("permission", permission);
    if (permission === "granted") {
      subscription = await registerServiceWorker().catch(console.log);
      const obj = await fetch(
        "http://localhost:3000/subscription/notifications/subscribe",
        {
          method: "POST",
          body: JSON.stringify({
            subscription: subscription,
            userId: 38,
            channelId: 6,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }
};

const unsubscribeToNotifications = async () => {
  if ("serviceWorker" in navigator) {
    const register = await navigator.serviceWorker.register("worker.js", {
      scope: "/view/pages/",
    });
    const subscription = await register.pushManager.getSubscription();
    if (!subscription) return;
    const unsubscribed = await subscription.unsubscribe();
    console.log("unsubscribed", unsubscribed);
    const obj = await fetch(
      "http://localhost:3000/subscription/notifications/unsubscribe",
      {
        method: "POST",
        body: JSON.stringify({
          subscription: subscription,
          userId: 38,
          channelId: 6,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

const subscribeButton = document.querySelector("#subscribe");
subscribeButton.addEventListener("click", subscribeToNotifications);

const unsubscribeButton = document.querySelector("#unsubscribe");
unsubscribeButton.addEventListener("click", unsubscribeToNotifications);
