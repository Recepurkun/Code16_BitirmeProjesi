import React, { useState } from "react";
import Map from "./Map";
import KullaniciSecim from "./KullaniciSecim";

function AllWorks() {
  //muhtemelen 4 state yerine 2 state'de halledebilirim fakat şuan yorgunum
  const [selectedIlce, setSelectedIlce] = useState(""); //ilce bilgisi tutan state
  const [selectedMahalle, setSelectedMahalle] = useState(""); //mahalle bilgisini tutan state
  const [ilceAdi, setIlceAdi] = useState(""); //string tipte secilen ilce adi
  const [mahalleAdi, setMahalleAdi] = useState(""); //string tipte secilen mahalle adi
  const [geojsonData, setGeojsonData] = useState(null); //secilen ilce ve mahalle bilgilerini ekranda yazdirmak icin
  const [coordinateData, setCoordinateData] = useState([]); //ilce ve mahalleye gore api'den donen koordinat bilgilerini tutmak icin

  // ilçe ve mahalle bilgileri. API isteğine dönüştürülebilir veya farklı bir JSON dosyasında tutulup oradan import edilebilir.
  const ilceler = [
    { value: "1832", label: "Osmangazi" },
    { value: "1829", label: "Nilüfer" },
    { value: "1859", label: "Yıldırım" },
  ];

  const mahalleler = [
    { ilceValue: "1832", value: 11155, label: "Adalet Mahallesi" },
    { ilceValue: "1832", value: 183473, label: "Ahmetbey Mahallesi" },
    { ilceValue: "1829", value: 140338, label: "19 Mayıs Mahallesi" },
    { ilceValue: "1829", value: 140334, label: "23 Nisan Mahallesi" },
    { ilceValue: "1859", value: 11274, label: "152 Evler Mahallesi" },
    { ilceValue: "1859", value: 11324, label: "75. Yıl Mahallesi" },
  ];

  const fetchData = async () => {
    try {
      const startTime = new Date().getTime(); // api baslangic zamani

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
      setGeojsonData(data); //ekrana yazdirmak için
    } catch (error) {
      console.error("Error fetching GeoJSON data:", error);
    }
  };

  const fetchLocationData = async () => {
    try {
      const startTime = new Date().getTime(); // api baslangic zamani

      const url = `https://acikyesil.bursa.bel.tr/geoserver/ckan/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ckan%3Abursa_mahallesinirlari&outputFormat=application%2Fjson&CQL_FILTER=uavt_kodu=${selectedMahalle}
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
      // features dizisindeki her bir öğeyi (feature) üzerinde dön
      data.features.forEach((feature) => {
        setIlceAdi(feature.properties.ilce_adi);
        setMahalleAdi(feature.properties.ad);
        // console.log("Kimlik Numarası:", feature.properties.kimlik_no);
        // console.log("UAVT Kodu:", feature.properties.uavt_kodu);
        // console.log("GeoJSON Koordinatları:");
        feature.geometry.coordinates.forEach((polygon) => {
          polygon.forEach((ring) => {
            ring.forEach((coordinate) => {
              // console.log(coordinate[1], coordinate[0]);
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
      });
    } catch (error) {
      console.error("Error fetching GeoJSON data:", error);
    }
  };

  const handleIlceChange = (e) => {
    const selectedIlceValue = e.target.value;
    setSelectedIlce(selectedIlceValue);
    setIlceAdi(
      ilceler.find((ilce) => ilce.value === selectedIlceValue)?.label || ""
    );
    setSelectedMahalle(""); // İlçe değiştiğinde mahalle seçimini sıfırla
    setGeojsonData(null); // İlçe değiştiğinde GeoJSON verisini sıfırla
  };

  const handleMahalleChange = (e) => {
    const selectedMahalleValue = e.target.value;
    setSelectedMahalle(selectedMahalleValue);
    setMahalleAdi(
      mahalleler.find((mahalle) => mahalle.value === selectedMahalleValue)
        ?.label || ""
    );
    setGeojsonData(null); // Mahalle değiştiğinde GeoJSON verisini sıfırla
    setCoordinateData([]); // Mahalle değiştiğinde koordinat bilgilerini sıfırla
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kullanıcının girdiği değerlere göre veriyi çek
    //fetchData();
    fetchLocationData();
  };

  return (
    <div className="mt-5">
      <KullaniciSecim
        ilceler={ilceler}
        mahalleler={mahalleler}
        selectedIlce={selectedIlce}
        selectedMahalle={selectedMahalle}
        handleIlceChange={handleIlceChange}
        handleMahalleChange={handleMahalleChange}
        handleSubmit={handleSubmit}
      />

      {/* <div>
        <h2>GeoJSON Data</h2>
        {geojsonData && <pre>{JSON.stringify(geojsonData, null, 2)}</pre>}
      </div> */}

      <hr />
      {/* Map'te gösterme kısmı */}
      <Map
        coordinateData={coordinateData}
        ilceAdi={ilceAdi}
        mahalleAdi={mahalleAdi}
        selectedIlce={selectedIlce}
        selectedMahalle={selectedMahalle}
      />
    </div>
  );
}

export default AllWorks;
