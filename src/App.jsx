import { useState, useEffect } from "react";
import "./App.css";
import Select from "react-select";
import Map from "./Map";

function App() {
  const [selectedIlce, setSelectedIlce] = useState(null); //ilce bilgisi tutan state
  const [selectedMahalle, setSelectedMahalle] = useState(null); //mahalle bilgisini tutan state
  const [geojsonData, setGeojsonData] = useState(null); //secilen ilce ve mahalle bilgilerini ekranda yazdirmak icin
  const [coordinateData, setCoordinateData] = useState([]); //ilce ve mahalleye gore api'den donen koordinat bilgilerini tutmak icin

  // ilce ve mahalle bilgileri. api istegine donusturulebilir ya da farkli bir json dosyasinda tutulup oradan import edilebilir.
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

  const fetchData = async () => {
    try {
      const startTime = new Date().getTime(); // api baslangic zamani

      // const ilceID = 1832;
      // const mahalleID = 11171;
      const url = `https://acikveri.buski.gov.tr:9016/acik/yesil/v1/tuketim/mahalle/aylik?ilceID=${selectedIlce.value}&mahalleID=${selectedMahalle.value}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Origin: "http://localhost:5173",
          Accept: "application/json",
        },
      });
      const endTime = new Date().getTime(); // api bitis zamani
      const duration = endTime - startTime; // kac saniyede apiden sonuc donuyo hesapla
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
      const startTime = new Date().getTime(); // api baslangic zamani

      const url = `https://acikyesil.bursa.bel.tr/geoserver/ckan/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ckan%3Abursa_mahallesinirlari&outputFormat=application%2Fjson&CQL_FILTER=uavt_kodu=${selectedMahalle.value}
      `;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Origin: "http://localhost:5173",
          Accept: "application/json",
        },
      });
      const endTime = new Date().getTime(); // api bitis zamani
      const duration = endTime - startTime; // kac saniyede apiden sonuc donuyo hesapla
      console.log(`API isteği tamamlandı. Süre: ${duration} ms`);
      const data = await response.json();
      console.log(data);
      // features dizisindeki her bir öğeyi (feature) üzerinde dön
      data.features.forEach((feature) => {
        console.log("Mahalle Adı:", feature.properties.ad);
        console.log("İlçe Adı:", feature.properties.ilce_adi);
        console.log("Kimlik Numarası:", feature.properties.kimlik_no);
        console.log("UAVT Kodu:", feature.properties.uavt_kodu);
        console.log("GeoJSON Koordinatları:");
        feature.geometry.coordinates.forEach((polygon) => {
          polygon.forEach((ring) => {
            ring.forEach((coordinate) => {
              console.log(coordinate[1], coordinate[0]);
              //gelen koordinat bilgisini coordinateData'ya at.
              // [1] ve [0] olmasinin sebebi bize koordinat bilgileri apiden
              // 28.9953492 , 40.23656992
              // olarak donuyor fakat gecerli bir konum olmasi (bkn: openstreetmap) icin
              // 40.23656992 , 28.9953492
              // olarak yer degistirilmesi gerekiyor.
              setCoordinateData((prevData) => [
                ...prevData,
                [coordinate[1], coordinate[0]],
              ]);
            });
          });
        });
        console.log("----------");
      });
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
    setCoordinateData([]); // Mahalle değiştiğinde koordinat bilgilerini sıfırla
  };

  //konsolda bilgileri gormek icin
  useEffect(() => {
    console.log("ilce:", selectedIlce);
  }, [selectedIlce]);
  useEffect(() => {
    console.log("mahalle:", selectedMahalle);
  }, [selectedMahalle]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kullanıcının girdiği değerlere göre veriyi çek
    // fetchData();
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

      <hr />
      {/* mapte gösterme kısmı */}
      <Map coordinateData={coordinateData} />
    </div>
  );
}

export default App;
