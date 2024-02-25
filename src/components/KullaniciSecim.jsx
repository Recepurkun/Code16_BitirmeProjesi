import React from "react";

function KullaniciSecim({
  ilceler,
  mahalleler,
  selectedIlce,
  selectedMahalle,
  handleIlceChange,
  handleMahalleChange,
  handleSubmit,
}) {
  return (
    <div>
      <div className="d-flex justify-content-center text-center">
        <div className="row" style={{ width: 500 }}>
          <div className="col">
            <h5>İlçe Seçiniz: </h5>
            <select
              className="form-select form-select-lg shadow-lg"
              onChange={handleIlceChange}
              value={selectedIlce}
            >
              <option value="">İlçe Seçiniz</option>
              {ilceler.map((ilce) => (
                <option key={ilce.value} value={ilce.value}>
                  {ilce.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <h5>Mahalle Seçiniz: </h5>
            <select
              className="form-select form-select-lg shadow-lg"
              onChange={handleMahalleChange}
              value={selectedMahalle}
            >
              <option value="">Mahalle Seçiniz</option>
              {mahalleler
                .filter((mahalle) => mahalle.ilceValue === selectedIlce)
                .map((mahalle) => (
                  <option key={mahalle.value} value={mahalle.value}>
                    {mahalle.label}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div className="m-4">
        <button
          className="btn btn-success btn-lg shadow-md"
          type="submit"
          onClick={handleSubmit}
        >
          Getir
        </button>
      </div>
    </div>
  );
}

export default KullaniciSecim;
