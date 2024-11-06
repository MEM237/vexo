// src/webrtc.js

import firebase from "./firebase/firebaseConfig"; // Adjust path if needed

const db = firebase.firestore();
const signalingRef = db.collection("signaling");

// Initialize a WebRTC Peer Connection
let localStream = null;
let peerConnection = null;
const config = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }, // STUN server for NAT traversal
  ],
};

// Send signaling messages to Firebase
async function sendSignalingMessage(message) {
  await signalingRef.add(message);
}

// Listen for signaling messages from Firebase
function listenForSignalingMessages() {
  signalingRef.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const data = change.doc.data();
      if (change.type === "added") {
        if (data.type === "offer" && !peerConnection) {
          createPeerConnection();
          peerConnection.setRemoteDescription(
            new RTCSessionDescription(data.offer)
          );
          createAnswer();
        } else if (data.type === "answer") {
          peerConnection.setRemoteDescription(
            new RTCSessionDescription(data.answer)
          );
        } else if (data.type === "candidate" && data.candidate) {
          peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      }
    });
  });
}

// Create and send an offer to the remote peer
async function createOffer() {
  createPeerConnection();
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  sendSignalingMessage({ type: "offer", offer });
}

// Create and send an answer to the remote peer
async function createAnswer() {
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  sendSignalingMessage({ type: "answer", answer });
}

async function initLocalStream() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true });
    document.getElementById("localVideo").srcObject = localStream;
    listenForSignalingMessages(); // Start listening for signaling messages
  } catch (error) {
    console.error("Error accessing media devices.", error);
  }
}

// Function to initialize the local video stream
async function initLocalStream() {
  try {
    // Request video stream from user's webcam
    localStream = await navigator.mediaDevices.getUserMedia({ video: true });

    // Display the local video stream in the UI (placeholder for now)
    const localVideo = document.getElementById("localVideo"); // Ensure 'localVideo' element in HTML
    localVideo.srcObject = localStream;
  } catch (error) {
    console.error("Error accessing media devices.", error);
  }
}

// Function to initialize peer connection
function createPeerConnection() {
  peerConnection = new RTCPeerConnection(config);

  // Add each track from the local stream to the peer connection
  localStream
    .getTracks()
    .forEach((track) => peerConnection.addTrack(track, localStream));

  // Event listeners for the peer connection
  peerConnection.onicecandidate = handleICECandidateEvent;
  peerConnection.ontrack = handleTrackEvent;
}

// ICE Candidate handler
function handleICECandidateEvent(event) {
  if (event.candidate) {
    // Send ICE candidates to remote peer (handled by Firebase signaling)
    sendSignalingMessage({ type: "candidate", candidate: event.candidate });
  }
}

// Track event handler (for receiving remote video stream)
function handleTrackEvent(event) {
  const remoteVideo = document.getElementById("remoteVideo"); // Ensure 'remoteVideo' element in HTML
  remoteVideo.srcObject = event.streams[0];
}

export { initLocalStream, createPeerConnection };
