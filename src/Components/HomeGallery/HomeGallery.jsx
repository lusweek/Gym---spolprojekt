import React, { useState } from "react";
import style from "./HomeGallery.module.css";
import { imgs } from "./GalleryImgs";
import { MdArrowBack } from "@react-icons/all-files/md/MdArrowBack";
import { MdArrowForward } from "@react-icons/all-files/md/MdArrowForward";
import { transform } from "framer-motion";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";

const HomeGallery = () => {
  const [sliderData, setSliderData] = useState(imgs[0]);

  const handleClick = (index) => {
    console.log(index);
    const slider = imgs[index];
    setSliderData(slider);
  };
  const PrevBtn = () => {
    if (sliderData.id == 0) {
      const lastImg = imgs[5];
      setSliderData(lastImg);
    } else {
      const nextImg = imgs[sliderData.id - 1];
      setSliderData(nextImg);
    }
  };
  const NextBtn = () => {
    if (sliderData.id == 5) {
      const firstImg = imgs[0];
      setSliderData(firstImg);
    } else {
      const prevImg = imgs[sliderData.id + 1];
      setSliderData(prevImg);
    }
  };
  return (
    <>
      <div className={style.GallerySection}>
        <div className={style.GalleryInfo}>
          <h3>Galleri</h3>
          <p>Kolla in bilder på våra lokaler och vår utrustning!</p>
        </div>
        <div className={style.galleryImg}>
          <div onClick={PrevBtn} className={style.prevBtn}>
  
              <MdArrowBack />

          </div>

          <LazyLoadImage
            src={sliderData.value}
            alt={sliderData.value}
            height="300vh"
            width="100%"
          />

          <div onClick={NextBtn} className={style.nextBtn}>
            {/* <LazyLoadComponent> */}
              <MdArrowForward />
 
          </div> 
        </div>
        <div className={style.flexrow}>
          {imgs.map((data, i) => (
            <div
              className={
                data === sliderData ? style.selectedImg : style.nonSelected
              }
            >
              <LazyLoadImage
                alt={data.value}
                key={data.id}
                src={data.value}
                onClick={() => handleClick(i)}
                height="55vh"
                width="80vw"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeGallery;
