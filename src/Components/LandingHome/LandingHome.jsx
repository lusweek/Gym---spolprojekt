import React from "react";
import style from "./LandingHome.module.css";
import gymDesktop from "../../images/desktop-img1.jpg";
import gymMobile from "../../images/phone-landing.jpg";

const LandingHome = () => {


  return (
    <>
        <div className={style.LandingPage}>
          <div className={style.gymImgDesktop}>
            <picture className={style.landingImage}>
              <source media="(min-width: 800px)" srcSet={gymDesktop}  />
              <img src={gymMobile} alt="landing-image"/>
            </picture>
          </div>
          <button className={style.landingButton} role="button">
            <h2>Bli medlem</h2>
            <h3>från 300:-/månad</h3>
          </button>
        </div>
    </>
  );
};

export default LandingHome;
