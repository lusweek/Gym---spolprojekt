import React, { useState, useEffect } from "react";
import style from "./Arrow.module.css";
import { FiArrowUp } from "@react-icons/all-files/fi/FiArrowUp";
export default function ScrollToTop() {
  const [Arrow, setArrow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setArrow(true);
      } else {
        setArrow(false);
      }
    });
  }, []);

  const scrollBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {Arrow && (
        <i className={style.Arrow} onClick={scrollBtn}>
          <FiArrowUp/>
        </i>
      )}
    </>
  );
}
