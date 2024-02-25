import React, { useState } from "react";
import Map from "./Map";
import KullaniciSecim from "./KullaniciSecim";

function AllWorks() {
  //muhtemelen 4 state yerine 2 state'de halledebilirim
  const [selectedIlce, setSelectedIlce] = useState(""); //ilce bilgisi tutan state
  const [selectedMahalle, setSelectedMahalle] = useState(""); //mahalle bilgisini tutan state
  const [ilceAdi, setIlceAdi] = useState(""); //string tipte secilen ilce adi
  const [mahalleAdi, setMahalleAdi] = useState(""); //string tipte secilen mahalle adi
  const [monthlyData, setMonthlyData] = useState(null); //secilen ilce ve mahalle bilgilerini ekranda yazdirmak icin
  const [yearlyData, setYearlyData] = useState(null); //yillik verileri tutmak icin
  const [coordinateData, setCoordinateData] = useState([]); //ilce ve mahalleye gore api'den donen koordinat bilgilerini tutmak icin

  // ilçe ve mahalle bilgileri. API isteğine dönüştürülebilir veya farklı bir JSON dosyasında tutulup oradan import edilebilir.
  const ilceler = [
    { value: "1832", label: "Osmangazi" },
    { value: "1829", label: "Nilüfer" },
    { value: "1859", label: "Yıldırım" },
    { value: "1530", label: "Mudanya" },
  ];

  const mahalleler = [
    { ilceValue: "1832", value: 11165, label: "Altinova Mahallesi" },
    { ilceValue: "1832", value: 11170, label: "Bahar Mahallesi" },
    { ilceValue: "1832", value: 11171, label: "Başaran Mahallesi" },
    { ilceValue: "1829", value: 140338, label: "19 Mayıs Mahallesi" },
    { ilceValue: "1829", value: 140334, label: "23 Nisan Mahallesi" },
    { ilceValue: "1829", value: 11135, label: "Beşevler Mahallesi" },
    { ilceValue: "1859", value: 11274, label: "152 Evler Mahallesi" },
    { ilceValue: "1859", value: 11324, label: "75. Yıl Mahallesi" },
    { ilceValue: "1859", value: 11318, label: "Arabayatağı Mahallesi" },
    { ilceValue: "1530", value: 184223, label: "Tirilye Mahallesi" },
    { ilceValue: "1530", value: 184251, label: "Kumyaka Mahallesi" },
    { ilceValue: "1530", value: 20001, label: "Halitpaşa Mahallesi" },
  ];

  const fetchMonthlyData = async () => {
    try {
      // const url = `https://acikveri.buski.gov.tr:9016/acik/yesil/v1/tuketim/mahalle/aylik?ilceID=${selectedIlce}&mahalleID=${selectedMahalle}`;

      const url = `https://cors-anywhere.herokuapp.com/https://acikveri.buski.gov.tr:9016/acik/yesil/v1/tuketim/mahalle/aylik?ilceID=${selectedIlce}&mahalleID=${selectedMahalle}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Origin: "http://localhost:5173",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setMonthlyData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchYearlyData = async () => {
    try {
      // const url = `https://acikveri.buski.gov.tr:9016/acik/yesil/v1/tuketim/mahalle/yillik?ilceID=${selectedIlce}&mahalleID=${selectedMahalle}`;
      const url = `https://cors-anywhere.herokuapp.com/https://acikveri.buski.gov.tr:9016/acik/yesil/v1/tuketim/mahalle/yillik?ilceID=${selectedIlce}&mahalleID=${selectedMahalle}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          origin: "http://localhost:5173",
          accept: "application/json",
        },
      });
      const data = await response.json();
      setYearlyData(data);
    } catch (error) {
    }
  };

  const fetchLocationData = async () => {
    try {
      const url = `https://acikyesil.bursa.bel.tr/geoserver/ckan/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ckan%3Abursa_mahallesinirlari&outputFormat=application%2Fjson&CQL_FILTER=uavt_kodu=${selectedMahalle}
      `;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Origin: "http://localhost:5173",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      data.features.forEach((feature) => {
        setIlceAdi(feature.properties.ilce_adi);
        setMahalleAdi(feature.properties.ad);
        feature.geometry.coordinates.forEach((polygon) => {
          polygon.forEach((ring) => {
            ring.forEach((coordinate) => {
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
    setMonthlyData(null); // İlçe değiştiğinde GeoJSON verisini sıfırla
  };

  const handleMahalleChange = (e) => {
    const selectedMahalleValue = e.target.value;
    setSelectedMahalle(selectedMahalleValue);
    setMahalleAdi(
      mahalleler.find((mahalle) => mahalle.value === selectedMahalleValue)
        ?.label || ""
    );
    setMonthlyData(null); // Mahalle değiştiğinde GeoJSON verisini sıfırla
    setCoordinateData([]); // Mahalle değiştiğinde koordinat bilgilerini sıfırla
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kullanıcının girdiği değerlere göre veriyi çek
    fetchMonthlyData();
    fetchYearlyData();
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

      {/* Map'te gösterme kısmı */}
      <Map
        coordinateData={coordinateData}
        ilceAdi={ilceAdi}
        mahalleAdi={mahalleAdi}
        monthlyData={monthlyData}
        yearlyData={yearlyData}
      />
    </div>
  );
}

export default AllWorks;
