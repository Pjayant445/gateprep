// ✅ Step 3: Notification Service

// 📄 services/notificationService.js
export function scheduleNotification(title, body, timeInMs) {
  if (Notification.permission === "granted") {
    setTimeout(() => {
      new Notification(title, { body });
    }, timeInMs);
  }
}
