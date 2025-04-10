// Network configuration
export const SERVER_IP = "192.168.0.100";
export const SOCKET_SERVER_PORT = 8080;
export const PEER_SERVER_PORT = 9001;

// Socket server URL
export const SOCKET_URL = `http://${SERVER_IP}:${SOCKET_SERVER_PORT}`;

// Peer server settings
export const PEER_CONFIG = {
  host: SERVER_IP,
  port: PEER_SERVER_PORT,
  path: "/"
};

// For development testing
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

// Function to check if we're using a production build
export const isProd = () => process.env.NODE_ENV === "production"; 