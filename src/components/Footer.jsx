import React from "react";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container">
      <footer className="py-3">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="#sec" className="nav-link px-2 text-body-secondary">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link px-2 text-dark icon-link-hover"
              href="#"
              target="blank"
            >
              About
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link px-2 text-dark icon-link-hover"
              href="https://github.com/Recepurkun"
              target="blank"
            >
              <FaGithubSquare className="icon" />
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link px-2 text-primary"
              href="https://www.linkedin.com/in/recepurkunn/"
              target="blank"
            >
              <FaLinkedin className="icon" />
            </a>
          </li>
        </ul>
        <p className="text-center text-body-secondary">
          © {currentYear} Urkun Company, Inc
        </p>
      </footer>
    </div>
  );
}

export default Footer;
