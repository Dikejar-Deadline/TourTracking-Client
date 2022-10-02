import { useState, useEffect } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:4000", {
//   transports: ["websocket"],
// });

function useSocketIo() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("messageResponse", (data) => {
      setMessage(data);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return {
    socket,
    isConnected,
    message,
  };
}

export default useSocketIo;
