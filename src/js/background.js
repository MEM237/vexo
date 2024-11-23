let vexoPanelOpen = false;

console.log("Background script loaded.");

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "shepherdComplete") {
    console.log("Shepherd completed. Transitioning to next phase...");

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];

      if (tab.url?.startsWith("http://") || tab.url?.startsWith("https://")) {
        console.log("Injecting VEXO into HTTP(S) page:", tab.url);
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["src/js/injectVEXO.js"],
        });
        vexoPanelOpen = true;
      } else {
        console.log("Unsupported URL. Opening popup...");
        chrome.windows.create({
          url: chrome.runtime.getURL("src/html/popup.html"),
          type: "popup",
          width: 400,
          height: 250,
        });
      }
    });
  }
});
