document.addEventListener("DOMContentLoaded", () => {
  const mainVideo = document.getElementById("mainVideo");
  const secondaryPlaceholder = document.getElementById("secondaryPlaceholder");
  const warningText = document.getElementById("warning-text");
  const doneButton = document.getElementById("done-button");

  initializeCameraState();

  if (secondaryPlaceholder) {
    secondaryPlaceholder.addEventListener("click", () => {
      enableCamera();
    });
  }

  if (doneButton) {
    doneButton.addEventListener("click", () => {
      dismissWarning();
    });
  }
});

function initializeCameraState() {
  navigator.permissions.query({ name: "camera" }).then((status) => {
    if (status.state === "granted") {
      enableCamera();
      chrome.storage.local.get(["warningDismissed"], (result) => {
        if (!result.warningDismissed) showWarning();
      });
    } else {
      toggleVideoVisibility(false);
    }

    status.onchange = () => {
      if (status.state === "granted") {
        enableCamera();
        showWarning();
      } else {
        toggleVideoVisibility(false);
      }
    };
  });
}

function enableCamera() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      const mainVideo = document.getElementById("mainVideo");
      toggleVideoVisibility(true);
      mainVideo.srcObject = stream;
      mainVideo.play();
    })
    .catch(() => toggleVideoVisibility(false));
}

function toggleVideoVisibility(showVideo) {
  const mainVideo = document.getElementById("mainVideo");
  const secondaryPlaceholder = document.getElementById("secondaryPlaceholder");
  mainVideo.classList.toggle("hidden", !showVideo);
  secondaryPlaceholder.classList.toggle("hidden", showVideo);
}

function showWarning() {
  const warningText = document.getElementById("warning-text");
  warningText.classList.remove("hidden");
}

function dismissWarning() {
  const warningText = document.getElementById("warning-text");
  warningText.classList.add("hidden");
  chrome.storage.local.set({ warningDismissed: true });
}
