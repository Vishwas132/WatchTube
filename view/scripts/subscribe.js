// import config from "config";

async function registerServiceWorker() {
  const vapidPublicKey =
    "BIV9_UVaT-keQGZeBLFfSC3qT4UqtnYjV-hFpI7V9St5NAMn_pFtHTVixbe2wc6D_nMqNryRIt3YUx9fIKw4gm8";
  const register = await navigator.serviceWorker.register(
    "../pages/worker.js",
    {
      scope: "/view/pages/",
    }
  );
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: vapidPublicKey,
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
      if (!subscription) return;
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
      if (obj) button.textContent = "Unsubscribe";
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
    if (!unsubscribed) return;
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
    if (obj) button.textContent = "Subscribe";
  }
};

async function addButtonText() {
  try {
    if ("serviceWorker" in navigator) {
      const register = await navigator.serviceWorker.register(
        "../pages/worker.js",
        {
          scope: "/view/pages/",
        }
      );
      console.log("register", register);
      const subscription = await register.pushManager.getSubscription();
      if (!subscription) button.textContent = "Subscribe";
      else button.textContent = "Unsubscribe";
      console.log("button.textContent", button.textContent);
    }
  } catch (error) {
    console.log("error", error);
  }
}

const button = document.querySelector("button");
window.addEventListener("DOMContentLoaded", addButtonText);

button.addEventListener("click", () => {
  if (button.textContent === "Subscribe") subscribeToNotifications();
  if (button.textContent === "Unsubscribe") unsubscribeToNotifications();
});
