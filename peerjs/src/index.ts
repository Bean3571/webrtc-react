import { PeerServer } from "peer";

// Configure PeerServer to listen on all network interfaces
const peerServer = PeerServer({ 
    port: 9001, 
    path: "/",
    proxied: true // Enable if behind a reverse proxy
});

// Log server information
console.log("PeerJS server running on port 9001");
console.log("Access locally via http://localhost:9001");
console.log("Access on network via http://192.168.0.100:9001");
