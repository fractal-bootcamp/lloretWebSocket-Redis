import React, { useState } from "react";
import NotificationList from "./components/NotificationList";
import socket from "./services/socket";

const App: React.FC = () => {
  const [message, setMessage] = useState("");

  const sendNotification = () => {
    socket.emit("sendNotification", message);
    setMessage("");
  };

  return (
    <div>
      <h1>Real-Time Notification System</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter notification"
      />
      <button onClick={sendNotification}>Send Notification</button>
      <NotificationList />
    </div>
  );
};

export default App;
