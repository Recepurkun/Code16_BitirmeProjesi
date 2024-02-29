import React, { useState, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  Polygon,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaLocationDot } from "react-icons/fa6";
import Details from "./Details";
import "./map.css";
delete L.Icon.Default.prototype._getIconUrl;


//? marker.png vercelde gozukmuyor o yuzden boyle bir cozum yapilmis
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

//markeri konumun ortasinda gostermek icin yazilmis bir fonk
const calculateMapCenter = (coordinates) => {
  if (coordinates.length === 0) {
    return [40.19718, 29.0623];
  }

  //[toplam[0] + current[0], toplam[1] + current[1]] ifadesi, x ve y koordinatlarını toplar ve yeni bir toplam koordinat çifti oluşturur.
  const totalCoordinates = coordinates.reduce(
    (toplam, current) => {
      return [toplam[0] + current[0], toplam[1] + current[1]];
    },
    [0, 0]
  );

  const center = [
    totalCoordinates[0] / coordinates.length,
    totalCoordinates[1] / coordinates.length,
  ];
  return center;
};

function Map({ coordinateData, ilceAdi, mahalleAdi, monthlyData, yearlyData }) {
  const center = calculateMapCenter(coordinateData);
  const [mapKey, setMapKey] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // coordinateData değiştiğinde mapKey'i güncelle
    setMapKey((prevKey) => prevKey + 1);
  }, [coordinateData]);

  const yillikVerileriGoster = () => {
    if (!yearlyData || yearlyData.length === 0) {
      return (
        <>
          <div
            className="spinner-border spinner-border-sm text-danger mx-2"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </>
      );
    }

    const yillikVerilerContent = yearlyData.map((data) => (
      <div key={data.donem}>
        <table className="table table-striped m-0 p-0 table-sm ">
          <thead>
            <tr>
              <th scope="col">Dönem</th>
              <th scope="col">Abone Sayisi</th>
              <th scope="col">Tüketim (Ton)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{data.donem}</th>
              <th scope="row">{data.aboneSayisi}</th>
              <th scope="row">{data.tuketim}</th>
            </tr>
          </tbody>
        </table>
      </div>
    ));

    return yillikVerilerContent;
  };

  const handlePopupButtonClick = () => {
    // Popup içindeki butona tıklandığında showDetails durumunu güncelle
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  return (
    <>
      <MapContainer
        key={mapKey}
        center={center}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: 500, width: "100%" }}
        className="shadow-lg p-3 mb-5 bg-body-tertiary rounded-3 maps"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            <button
              className="btn btn-sm btn-secondary"
              onClick={handlePopupButtonClick}
            >
              Aylik Verileri görmek için tiklayin
            </button>
          </Popup>
          <Tooltip>
            <b>Detayli bilgi icin tiklayin</b>
          </Tooltip>
        </Marker>
        <Polygon pathOptions={{ color: "purple" }} positions={coordinateData}>
          <Tooltip sticky>
            <div
              style={{
                padding: 5,
                backgroundColor: "#FCF5E5",
                borderRadius: 10,
              }}
            >
              <h6>Yillik Veriler</h6>
              <FaLocationDot />
              <b>
                {ilceAdi} - {mahalleAdi}
              </b>
              {yillikVerileriGoster()}
              <br />
            </div>
          </Tooltip>
        </Polygon>
      </MapContainer>
      {/* kullanici detaylari görmek istiyorsa details sayfasini göster */}
      {showDetails && <Details monthlyData={monthlyData} />}
    </>
  );
}

export default Map;
