import React from "react";
import { FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";

function Navbar({ toggleDarkMode, darkMode }) {
  return (
    <nav className="align-items-center d-flex justify-content-evenly  text-center">
      <img src="src/assets/logo.png" alt="" height="30" className="mx-3" />
      <span
        className="me-auto d-flex justify-content-center m-3"
        style={{ fontWeight: 700, fontSize: 26 }}
      >
        Bursa Su Tüketimi
      </span>
      <button className="btn btn-warning btn-sm mx-3" onClick={toggleDarkMode}>
        {darkMode ? <IoMdSunny /> : <FaMoon />}
      </button>
    </nav>
  );
}

export default Navbar;
