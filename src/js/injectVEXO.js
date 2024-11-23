if (!document.getElementById("vexo-container")) {
  console.log("Injecting VEXO panel...");

  const container = document.createElement("div");
  container.id = "vexo-container";
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.right = "0";
  container.style.width = "400px";
  container.style.height = "100vh";
  container.style.backgroundColor = "#1a1a1a";
  container.style.zIndex = "9999";
  document.body.appendChild(container);

  const iframe = document.createElement("iframe");
  iframe.src = chrome.runtime.getURL("src/html/popup.html");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  container.appendChild(iframe);

  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.left = "10px";
  closeButton.onclick = () => container.remove();
  container.appendChild(closeButton);

  console.log("VEXO panel injected.");
} else {
  console.log("VEXO panel already exists.");
}
