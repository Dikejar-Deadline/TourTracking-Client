import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://42b2-125-166-126-165.ap.ngrok.io", {
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
      data = [...new Map(data.map((item) => [item["UserId"], item])).values()];
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
