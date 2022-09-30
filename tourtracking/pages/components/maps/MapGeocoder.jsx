import { Select } from "@mantine/core";
import axios from "axios";
import debounce from "lodash.debounce";
import { useMemo, useState } from "react";

export default function MapGeocoder() {
  const [select, setSelect] = useState([]);
  const [coord, setCoord] = useState({});

  const getLocation = async (keyword) => {
    if (keyword) {
      const params = keyword.replaceAll(" ", "%20");
      const { data } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${params}.json?proximity=-73.990593%2C40.740121&types=place%2Cpostcode%2Caddress%2Ccountry%2Cregion%2Cdistrict%2Clocality%2Cneighborhood%2Cpoi&access_token=pk.eyJ1IjoiYTJyaiIsImEiOiJja2g3OW11N3MwNmh1MzBsbDQ4NGVrYWNtIn0.uvhpm1k_6EIRZXyOhHq7QQ`
      );

      const location = data.features.map((item) => {
        return {
          label: item.place_name,
          value: item.center,
        };
      });
      setSelect(location);
    } else {
      setSelect([]);
    }
  };

  const debouncedResults = useMemo(() => {
    return debounce(getLocation, 300);
  }, []);

  const selected = (e) => {
    const coords = select.filter((item) => item.label === e.target.value);
    setCoord(coords);
  };

  return (
    <>
      <Select
        label="Your favorite framework/library"
        placeholder="Search one"
        nothingFound="No options"
        searchable
        onSearchChange={debouncedResults}
        onSelect={selected}
        data={select}
      />
    </>
  );
}
