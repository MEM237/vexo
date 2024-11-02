document.addEventListener('DOMContentLoaded', async function() {
  const localVideo = document.getElementById('localVideo');
  const remoteVideo = document.getElementById('remoteVideo');
  const chatBox = document.getElementById('chat-box');
  const messageInput = document.getElementById('message');
  const sendButton = document.getElementById('send-button');

  let localStream;
  let remoteStream = new MediaStream();
  let peerConnection;
  const configuration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }
    ]
  };

  // Start local video
  async function startLocalVideo() {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true });
    localVideo.srcObject = localStream;
  }

  // Create WebRTC connection
  async function startConnection() {
    peerConnection = new RTCPeerConnection(configuration);
    
    // Add local stream to connection
    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream);
    });

    // Handle incoming remote stream
    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach(track => {
        remoteStream.addTrack(track);
      });
      remoteVideo.srcObject = remoteStream;
    };

    // Send ICE candidates to signaling server
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // Send the ICE candidate to the other user via signaling server
      }
    };
  }

  // Send message
  function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
      const messageElement = document.createElement('div');
      messageElement.textContent = "You: " + message;
      chatBox.appendChild(messageElement);
      messageInput.value = '';

      // Send the message over WebRTC data channel
      if (dataChannel) dataChannel.send(message);
    }
  }

  // Start local video and connection
  startLocalVideo();
  sendButton.addEventListener('click', sendMessage);
});
