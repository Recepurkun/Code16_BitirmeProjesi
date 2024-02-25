import React from "react";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";

function Footer({ darkMode }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container">
      <footer className="py-3">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3 mt-3">
          <li className="nav-item">
            <a href="#sec" className="nav-link px-2">
              <h5 className={darkMode ? "text-white" : "text-black"}>Home</h5>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link px-2" href="#" target="blank">
              <h5 className={darkMode ? "text-white" : "text-black"}>About</h5>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link px-2 ${darkMode ? 'text-white' : 'text-black'}`}
              href="https://github.com/Recepurkun"
              target="blank"
            >
              <FaGithubSquare className="icon" />
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link px-2 ${darkMode ? 'text-white' : 'text-black'}`}
              href="https://www.linkedin.com/in/recepurkunn/"
              target="blank"
            >
              <FaLinkedin className="icon" />
            </a>
          </li>
        </ul>
        <p className="text-center">
          <b>© {currentYear} | Recep Ürkün tarafindan kodlanmıştır</b>
        </p>
      </footer>
    </div>
  );
}

export default Footer;
