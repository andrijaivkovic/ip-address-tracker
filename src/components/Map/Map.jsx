import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import { v4 as uuid } from "uuid";

import { useApp } from "../../contexts/AppContext";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const icon = L.icon({
  iconUrl: "https://i.ibb.co/njNxHMw/market-icon.png",
  shadowUrl: "https://i.ibb.co/7VK1gzy/marker-shadow.png",
});

const Map = () => {
  const { info, isLoading, error } = useApp();

  let lat, lng;

  if (info) {
    lat = info.location.lat;
    lng = info.location.lng;
  }

  return (
    <div className="map-container">
      {isLoading || !info ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <MapContainer
          key={uuid()}
          className="map"
          center={!error ? [lat + 0.001, lng + 0.001] : [25, 0]}
          zoom={!error ? 15 : 2}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=HxdFKLYDXo3HJC9yrlAh4g0rxpHueJrhkLwCKchSFBBcdljPBYMzlMani8AxeQ9m" />
          {!error && <Marker icon={icon} position={[lat, lng]}></Marker>}
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
