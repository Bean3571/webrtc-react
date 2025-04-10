/**
 * Certificate generation script for local development
 * 
 * This script creates a self-signed certificate for local HTTPS development.
 * Note: This is NOT secure for production use, only for local development.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create certificates directory if it doesn't exist
const certDir = path.join(__dirname, 'certificates');
if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir, { recursive: true });
  console.log('Created certificates directory');
}

// Get the local IP address
let localIP = '192.168.0.100'; // Default fallback
try {
  // Use OS module to get network interfaces
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  
  // Find a suitable IP address
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (loopback) addresses
      if (net.family === 'IPv4' && !net.internal) {
        localIP = net.address;
        break;
      }
    }
  }
} catch (err) {
  console.log('Could not determine local IP address:', err);
}

console.log(`Using IP address: ${localIP}`);

// Check if mkcert is installed
try {
  execSync('mkcert -version', { stdio: 'ignore' });
  console.log('mkcert is installed');
} catch (err) {
  console.error('mkcert is not installed. Please install it first:');
  console.error('- Windows: choco install mkcert');
  console.error('- macOS: brew install mkcert');
  console.error('- Linux: sudo apt install mkcert or download from https://github.com/FiloSottile/mkcert/releases');
  process.exit(1);
}

// Generate certificates
try {
  console.log('Generating certificates...');
  const certPath = path.join(certDir, 'cert.pem');
  const keyPath = path.join(certDir, 'key.pem');
  
  execSync(`mkcert -key-file ${keyPath} -cert-file ${certPath} localhost 127.0.0.1 ${localIP}`, { 
    stdio: 'inherit'
  });
  
  console.log('\nCertificates generated successfully!');
  console.log(`Certificate: ${certPath}`);
  console.log(`Key: ${keyPath}`);
  
  console.log('\nNext steps:');
  console.log('1. For Android devices, you need to install the certificate:');
  console.log('   - Start a server: cd certificates && python -m http.server 8000');
  console.log(`   - On your Android device, navigate to: http://${localIP}:8000/cert.pem`);
  console.log('   - Download the certificate');
  console.log('   - Go to Settings > Security > Encryption & credentials > Install a certificate > CA certificate');
  console.log('   - Install the downloaded certificate');
  
  console.log('\n2. Start your application with HTTPS:');
  console.log('   yarn start');
  
  console.log(`\n3. Access your application at: https://${localIP}:3000`);
} catch (err) {
  console.error('Error generating certificates:', err.message);
  process.exit(1);
} 