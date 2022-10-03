import { useState, useEffect } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:4000", {
//   transports: ["websocket"],
// });

function useSocketIo() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("location", (data) => {
      setLocation(data);
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
    location,
  };
}

export default useSocketIo;
