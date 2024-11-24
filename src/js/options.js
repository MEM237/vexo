document.addEventListener('DOMContentLoaded', function() {
  const status = document.getElementById('status');

  document.getElementById('request-camera').addEventListener('click', async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately after granting access
      status.textContent = 'Camera access granted. You may close this page.';
    } catch (error) {
      status.textContent = 'Error: ' + error.message;
    }
  });
});
