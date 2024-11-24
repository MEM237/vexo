import http.server
import socketserver
import webbrowser

# Configuration
PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

# Open the video_vtx.html file in a browser
def open_vtx_interface():
    url = f'http://localhost:{PORT}/video_vtx.html'
    webbrowser.open(url)

# Set up HTTP server to serve files from the project directory
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving VEXO Video Text Interface at http://localhost:{PORT}")
    open_vtx_interface()
    httpd.serve_forever()
