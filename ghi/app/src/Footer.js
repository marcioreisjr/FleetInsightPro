import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitterSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-custom-color fixed-bottom small">
      <div className="d-flex justify-content-between">
        <div className="mx-3">
          Copywrite (c) 2023 by CarCar Innovation Software
        </div>
        <div></div>
        <div className="mx-2">
          Find us on:
          <span className="mx-2">
            <a href="https://www.facebook.com/">
              <FontAwesomeIcon icon={faFacebookSquare} />
            </a>
          </span>
          <span className="mx-2">
            <a href="https://twitter.com/">
              <FontAwesomeIcon icon={faTwitterSquare} />
            </a>
          </span>
          <span className="mx-2">
            <a href="https://www.instagram.com/">
              <FontAwesomeIcon icon={faInstagramSquare} />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
