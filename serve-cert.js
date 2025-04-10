/**
 * Certificate server script
 * 
 * This script serves the certificate files so they can be easily downloaded and installed on mobile devices.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { networkInterfaces } = require('os');

// Find local IP address
const getLocalIP = () => {
  const nets = networkInterfaces();
  let localIP = '192.168.0.100'; // Default fallback

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (loopback) addresses
      if (net.family === 'IPv4' && !net.internal) {
        localIP = net.address;
        break;
      }
    }
  }
  return localIP;
};

const localIP = getLocalIP();
const certPath = path.join(__dirname, 'certificates');
const port = 8000;

// Check if certificates exist
if (!fs.existsSync(path.join(certPath, 'cert.pem'))) {
  console.error(`Certificate file not found in ${certPath}`);
  console.error('Please run "yarn generate-certs" first to create your certificates');
  process.exit(1);
}

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  // Simple request logging
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  // Serve the certificate file
  if (req.url === '/cert.pem' || req.url === '/key.pem') {
    const fileName = req.url.slice(1);
    const filePath = path.join(certPath, fileName);
    
    if (fs.existsSync(filePath)) {
      res.setHeader('Content-Type', 'application/x-pem-file');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      fs.createReadStream(filePath).pipe(res);
      return;
    }
  }

  // Serve the instructions page for root path
  if (req.url === '/' || req.url === '/index.html') {
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Certificate Installation</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { color: #333; }
            .button { 
              display: inline-block; 
              background-color: #4CAF50; 
              color: white; 
              padding: 10px 20px; 
              text-align: center; 
              text-decoration: none; 
              font-size: 16px; 
              margin: 10px 0; 
              border-radius: 4px; 
            }
            ol { line-height: 1.6; }
          </style>
        </head>
        <body>
          <h1>Certificate Installation for WebRTC App</h1>
          
          <h2>Download the Certificate</h2>
          <p>Click the button below to download the certificate:</p>
          <a href="/cert.pem" class="button">Download Certificate</a>
          
          <h2>Installation Instructions for Android</h2>
          <ol>
            <li>Download the certificate using the button above</li>
            <li>Go to your device Settings</li>
            <li>Navigate to Security > Encryption & credentials > Install a certificate > CA certificate</li>
            <li>You might see a warning about security risks - tap "Install anyway"</li>
            <li>Select the downloaded certificate file</li>
            <li>Follow the prompts to install it</li>
          </ol>
          
          <h2>Access the WebRTC Application</h2>
          <p>After installing the certificate, you can access the application at:</p>
          <a href="https://${localIP}:3000" class="button">Open WebRTC App</a>
          
          <h2>Troubleshooting</h2>
          <ul>
            <li>If you're having issues, try restarting your browser after installing the certificate</li>
            <li>Make sure your phone and computer are on the same WiFi network</li>
            <li>Allow camera/microphone permissions when prompted</li>
          </ul>
        </body>
      </html>
    `);
    return;
  }

  // Not found
  res.statusCode = 404;
  res.end('Not Found');
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Certificate server running at:`);
  console.log(`http://${localIP}:${port}`);
  console.log('On your mobile device, visit the URL above to download and install the certificate');
  console.log('Press Ctrl+C to stop the server');
}); 