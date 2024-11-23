document.addEventListener("DOMContentLoaded", () => {
  const startCameraButton = document.getElementById("startCameraButton");
  const videoElement = document.getElementById("myVideo");
  const errorDiv = document.getElementById("error-message");

  // Function to show error messages
  const showErrorMessage = (message) => {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    console.error(message);
  };

  // Function to hide error messages
  const hideErrorMessage = () => {
    errorDiv.textContent = "";
    errorDiv.style.display = "none";
  };

  // Function to access the camera
  const accessCamera = async () => {
    hideErrorMessage(); // Clear previous errors

    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera access granted:", stream);

      // Display the video stream
      if (videoElement) {
        videoElement.srcObject = stream;
        videoElement.style.display = "block";
      } else {
        console.error("Video element not found!");
        showErrorMessage("Unable to find video element. Please try again.");
      }
    } catch (error) {
      console.error("Error accessing camera:", error);

      // Handle specific errors
      if (error.name === "NotAllowedError") {
        showErrorMessage(
          "Camera access denied. Please allow camera access in your browser settings."
        );
      } else if (error.name === "NotFoundError") {
        showErrorMessage(
          "No camera found. Please check your device's camera connection."
        );
      } else if (error.name === "OverconstrainedError") {
        showErrorMessage(
          "The requested camera constraints are not supported by your camera. Try adjusting the constraints."
        );
      } else {
        showErrorMessage("An error occurred while accessing the camera.");
      }
    }
  };

  // Add an event listener to the button
  if (startCameraButton) {
    startCameraButton.addEventListener("click", accessCamera);
  } else {
    console.error("Start Camera button not found.");
  }
});
