// Log a message when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  console.log("VEXO Escalator installed.");
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "enableCamera") {
    sendResponse({
      success: false,
      error: "Camera access should be handled in popup.js.",
    });
  }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "someAction") {
    // Example: handle action
    sendResponse({ success: true });
    return true; // Indicate asynchronous response
  }
});

// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "enableCamera") {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        // Camera access granted; handle the stream if needed
        sendResponse({ success: true });
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // Keep the messaging channel open for asynchronous response
  }
});

// Handle action icon clicks
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      files: ["src/js/injectVEXO.js"],
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error(
          "Script injection failed:",
          chrome.runtime.lastError.message
        );
      } else {
        console.log("VEXO script injected successfully.");
      }
    }
  );
});
