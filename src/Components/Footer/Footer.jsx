import React from "react";
import "./Footer.css";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { Link } from "react-router-dom";
import { LazyLoadComponent } from "react-lazy-load-image-component";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="wrapper">
          <CustomLink to="/">
            <div className="footer-sub-start" id="footer-link">
              <strong>Startsida</strong>
            </div>
          </CustomLink>
          <CustomLink to="/bookingpage">
            <div className="footer-sub-bok" id="footer-link">
              {" "}
              <strong>Boka pass</strong>
            </div>
          </CustomLink>
          <CustomLink to="/staff">
            <div className="footer-sub-persion" id="footer-link">
              {" "}
              <strong>Personal</strong>
            </div>
          </CustomLink>
          <CustomLink>
            <div className="footer-sub-web" id="footer-link">
              {" "}
              <strong>Webbshop</strong>{" "}
            </div>
          </CustomLink>
          <CustomLink>
            <div className="footer-sub-mina" id="footer-link">
              <strong>Mina Sidor</strong>
            </div>
          </CustomLink>
        </div>

        <section id="social-section">
          <div className="social">
            <strong className="footer-subheading">Följ oss!</strong>
            <div className="footer-icons">
              <FaFacebook className="footer-icon" />
              <FaInstagram className="footer-icon" />
              <FaTwitter className="footer-icon" />
              <FaLinkedin className="footer-icon" />
            </div>
          </div>

          <div className="contact">
            <div className="alt-location">
              <strong className="footer-subheading">Kontakta oss</strong>
            </div>
            <span className="footer-desc">
              <p>
                Telefon: 070-111 22 33 <br></br>
                E-post: info@sportix.se <br></br>
                Pusterviksgatan 3 <br></br>
                413 01 Göteborg <br></br>
              </p>
            </span>
          </div>
            <div className="contact">
              <strong className="footer-subheading">Öppettider</strong>
              <p className="footer-opening-hours">Måndag-söndag 07:00-21:00</p>
            </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;

function CustomLink({ to, ...props }) {
  return (
    <li>
      <Link to={to} {...props}></Link>
    </li>
  );
}
