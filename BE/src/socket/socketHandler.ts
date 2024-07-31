import { Server, Socket } from "socket.io";
import redis from "../services/redisService";

export default (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("User connected", socket.id);

        // Listen for notification events
        socket.on("sendNotification", (message: string) => {
            redis.lpush("notifications", message);
            redis.ltrim("notifications", 0, 9);
            io.emit("receiveNotification", message);
        });

        // Send last 10 notifications to newly connected users
        redis.lrange("notifications", 0, 9, (err, notifications) => {
            if (err) {
                console.error(err);
                return;
            }
            socket.emit("notificationHistory", notifications);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id);
        });
    });
};
