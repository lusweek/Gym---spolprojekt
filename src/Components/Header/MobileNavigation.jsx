import React from "react";
import style from "./Header.module.css";
import NavLink from "./NavLinks";
import { useState } from "react";

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);
  const hamburgerIcon = (
    <div className={style.Hamburger}>
      <i className="fa-solid fa-bars fa-1x" onClick={() => setOpen(!open)}></i>
    </div>
  );
  const closeIcon = (
    <div className={style.Hamburger} onClick={() => setOpen(!open)}>
      <i class="fa-solid fa-xmark"></i>
    </div>
  );

  return (
    <nav className={style.MobileNavigation}>
      {open ? closeIcon : hamburgerIcon}

      {open && <NavLink />}
    </nav>
  );
};
export default MobileNavigation;