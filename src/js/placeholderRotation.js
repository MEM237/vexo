// Array of placeholder image file paths
const placeholders = [
    './assets/placeholder1.jpg',
    './assets/placeholder2.jpg',
    './assets/placeholder3.jpg',
    './assets/placeholder4.jpg',
    './assets/placeholder5.jpg'
];

// Select the main video window element by its ID or class
// Replace 'main-video-window' with the actual ID or class of your video window element
const mainVideoWindow = document.getElementById('main-video-window');

function rotatePlaceholder() {
    // Randomly select an image from the placeholders array
    const randomIndex = Math.floor(Math.random() * placeholders.length);
    const selectedImage = placeholders[randomIndex];

    // Update the main video window's background or image source
    mainVideoWindow.style.backgroundImage = `url(${selectedImage})`;
    mainVideoWindow.style.backgroundSize = 'cover'; // Ensures the image covers the entire element

    // Set the rotation interval to 20 seconds (20,000 milliseconds)
    setTimeout(rotatePlaceholder, 20000);
}

// Initialize the rotation
rotatePlaceholder();
