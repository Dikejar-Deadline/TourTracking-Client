export default function Fav() {
  return (
    <p
      onClick={() => {
        mapBox.flyTo({
          center: [(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 100],
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });
      }}
    >
      Hallo
    </p>
  );
}
