import { useState, useEffect } from "react";
import "./App.css";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import Select from "react-select";

function App() {
  const options = [
    {
      value: "1832",
      label: "Osmangazi",
      neighborhoods: [
        { id: 11155, name: "ADALET MH." },
        { id: 183473, name: "AHMETBEY MH" },
      ],
    },
    {
      value: "1829",
      label: "Nilüfer",
      neighborhoods: [
        { id: 140338, name: "19 MAYIS MAHALLE" },
        { id: 140334, name: "23 NİSAN MAHALLE" },
      ],
    },
    {
      value: "1859",
      label: "Yildirim",
      neighborhoods: [
        { id: 11274, name: "152 EVLER MH." },
        { id: 11324, name: "75.YIL MH." },
      ],
    },
  ];

  const [selectedIlce, setSelectedIlce] = useState(null);
  const [selectedMahalle, setSelectedMahalle] = useState(null);
  const [geojsonData, setGeojsonData] = useState(null);

  const fetchData = async () => {
    try {
      const startTime = new Date().getTime(); // İstek başlangıç zamanını kaydedin

      // const ilceID = 1832;
      // const mahalleID = 11171;
      const url = `https://acikveri.buski.gov.tr:9016/acik/yesil/v1/tuketim/mahalle/aylik?ilceID=${selectedIlce.value}&mahalleID=${selectedMahalle.value}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Origin: "http://localhost:5173", // veya kendi origin'iniz
          Accept: "application/json",
        },
      });
      const endTime = new Date().getTime(); // İstek bitiş zamanını kaydedin
      const duration = endTime - startTime; // İstek süresini hesaplayın
      console.log(`API isteği tamamlandı. Süre: ${duration} ms`);
      const data = await response.json();
      console.log(data);
      setGeojsonData(data); //ekrana yazdirmak için
    } catch (error) {
      console.error("Error fetching GeoJSON data:", error);
    }
  };

  const fetchLocationData = async () => {
    try {
      const startTime = new Date().getTime(); // İstek başlangıç zamanını kaydedin

      const url = `https://acikyesil.bursa.bel.tr/geoserver/ckan/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ckan%3Abursa_mahallesinirlari&outputFormat=application%2Fjson&CQL_FILTER=uavt_kodu=${selectedMahalle.value}
      `;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Origin: "http://localhost:5173", // veya kendi origin'iniz
          Accept: "application/json",
        },
      });
      const endTime = new Date().getTime(); // İstek bitiş zamanını kaydedin
      const duration = endTime - startTime; // İstek süresini hesaplayın
      console.log(`API isteği tamamlandı. Süre: ${duration} ms`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching GeoJSON data:", error);
    }
  };

  const ilceOptions = options.map((ilce) => ({
    value: ilce.value,
    label: ilce.label,
  }));

  const mahalleOptions = selectedIlce
    ? options
        .find((ilce) => ilce.value === selectedIlce.value)
        ?.neighborhoods.map((mahalle) => ({
          value: mahalle.id,
          label: mahalle.name,
        }))
    : [];

  const handleIlceChange = (selectedOption) => {
    setSelectedIlce(selectedOption);
    setSelectedMahalle(null); // İlçe değiştiğinde mahalle seçimini sıfırla
    setGeojsonData(null); // İlçe değiştiğinde GeoJSON verisini sıfırla
  };

  const handleMahalleChange = (selectedOption) => {
    setSelectedMahalle(selectedOption);
    setGeojsonData(null); // Mahalle değiştiğinde GeoJSON verisini sıfırla
  };

  useEffect(() => {
    console.log("ilce:", selectedIlce);
  }, [selectedIlce]);
  useEffect(() => {
    console.log("mahalle:", selectedMahalle);
  }, [selectedMahalle]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kullanıcının girdiği değerlere göre veriyi çek
    fetchData();
    fetchLocationData();
  };

  return (
    <div>
      <h5>İlçe Seçiniz: </h5>
      <div
        style={{
          color: "rgb(50,50,50)",
          display: "inline-block",
          fontSize: 10,
          fontStyle: "bold",
          margin: "1em",
          width: 200,
        }}
      >
        <Select
          options={ilceOptions}
          onChange={handleIlceChange}
          value={selectedIlce}
        />
      </div>

      <h5>Mahalle Seçiniz: </h5>
      <div
        style={{
          color: "rgb(50,50,50)",
          display: "inline-block",
          fontSize: 10,
          fontStyle: "bold",
          margin: "1em",
          width: 200,
        }}
      >
        <Select
          options={mahalleOptions}
          onChange={handleMahalleChange}
          value={selectedMahalle}
        />
      </div>

      <hr />
      <button type="submit" onClick={handleSubmit}>
        Getir
      </button>
      <div>
        <h2>GeoJSON Data</h2>
        {geojsonData && <pre>{JSON.stringify(geojsonData, null, 2)}</pre>}
      </div>
    </div>
  );
}

export default App;
