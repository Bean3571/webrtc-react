# Setting Up HTTPS for Mobile Access

Modern browsers, especially on mobile devices, require HTTPS to access camera and microphone. Follow these steps to set up HTTPS for local development.

## Step 1: Install mkcert

mkcert is a tool that creates locally-trusted certificates.

### Windows:
```
# Using Chocolatey (install from chocolatey.org first if you don't have it)
choco install mkcert

# Install the local CA
mkcert -install
```

### macOS:
```
# Using Homebrew
brew install mkcert
brew install nss # for Firefox

# Install the local CA
mkcert -install
```

### Linux:
```
# Install certutil first
sudo apt install libnss3-tools

# Install mkcert
sudo apt install mkcert
# OR download binary from https://github.com/FiloSottile/mkcert/releases

# Install the local CA
mkcert -install
```

## Step 2: Create Certificates for Your IP

```
# Create a certificates directory
mkdir -p certificates

# Generate certificates for your IP and localhost
mkcert -key-file ./certificates/key.pem -cert-file ./certificates/cert.pem localhost 127.0.0.1 192.168.0.100
```

## Step 3: Update React Start Script

Edit `client/package.json` to use HTTPS:

```json
"start": "cross-env HTTPS=true SSL_CRT_FILE=../certificates/cert.pem SSL_KEY_FILE=../certificates/key.pem HOST=0.0.0.0 react-scripts start",
```

## Step 4: Update Socket.IO Server

Edit `server/src/index.ts` to use HTTPS:

```typescript
import https from "https";
import fs from "fs";

const options = {
  key: fs.readFileSync("../certificates/key.pem"),
  cert: fs.readFileSync("../certificates/cert.pem")
};

const server = https.createServer(options, app);
```

## Step 5: Update PeerJS Server

Edit `peerjs/src/index.ts` to use HTTPS:

```typescript
import https from "https";
import fs from "fs";
import { PeerServer } from "peer";

const options = {
  key: fs.readFileSync("../certificates/key.pem"),
  cert: fs.readFileSync("../certificates/cert.pem")
};

const server = https.createServer(options);
PeerServer({
  port: 9001,
  path: "/",
  ssl: options
});
```

## Step 6: Update Configuration URLs

Update `client/src/config.ts` to use HTTPS:

```typescript
export const SOCKET_URL = `https://${SERVER_IP}:${SOCKET_SERVER_PORT}`;

export const PEER_CONFIG = {
  host: SERVER_IP,
  port: PEER_SERVER_PORT,
  path: "/",
  secure: true  // Enable HTTPS
};
```

## Step 7: Installing Certificate on Android Device

1. Connect your Android device to the same WiFi network
2. Transfer the certificate file to your Android device:
   ```
   # Start a simple HTTP server to transfer the certificate
   cd certificates
   python -m http.server 8000
   ```
3. On your Android device, open Chrome and navigate to:
   ```
   http://192.168.0.100:8000/cert.pem
   ```
4. Download the certificate
5. Go to Settings > Security > Encryption & credentials > Install a certificate > CA certificate
6. Install the downloaded certificate
7. If prompted, enter your device PIN

## Step 8: Accessing Your Secure App

Now access your application via HTTPS:
```
https://192.168.0.100:3000
```

## Common Issues

- **Certificate warnings**: Make sure you've installed the certificate on both your development machine and mobile device
- **Connection refused**: Check firewall settings for ports 3000, 8080, and 9001
- **Camera/microphone not working**: Verify your site is using HTTPS and you've granted permissions 