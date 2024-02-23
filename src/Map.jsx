import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  Polygon,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map({ coordinateData }) {
  const center = [40.22520195, 28.94102834]; // secilen ilceye gore konumu dinamik olarak degistirmek lazim
  console.log(coordinateData)

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: 500, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* marker'in pozisyonunu gelen koordinat verilerine gore dinamik olarak guncellemek lazim */}
      <Marker position={[51.51, -0.09]}>
        {/* Popup ve tooltipi de secilen konuma gore kullanciya ise yarayan bilgiler gostermek icin kullan */}
        <Popup>Popup for Marker</Popup> 
        <Tooltip>Tooltip for Marker</Tooltip>
      </Marker>
      <Polygon pathOptions={{ color: "purple" }} positions={coordinateData}>
        <Tooltip sticky>sticky Tooltip for Polygon</Tooltip>
      </Polygon>
    </MapContainer>
  );
}

export default Map;
