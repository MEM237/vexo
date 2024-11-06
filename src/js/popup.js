document.addEventListener("DOMContentLoaded", function () {
  const localVideo = document.getElementById("localVideo");
  const placeholderImages = [
    "../placeholder1.jpg",
    "../placeholder2.jpg",
    "../placeholder3.jpg",
    "../placeholder4.jpg",
    "../placeholder5.jpg",
  ];

  let localStream = null;

  // Function to get user media
  async function startVideo() {
    try {
      console.log("Attempting to access user media...");
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      console.log("User media stream:", localStream);
      localVideo.srcObject = localStream;
      hidePlaceholder();
    } catch (error) {
      console.error("Error accessing media devices.", error);
      displayPlaceholder();
    }
  }

  // Display a random placeholder image if video access fails
  function displayPlaceholder() {
    const randomIndex = Math.floor(Math.random() * placeholderImages.length);
    const placeholder = document.getElementById("placeholder");
    placeholder.style.backgroundImage = `url('${placeholderImages[randomIndex]}')`;
    placeholder.style.display = "block";
    localVideo.style.display = "none";
  }

  // Hide placeholder when video starts
  function hidePlaceholder() {
    const placeholder = document.getElementById("placeholder");
    placeholder.style.display = "none";
    localVideo.style.display = "block";
  }

  // Initialize video
  startVideo();

  // Chat functionality
  const chatInput = document.getElementById("chatInput");
  const chatWindow = document.getElementById("chatWindow");
  const sendButton = document.getElementById("sendButton");

  sendButton.addEventListener("click", sendMessage);
  chatInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  function sendMessage() {
    const message = chatInput.value.trim();
    if (message !== "") {
      displayMessage("You", message);
      chatInput.value = "";
    }
  }

  function displayMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
});
