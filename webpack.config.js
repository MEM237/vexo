const path = require("path");

module.exports = {
  entry: "./src/js/video_vtx.js", // Relative to the VEXO root directory
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), // Output path relative to VEXO directory
  },
  mode: "development", // Set mode to prevent warning
};
