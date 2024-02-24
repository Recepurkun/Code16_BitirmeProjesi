import React from "react";
import { FaMoon } from "react-icons/fa";

function Navbar({ toggleDarkMode }) {
  return (
    <nav className="align-items-center d-flex justify-content-evenly">
        <img src="./src/assets/logo.png" alt="" height="30" className="mx-3" />
        <h2 className="me-auto" style={{fontWeight:700}}>Veri Gösterici</h2>
        <button className="btn btn-warning btn-sm" onClick={toggleDarkMode}>
          <FaMoon />
        </button>
    </nav>
  );
}

export default Navbar;
