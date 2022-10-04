import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import useSocketIo from "./plugin/socketPlugin";
import { useRouter } from "next/router";

function Home() {
  const { socket } = useSocketIo();
  const router = useRouter();
  const [UserId, setUserId] = useState(null);

  return (
    <>
      <input
        onChange={(e) => {
          setUserId(e.target.value);
        }}
      />
      <button
        onClick={() => {
          socket.emit("join", {
            RoomId: 2022,
          });
          router.push({
            pathname: "map/MapBox",
            query: {
              longitude: 117.4405,
              latitude: -8.506,
              UserId,
            },
          });
        }}
      >
        Join room
      </button>
    </>
  );
}

export default Home;
