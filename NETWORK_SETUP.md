# Network Setup Instructions

This guide explains how to set up the WebRTC application to be accessible from other devices on your local network.

## Prerequisites

1. Find your computer's local IP address:
   - **Windows**: Open Command Prompt and type `ipconfig`
   - **Mac**: Open Terminal and type `ifconfig`
   - **Linux**: Open Terminal and type `ip addr` or `ifconfig`

   Look for an IPv4 address that starts with 192.168.x.x or 10.0.x.x.

## Configuration

1. Update the `.env.local` file in the client directory with your local IP address:

```
REACT_APP_SERVER_IP=192.168.0.100  # Replace with your IP address
REACT_APP_SOCKET_PORT=8080
REACT_APP_PEER_PORT=9001
```

## Running the Application

1. First-time setup (only needed once):
   ```
   yarn install:all
   ```

   This will install all dependencies for the client, server, and PeerJS components.

2. Start all services with one command:
   ```
   yarn start
   ```

   This will start:
   - React frontend (accessible on port 3000)
   - Socket.IO server (port 8080)
   - PeerJS server (port 9001)

3. Access the application from other devices on your network:
   ```
   http://192.168.0.100:3000  # Replace with your IP address
   ```

## Firewall Configuration

If other devices cannot connect, you may need to:

1. Allow ports 3000, 8080, and 9001 through your firewall
2. On Windows, open Windows Defender Firewall:
   - Go to "Allow an app or feature through Windows Defender Firewall"
   - Click "Change settings" and then "Allow another app"
   - Add Node.js and allow it on private networks

## Troubleshooting

1. **Connection issues**: Make sure all devices are on the same network
2. **Cannot access app**: Check your firewall settings
3. **Video/audio issues**: Make sure permissions are granted on all devices
4. **Windows-specific issues**: 
   - If you see errors related to commands using `&&`, run the commands individually
   - If services don't start properly, try starting them separately:
     ```
     cd peerjs && yarn dev
     cd server && yarn dev
     cd client && yarn start
     ```

## Mobile Device Access

For mobile devices:
1. Connect to the same WiFi network
2. Navigate to `http://192.168.0.100:3000` (replace with your computer's IP)
3. Allow camera and microphone permissions when prompted 