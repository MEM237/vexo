document.addEventListener("DOMContentLoaded", () => {
  const aboutButton = document.getElementById("about-button");
  const enableCamButton = document.getElementById("enable-cam-button");
  const overlay = document.querySelector(".shepherd-modal-overlay-container");

  // Show and hide modal overlay
  const showModalOverlay = () => {
    overlay.classList.add("shepherd-modal-is-visible");
    setTimeout(hideModalOverlay, 2000); // Auto-hide after 2 seconds
  };

  const hideModalOverlay = () => {
    overlay.classList.remove("shepherd-modal-is-visible");
  };

  // Handle "About" button click
  aboutButton.addEventListener("click", () => {
    showModalOverlay();
    window.open("https://www.intaccc.com", "_blank");
  });

  // Handle "Enable Cam" button click
  enableCamButton.addEventListener("click", () => {
    showModalOverlay();
    requestCameraPermission();
  });

  // Request camera permissions and enable camera
  const requestCameraPermission = () => {
    navigator.permissions.query({ name: "camera" }).then((status) => {
      if (status.state === "granted" || status.state === "prompt") {
        enableCamera();
      } else {
        alert(
          "Camera access denied. Please enable it in your browser settings."
        );
      }
    });
  };

  const enableCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const videoElement = document.createElement("video");
        videoElement.srcObject = stream;
        videoElement.autoplay = true;
        videoElement.muted = true;
        Object.assign(videoElement.style, {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "300px",
          height: "200px",
          zIndex: "9999",
        });
        document.body.appendChild(videoElement);
      })
      .catch(() => {
        alert("Unable to access camera. Please check your browser settings.");
      });
  };
});
