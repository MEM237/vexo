# VEXO Chrome Extension

## Overview
VEXO is a Chrome extension designed for peer-to-peer video and text relay with AI integration. It features a modular and intuitive 
interface, enabling users to seamlessly communicate and interact in real time.

---

## Project Structure
Below is the organized directory structure for the project:

```
VEXO/
├── manifest.json          # Chrome extension manifest
├── package.json           # Node.js dependencies
├── package-lock.json      # Exact dependency versions
├── README.md              # Documentation
├── node_modules/          # npm-managed dependencies (excluded from Git)
├── assets/                # Icons, placeholders, and static assets
│   ├── icons/             # Icon files
│   │   ├── icon16.png
│   │   ├── icon48.png
│   │   ├── icon128.png
│   └── placeholders/      # Placeholder images
│       └── placeholder0.jpg
├── src/                   # Main source code
│   ├── css/               # Stylesheets
│   │   ├── popup.css
│   │   ├── menu.css
│   │   └── video.css
│   ├── js/                # JavaScript files
│   │   ├── popup.js
│   │   ├── menu.js
│   │   └── content.js
│   ├── html/              # HTML files
│   │   ├── popup.html
│   │   ├── menu.html
│   │   └── video.html
│   └── firebase/          # Firebase-related files
│       └── firebaseConfig.js
├── tests/                 # Test scripts
└── docs/                  # Supporting documentation
    ├── structure.txt      # Original structure reference
    └── diagrams/          # Any relevant diagrams
```

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/vexo.git
   cd vexo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Load the extension in Chrome:
   - Navigate to `chrome://extensions`.
   - Enable **Developer Mode**.
   - Click **Load Unpacked** and select the project directory.

---

## Features
- **Video and Text Relay**: Peer-to-peer video feed with integrated text communication.
- **AI Integration**: Optional AI functionality for real-time chat enhancements.
- **Customizable UI**: Modular interface for enhanced usability.
- **Firebase Integration**: Real-time data synchronization (optional).

---

## Development

### File Breakdown
- **`manifest.json`**: Defines the Chrome extension metadata and permissions.
- **`src/`**:
  - `css/`: Stylesheets for the extension UI.
  - `js/`: Core functionality and logic.
  - `html/`: User interfaces for various components.
  - `firebase/`: Firebase configuration files.
- **`assets/`**:
  - `icons/`: Icons used by the extension.
  - `placeholders/`: Placeholder images displayed by default.

### Running Locally
Start a local development server:
```bash
npx serve src/
```
Access the interface via `http://localhost:5000` (default).

---

## Contributing
1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Submit a pull request with a clear description of changes.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

