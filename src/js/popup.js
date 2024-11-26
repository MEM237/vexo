document.addEventListener("DOMContentLoaded", () => {
  const aboutButton = document.getElementById("about-button");
  const enableCamButton = document.getElementById("enable-cam-button");
  const menu = document.getElementById("menu");
  const placeholder = document.getElementById("placeholder");

  // Check if critical elements are available
  if (!aboutButton || !enableCamButton || !menu || !placeholder) {
    console.error("Critical elements missing in DOM. Check HTML structure.");
    return;
  }

  // About Button Event Listener
  aboutButton.addEventListener("click", () => {
    alert(
      "VEXO Escalator: Version 1.0\nA Chrome extension for video and text communication."
    );
  });

  // Enable Camera Button Event Listener
  enableCamButton.addEventListener("click", () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        console.log("Camera access granted.");

        // Add video feed to placeholder
        const localVideo = document.createElement("video");
        localVideo.srcObject = stream;
        localVideo.autoplay = true;
        localVideo.muted = true;
        localVideo.classList.add("local-video");

        placeholder.innerHTML = ""; // Clear placeholder
        placeholder.appendChild(localVideo); // Replace with video

        // Hide buttons
        aboutButton.style.display = "none";
        enableCamButton.style.display = "none";

        // Show menu
        menu.style.display = "flex";
        console.log("Menu is now visible.");
      })
      .catch((error) => {
        console.error("Camera access failed:", error.message);
        alert(
          "Unable to access your camera. Please check your browser settings."
        );
      });
  });
});
