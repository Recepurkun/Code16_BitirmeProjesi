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

function Map({ coordinateData, ilceAdi, mahalleAdi,selectedIlce, selectedMahalle  }) {
  const center = calculateMapCenter(coordinateData);
  const [mapKey, setMapKey] = useState(0);
  {console.log("Secilen ilce ve mahalle: ",selectedIlce + " - " + selectedMahalle)}
  {console.log("ilce ve mahalle: ",ilceAdi + " - " + mahalleAdi)}

  // const fetchTotalYearsData = async () => {
  //   try {
  //     const startTime = new Date().getTime(); // api baslangic zamani

  //     // const ilceID = 1832;
  //     // const mahalleID = 11171;
  //     const url = `https://acikveri.buski.gov.tr:9016/acik/yesil/v1/tuketim/mahalle/yillik?ilceID=${selectedIlce.value}&mahalleID=${selectedMahalle.value}`

  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         Origin: "http://localhost:5173",
  //         Accept: "application/json",
  //       },
  //     });
  //     const endTime = new Date().getTime(); // api bitis zamani
  //     const duration = endTime - startTime; // kac saniyede apiden sonuc donuyo hesapla
  //     console.log(`API isteği tamamlandı. Süre: ${duration} ms`);
  //     const data = await response.json();
  //     console.log(data)
  //   } catch (error) {
  //     console.error("Error fetching GeoJSON data:", error);
  //   }
  // };

  // useEffect(() => {
  //   // selectedIlce veya selectedMahalle değiştiğinde fetchTotalYearsData fonksiyonunu çağır
  //   if (ilceAdi && mahalleAdi) {
  //     fetchTotalYearsData();
  //   }
  // }, [ilceAdi, mahalleAdi]);

  useEffect(() => {
    // coordinateData değiştiğinde mapKey'i güncelle
    setMapKey((prevKey) => prevKey + 1);
  }, [coordinateData]);

  return (
    <MapContainer
      key={mapKey}
      center={center}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: 500, width: "100%"}}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* marker'in pozisyonunu gelen koordinat verilerine gore dinamik olarak guncellemek lazim */}
      <Marker position={center}>
        {/* Popup ve tooltipi de secilen konuma gore kullanciya ise yarayan bilgiler gostermek icin kullan */}
        <Popup>Popup for Marker</Popup>
        <Tooltip>Tooltip for Marker</Tooltip>
      </Marker>
      <Polygon pathOptions={{ color: "purple" }} positions={coordinateData}> 
        <Tooltip sticky>
          <div style={{padding:"5px", backgroundColor:"#FCF5E5", borderRadius:10}} >
            <FaLocationDot/>
            {ilceAdi} - {mahalleAdi}<br />
          </div>
        </Tooltip>
      </Polygon>
    </MapContainer>
  );
}

export default Map;
