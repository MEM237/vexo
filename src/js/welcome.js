// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";

// Firebase configuration
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log("Firebase initialized:", app);

// Shepherd.js Tour
const tour = new Shepherd.Tour({
  defaultStepOptions: {
    cancelIcon: { enabled: true },
    classes: "shepherd-theme-arrows",
    scrollTo: true,
  },
});

// Add steps to the tour
tour.addStep({
  title: "Welcome to VEXO",
  text: "This is the starting point for your journey.",
  attachTo: { element: "#welcome-container", on: "bottom" },
  buttons: [
    {
      text: "Next",
      action: tour.next,
    },
  ],
});

tour.addStep({
  title: "Explore Features",
  text: "Learn about video chat, peer-to-peer texting, and more.",
  buttons: [
    {
      text: "Finish",
      action: tour.complete,
    },
  ],
});

// Attach event listener to the Start Tour button
document.getElementById("start-tour").addEventListener("click", () => {
  console.log("Start Tour button clicked");
  tour.start();
});
