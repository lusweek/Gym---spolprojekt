import React, {lazy} from "react";
import "./Home.module.css"
import LandingHome from "../LandingHome/LandingHome";
import HomeAbout from "../HomeAbout/HomeAbout";
import HomeGallery from "../HomeGallery/HomeGallery";
import HomePersonal from "../HomePersonal/HomePersonal";
import Arrow from "../ScrollArrow/Arrow"
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth } from "../../firebase-config";
import HomeOpenH from "../HomeOpenH/HomeOpenH";
// import {
//   LazyLoadImage,
//   LazyLoadComponent,
// } from "react-lazy-load-image-component";
// const HomeAbout = lazy(() => import("../HomeAbout/HomeAbout"));
// const HomeGallery = lazy(() => import("../HomeGallery/HomeGallery"));
// const HomePersonal = lazy(() => import("../HomePersonal/HomePersonal"));
// const Arrow = lazy(() => import("../ScrollArrow/Arrow"));
// const HomeOpenH = lazy(() => import("../HomeOpenH/HomeOpenH"));






const Homepage = () => {
 /* const [user, loading, error] = useAuthState(auth);
  console.log(user)
  
 if () {
  alert('Du är inloggad')
 }
*/


  return (
    <>
      <main id="home-section"
>
        <LandingHome />
        {/* <LazyLoadComponent> */}
          <Arrow />
        {/* </LazyLoadComponent> */}
        {/* <LazyLoadComponent> */}
          <HomeOpenH />
        {/* </LazyLoadComponent> */}
        {/* <LazyLoadComponent> */}
          <HomeAbout />
        {/* </LazyLoadComponent>
        <LazyLoadComponent> */}
          <HomeGallery />
        {/* </LazyLoadComponent>
        <LazyLoadComponent> */}
          <HomePersonal />
        {/* </LazyLoadComponent> */}
      </main>
    </>
  );
};

export default Homepage;


