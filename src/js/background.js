// src/js/background.js

let vexoWindowId = null; // Track the VEXO window's ID

// Event listener for extension installation or update
chrome.runtime.onInstalled.addListener((details) => {
  console.log("VEXO Extension Installed or Updated");

  // Reset camera permissions state
  chrome.storage.local.set({ cameraActive: false }, () => {
    console.log(
      "Camera permissions reset to 'off' upon extension install/update."
    );
  });

  // Log details of the event
  if (details.reason === "update") {
    console.log("Extension updated from version:", details.previousVersion);
  } else if (details.reason === "install") {
    console.log("Extension installed.");
  }
});

// Listener for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background script:", message);

  // Handle specific message types
  if (message.type === "CHECK_CSS_LOADED") {
    console.log("Checking if CSS is loaded");
    sendResponse({ status: "CSS check processed by background.js" });
  } else if (message.type === "RESET_CAMERA") {
    // Logic to reset the camera state explicitly
    chrome.storage.local.set({ cameraActive: false }, () => {
      console.log("Camera state manually reset via message.");
      sendResponse({ status: "Camera state reset by background.js" });
    });
    return true; // Indicate asynchronous response
  } else {
    sendResponse({ status: "Unhandled message type in background.js" });
  }
});

// Listener for action icon (pin) clicks
chrome.action.onClicked.addListener(() => {
  // If the VEXO window is already open, close it
  if (vexoWindowId !== null) {
    chrome.windows.remove(vexoWindowId, () => {
      console.log("VEXO window closed.");
      vexoWindowId = null; // Reset the window ID
    });
  } else {
    // Otherwise, create a new VEXO window
    chrome.windows.create(
      {
        url: "src/html/popup.html", // Path to your popup HTML file
        type: "popup", // Opens as a popup window
        width: 400, // Set the desired width
        height: 250, // Set the desired height
        top: 50, // Position from the top
        left: 50, // Position from the left
      },
      (window) => {
        vexoWindowId = window.id; // Store the window ID
        console.log("VEXO window opened with ID:", vexoWindowId);
      }
    );
  }
});
