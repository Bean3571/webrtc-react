import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { roomHandler } from "./room";

const app = express();

app.get("/health", (_, res) => {
    res.send("Server is running");
});

app.use(cors());
const port = 8080;
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("a user connected");
    roomHandler(socket);
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
    console.log(`Access locally via http://localhost:${port}`);
    console.log(`Access on network via http://192.168.0.100:${port}`);
});
