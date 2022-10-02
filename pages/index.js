import "mapbox-gl/dist/mapbox-gl.css";
import MapTrack from "./components/maps/MapTrack";
import { useEffect } from "react";
import useSocketIo from "./plugin/socketPlugin";

function Home() {
  const { socket, message } = useSocketIo();

  useEffect(() => {
    console.log(message);
  }, [message]);

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
            message: "this is message text" + Math.random() * 1000,
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
