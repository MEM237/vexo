// Initialize Firebase for the VEXO Chrome Extension
const firebaseConfig = {
  apiKey: "AIzaSyDOXTKJgLlNfq7Sn-f_CYEFDn92S74Cw9w",
  authDomain: "vexo-8df2d.firebaseapp.com",
  databaseURL: "https://vexo-8df2d-default-rtdb.firebaseio.com",
  projectId: "vexo-8df2d",
  storageBucket: "vexo-8df2d.firebasestorage.app",
  messagingSenderId: "54849424101",
  appId: "1:54849424101:web:604c71656e7ce3dbdd220c",
  measurementId: "G-T0FVZNZCB4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Messaging setup
const messaging = firebase.messaging();

// Add the public VAPID key (replace 'YOUR_VAPID_KEY_HERE' with your actual VAPID key from Firebase Console)
messaging.usePublicVapidKey(
  "BEXtIzbfJfLagXqhsC5_ygXKU_r8XpdnAkHz3cglJebabpsfFj5_ItItiUjGr7_L6G3rZ3i8OEdPozD-T963ikI"
);

// Request permission to send notifications
messaging
  .requestPermission()
  .then(() => {
    console.log("Notification permission granted.");
    return messaging.getToken();
  })
  .then((token) => {
    console.log("FCM Token:", token);
    // Store or use this token as needed for push notifications
  })
  .catch((error) => {
    console.error("Error getting notification permission:", error);
  });

// Firebase Realtime Database reference for presence tracking
const database = firebase.database();
const userStatusRef = database.ref("/status/" + "user-id"); // Replace 'user-id' with actual user ID or dynamic value

// Presence tracking logic
function setUserPresence(status) {
  userStatusRef.set({
    online: status,
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  });
}

// Handle presence updates
window.addEventListener("load", () => {
  setUserPresence(true); // User is online
});

window.addEventListener("beforeunload", () => {
  setUserPresence(false); // User is offline
});

// Handle push notification messages
messaging.onMessage((payload) => {
  console.log("Message received. ", payload);
  // Customize behavior based on payload, e.g., show a notification or update UI
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/placeholder0.jpg", // Replace with appropriate icon if needed
  };

  new Notification(payload.notification.title, notificationOptions);
});

// Video feed placeholder setup
const videoElement = document.getElementById("main-video");
const placeholderImage = "./images/placeholder0.jpg"; // Updated path to reflect correct location

function updateVideoFeed(isLive) {
  if (isLive) {
    // Replace this placeholder logic with actual live video feed setup
    console.log("Live feed activated.");
  } else {
    videoElement.src = placeholderImage;
    console.log("Showing placeholder image.");
  }
}

// Test button to simulate toggling live feed
document.getElementById("toggle-feed-btn").addEventListener("click", () => {
  const isLive = videoElement.src === placeholderImage;
  updateVideoFeed(isLive);
});

// Initial state for the video feed
updateVideoFeed(false);
