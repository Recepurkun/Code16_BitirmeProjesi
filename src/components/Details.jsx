import React from "react";
import "./card.css";
import waterLogo from "../assets/water.svg";
import waterLogo2 from "../assets/water2.svg";
import { FaHandHoldingWater } from "react-icons/fa";

const formatDonem = (donem) => {
  return donem.toString().replace(/(\d{4})(\d{2})/, "$2/$1");
};

function Details({ monthlyData }) {
  console.log(monthlyData);

  return (
    <>
      {monthlyData && (
        <div>
          <h3>Aylik Veriler</h3>
          <div className="d-flex flex-wrap align-items-center justify-content-center m-2 p-4">
            {monthlyData &&
              monthlyData.map((veri, index) => (
                <div className="card m-2" key={index}>
                  <div className="card-img" style={{ height: 40 }}>
                    <FaHandHoldingWater className="icon m-2" />
                  </div>
                  <div className="card-info">
                    <p className="text-title">{veri.mahalle + "Sİ"} </p>
                    <p className="text-body">
                      {`Dönem: ${formatDonem(veri.donem)}`}{" "}
                    </p>
                    <p className="text-body">
                      Abone sayisi: {veri.aboneSayisi}
                    </p>
                  </div>
                  <div className="card-footer">
                    <span className="text-body">
                      Tüketim:{" "}
                      <b>
                        <i>{veri.tuketim}</i>
                      </b>
                      <br />
                      <b>Ton</b>
                    </span>
                    <div className="card-button" style={{ height: 32 }}>
                      <img src={waterLogo} className="logo" alt="water logo" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Details;
