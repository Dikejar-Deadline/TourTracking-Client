import "mapbox-gl/dist/mapbox-gl.css";
import MapTrack from "./components/maps/MapTrack";
import socketIO from "socket.io-client";
import { useEffect } from "react";

const socket = socketIO.connect("http://localhost:4000");

function Home() {
  useEffect(() => {
    socket.on("messageResponse", (data) => console.log(data));
  }, []);

  return (
    <>
      <MapTrack />;
      <button
        onClick={() => {
          socket.emit("join", {
            roomId: 2022,
          });
        }}
      >
        Join room
      </button>
      <button
        onClick={() => {
          socket.emit("message", {
            message: "this is message text",
            roomId: 2022,
          });
        }}
      >
        Emit message
      </button>
    </>
  );
  // return <Fav />;
}

export default Home;
