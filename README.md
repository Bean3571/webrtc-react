# WebRTC React Video Chat Application

A peer-to-peer video chat application built with React, WebRTC, Socket.IO, and PeerJS.

[Video Tutorial](https://www.youtube.com/watch?v=3KYKXsnMpAo&list=PLivfVBKXLkx_1VKrqHv4K6sKIoWTEVlJ9)

## Quick Start

1. **Install dependencies:**
   ```
   yarn install:all
   ```

2. **Setup for local network access:**
   ```
   # Generate HTTPS certificates
   yarn setup:https
   
   # Start all services
   yarn start
   ```

3. **Access the application:**
   - Computer: `https://localhost:3000`
   - Other devices: `https://YOUR_IP:3000`

## Device Setup

### Computer Setup

1. Install mkcert (Windows: `choco install mkcert`, Mac: `brew install mkcert`, Linux: `sudo apt install mkcert`)
2. Run `yarn setup:https` to generate certificates
3. Start the app with `yarn start`

### Android Setup

1. Start certificate server: `yarn serve-cert`
2. On Android device:
   - Connect to same WiFi network
   - Visit certificate server URL (shown in terminal)
   - Download and install certificate (Settings > Security > Encryption & credentials > Install a certificate)
   - Access app at `https://YOUR_IP:3000`

### iOS Setup

1. On iOS device:
   - Connect to same WiFi network
   - Visit `https://YOUR_IP:3000`
   - Go to Settings > General > Profile, find and install certificate

## Troubleshooting

- **Connection issues:** Ensure all devices are on same network
- **Certificate warnings:** Follow proper certificate installation steps
- **Cannot access app:** Check firewall settings for ports 3000, 8080, 9001
- **No camera/mic access:** Verify HTTPS is working and permissions are granted

## Advanced Configuration

See the `.env.local` file to configure:
- Server IP address
- Socket.IO port
- PeerJS server port

## Project Structure

- `client/`: React frontend application
- `server/`: Socket.IO signaling server
- `peerjs/`: PeerJS server for WebRTC connections
- `certificates/`: HTTPS certificates
