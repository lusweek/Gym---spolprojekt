import React, { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate, Form } from "react-router-dom";
import { CartProvider } from "react-use-cart" 
import "react-calendar/dist/Calendar.css";
import Homepage from "./Components/Home/Homepage";
import Footer from "./Components/Footer/Footer";
import LoadingPage from "./LoadingPage/LoadingPage";
import Menu from "../src/Components/Navbar/components/Menu"
import Cart from "../src/Components/Webbshop/components/Cart"
import LoadingScreen from "./Components/loading_screen/LoadingScreen";
import { db } from './firebase-config'
import { collection, getDocs } from 'firebase/firestore'

const BookingPage = lazy(() => import("./booking_page/BookingPage"));
const Personal = lazy(() => import("./Components/Personal/Trainerspage"));
const MinaSidor = lazy(() => import("./mina_sidor_page/MinaSidor"));
const NotFound = lazy(() => import("./NotFound/NotFound"));
const ScrollToTop = lazy(() => import("./Components/ScrollToTop"));
const Webbshop = lazy(() => import("./Components/Webbshop/Webbshop"));
const AdminPage = lazy(() => import("./admin_page/AdminPage"));
//Routen till Admin ska ej finnas vid launch, är bara tillfällig.





function App() {
  const [openCart, setOpenCart] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  const updateAfterLogin = () => {
    setUser(JSON.parse(localStorage.getItem('user')))
    setTimeout(setImgDelay, 500)
  }


  const setImgDelay = () => {
    console.log(user);
  }

  useEffect(() => {
    if (!user) localStorage.removeItem('user')
  }, [])

  return (

    <>
      
    {/* <AdminPage /> */}
      <LoadingScreen />
      <CartProvider>
          <Menu setOpenCart={setOpenCart} />
        {openCart && (
        <Cart
         closeCart={setOpenCart}
        />
        )}
      <ScrollToTop>
        <Suspense fallback={<LoadingPage/>}>
          <Routes>
            <Route path="/gym" element={<Homepage />} />
            <Route path="/" element={<Navigate replace to="/gym" />} />
            <Route path="/bookingpage" element={<BookingPage />} />
            <Route path="/staff" element={<Personal />} />
            <Route path="/myprofile" element={<MinaSidor />} />
            <Route path="/webshop" element={<Webbshop />} />
            <Route path="/admin" element={<AdminPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ScrollToTop>
      <Footer />
      </CartProvider>
    </>
  );
}

export default App;
