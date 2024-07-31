import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import Redis from 'ioredis';
import cors from 'cors';

const app = express();
const server = http.createServer(app); // Use server from http.createServer
const redis = new Redis();

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5175', // Replace with your frontend URL
        methods: ['GET', 'POST'],
    },
});

const PORT = 3000;

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5175', // Replace with your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
