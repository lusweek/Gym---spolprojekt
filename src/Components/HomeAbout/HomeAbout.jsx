import React from 'react'
import style from "./HomeAbout.module.css";
// import {  ImArrowRight } from "react-icons/im";
const HomeAbout = () => {
  return (
    <>
    
        <div className="Sportix-Section">
            <div className={style.desktopWrapper}>
            <div className={style.AboutInfo}>
                <h3>Om gymmet</h3>
                <p>Vårt gym & anläggning är inte som någon annan och vi gör allting för att din upplevelse ska bli så perfekt som möjligt. Vi prioriterar det som vi tror är viktigt för dig och för att du ska få ut mesta möjliga av ditt besök hos oss:</p>
            </div>
            <div className={style.AboutPerks}>
                <div className={style.perkOne}>
                    <div className={style.AboutBox}><p>Ett luftigt inrett gym centralt i Göteborg med allt du behöver.</p></div>
                </div>
                <div className={style.perkTwo}>
                    <div className={style.AboutBox}><p>Fullt utrustad med maskiner och övrig gymutrustning.</p></div>
                </div>
                <div className={style.perkThree}>
                    <div className={style.AboutBox}><p>En upplyftande och fräsch miljö som ger både energi och lugn</p></div>
                </div>
                <div className={style.perkFour}>

                    <div className={style.AboutBox}><p>Kompetent och hjälpsam personal som finns där för dig.</p></div>
                </div>
            </div>
            </div>
        </div>
    </>    
    );
  };
  
  export default HomeAbout;