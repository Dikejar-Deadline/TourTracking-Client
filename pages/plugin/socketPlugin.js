import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://41b4-125-166-127-159.ap.ngrok.io", {
  transports: ["websocket"],
});

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
