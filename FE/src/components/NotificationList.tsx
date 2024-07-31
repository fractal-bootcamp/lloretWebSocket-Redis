import React, { useEffect, useState } from "react";
import socket from "../services/socket";

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    socket.on("receiveNotification", (message: string) => {
      setNotifications((prev) => [message, ...prev]);
    });

    socket.on("notificationHistory", (history: string[]) => {
      setNotifications(history);
    });

    return () => {
      socket.off("receiveNotification");
      socket.off("notificationHistory");
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
