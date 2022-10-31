import React from "react";
import style from "./HomePersonal.module.css";
import personal1 from "../../images/personal1.jpg";
import personal2 from "../../images/personal2.jpg";
import personal3 from "../../images/personal3.jpg";
import personal4 from "../../images/personal4.jpg";
import { Link } from "react-router-dom";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";

const HomePersonal = () => {
  return (
    <>
      <div className="Sportix-Section">
        <div className={style.HeaderPersonal}>
          <h3>Personal</h3>
          <p>
            Vi är ett team av mycket professionella personliga tränare och
            instruktörer med en mycket bred kunskap kring vad som blir bästa
            vägen fram för dig och för din hälsa.{" "}
          </p>
        </div>
        <div className={style.PersonalButtons}>         
         <LazyLoadComponent>
        <CustomLink to="/staff" state={{ from: "Ledning" }} >
  
              <button
                className={style.persona1}
                style={{
                  backgroundImage: `url(${personal1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className={style.pesonaltext}>
                  <p>Ledning</p>
                </div>
              </button>
              </CustomLink>

<CustomLink to="/staff" state={{ from: "Tränare" }} >
              <button
                className={style.persona2}
                style={{
                  backgroundImage: `url(${personal2})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p>Tränare</p>
              </button>

          </CustomLink>

<CustomLink to="/staff" state={{ from: "Reception" }} >
              <button
                className={style.persona3}
                style={{
                  backgroundImage: `url(${personal3})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p>Reception</p>
              </button>
              </CustomLink>
          <CustomLink to="/staff" state={{ from: "Instruktör" }} >

              <button
                className={style.persona4}
                style={{
                  backgroundImage: `url(${personal4})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p>Instruktörer</p>
              </button>

          </CustomLink>
            </LazyLoadComponent>

        </div>
      </div>
    </>
  );
};

export default HomePersonal;

function CustomLink({ to, ...props }) {
  return <Link to={to} {...props}></Link>;
}
