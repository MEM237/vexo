import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onDisconnect } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const auth = getAuth(app);
const database = getDatabase(app);

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.uid);
    handleUserPresence(user.uid);
  } else {
    signInAnonymously(auth)
      .then(() => {
        console.log("Signed in anonymously");
      })
      .catch((error) => {
        console.error("Authentication error:", error);
      });
  }
});

// Function to handle user presence
function handleUserPresence(userId) {
  // Reference to the user's presence in the database
  const userStatusRef = ref(database, "/status/" + userId);

  // Set user status to "online" when connected
  set(userStatusRef, {
    state: "online",
    last_changed: Date.now(),
  });

  // Set user status to "offline" when disconnected
  onDisconnect(userStatusRef).set({
    state: "offline",
    last_changed: Date.now(),
  });
}
