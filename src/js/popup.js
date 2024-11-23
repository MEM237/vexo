import Shepherd from "./shepherd.mjs";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed.");

  const enableCamButton = document.getElementById("enable-cam-button");
  if (enableCamButton) {
    console.log("Enable Cam button detected.");
    enableCamButton.addEventListener("click", enableCamera);
  } else {
    console.error("Enable Cam button not found in the DOM.");
  }
});

function enableCamera() {
  const localVideo = document.getElementById("localVideo");
  const warningText = document.getElementById("warning-text");

  if (!localVideo || !warningText) {
    console.error("Required elements missing.");
    return;
  }

  // Stop any existing stream
  if (localVideo.srcObject) {
    localVideo.srcObject.getTracks().forEach((track) => track.stop());
    localVideo.srcObject = null;
  }

  // Show warning text
  warningText.classList.remove("hidden");

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      localVideo.srcObject = stream;
      localVideo.classList.remove("hidden");
      localVideo.play();
      console.log("Camera access granted.");
      startShepherdTour(); // Start tour only if camera access is successful
    })
    .catch((error) => {
      console.error("Error accessing camera:", error);
      warningText.textContent =
        "Camera access denied. Change permissions in browser settings.";
    });
}

function startShepherdTour() {
  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      classes: "shepherd-theme-arrows",
      scrollTo: false,
    },
  });

  tour.addStep({
    id: "step-1",
    text: "Your camera is now active. You can interact with the VEXO interface.",
    buttons: [
      {
        text: "Done",
        action: tour.complete,
      },
    ],
  });

  tour.start();
}
