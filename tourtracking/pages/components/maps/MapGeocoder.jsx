export default function MapGeocoder() {
  const getLocation = async () => {
    const { data } = await axios.get(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/empang.json?proximity=ip&types=place%2Cpostcode%2Caddress%2Ccountry%2Cregion%2Cdistrict%2Clocality%2Cneighborhood%2Cpoi&access_token=pk.eyJ1IjoiYTJyaiIsImEiOiJja2g3OW11N3MwNmh1MzBsbDQ4NGVrYWNtIn0.uvhpm1k_6EIRZXyOhHq7QQ"
    );

    console.log(data);
  };

  return (
    <>
      <p>AHHAHAH</p>
    </>
  );
}
