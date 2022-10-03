import "mapbox-gl/dist/mapbox-gl.css";
import MapTrack from "./components/maps/MapTrack";
import { useEffect } from "react";
import useSocketIo from "./plugin/socketPlugin";

function Home() {
  const { socket, location } = useSocketIo();

  useEffect(() => {
    console.log(location);
  }, [location]);

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
          socket.emit("coord", {
            latitude: "",
            longitude: "",
            RoomId: "",
            UserId: "",
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
