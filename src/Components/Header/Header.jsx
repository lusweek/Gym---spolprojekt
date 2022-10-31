import React from 'react'
import style from "./Header.module.css";
import MobileNavigation from "./MobileNavigation";


const Header = () => {
    return (
      <div className={style.HeaderGym}>
                <div className={style.HeadWrap}>
                    <h1>Sportix</h1>
                    <MobileNavigation />
                </div>
      </div>
    );
  };
  
  export default Header;
  