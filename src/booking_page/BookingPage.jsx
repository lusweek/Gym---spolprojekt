import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./bookingPage.css";
import "../admin_page/AdminPage.css";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";
import CheckModal from "./CheckModal";
// import { BsFillPencilFill } from "react-icons/bs";
import Update_modal_pass from "./Update_modal_pass";
import openLoadingModal from "../Components/loading_screen/OpenLoadingModal";
import closeLoadingModal from "../Components/loading_screen/CloseLoadingModal";
import UpdateLocalStorage from "../functions/UpdateLocalStorage";
import { async } from "@firebase/util";
import { reload } from "firebase/auth";

function BookingPage() {

  const [passKategorier, setPassKategorier] = useState();
  const [maxAntal_STYLE, setmaxAntal_STYLE] = useState({});

  const [date, setDate] = useState(new Date());
  const [passDenDagen, setPassDenDagen] = useState([]);

  // SÄTTER inloggaUser. DENNA KOMMER UPPDATERAS
  const [inloggadUser, setInloggadUser] = useState(JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : "");


  const ref = useRef(null);


  // START: HÄMTAR PASS

  const passCollectionRef = collection(db, "pass");
  const [pass, setPass] = useState([]);

  const getPass = async () => {
    openLoadingModal();
    const data = await getDocs(passCollectionRef);
    setPass(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    closeLoadingModal();
  };

  // HÄMTAR PASS FÖRSTA GÅNGEN
  const getStaffFirstTime = async () => {
    const data = await getDocs(passCollectionRef);
    setPass(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getStaffFirstTime();
  }, []);

  // END: HÄMTAR PASS


  // START: HÄMTAR PROFILER

  const profilerCollectionRef = collection(db, "profiler");
  const [profiler, setProfiler] = useState([]);

  useEffect(() => {
    const getProfiler = async () => {
      const data = await getDocs(profilerCollectionRef);
      setProfiler(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProfiler();
  }, []);

  // END: HÄMTAR PROFILER

  const bookPass = async (passId, platser) => {

    openLoadingModal();

    // LÄGGER IN PASSET TILL PROFILEN
    const inloggadId = inloggadUser.id;

    const tidigarePass = inloggadUser.bokadePass ? inloggadUser.bokadePass : null

    console.log('tidigarePass: ', tidigarePass);

    const newPassLista = [];

    if (tidigarePass === null || tidigarePass.length === 0) {
      newPassLista.push(passId);
    } 
    
    else if (tidigarePass.length !== 0) {
      tidigarePass.map((item, index) => {
        newPassLista.push(item);
      });
      newPassLista.push(passId);
    } 


    const passDoc = doc(db, "profiler", inloggadId);
    const newFields = { bokadePass: newPassLista };
    await updateDoc(passDoc, newFields);

    UpdateLocalStorage(inloggadUser.id);

    // LÄGGER TILL +1 TILL PASSET.PLATSER

    let newPlatser = 0;

    if (!platser) {
      newPlatser = 1;
    } else if (platser) {
      newPlatser = platser + 1;
    }


    const staffDoc = doc(db, "pass", passId);
    const newFieldsPass = { platser: Number(newPlatser) };
    await updateDoc(staffDoc, newFieldsPass);

    closeLoadingModal();

    document.querySelector("#check-modal").style.display = "flex";
  };

  // BOKA-KNAPPEN

  const handleBokaBtn = async (passId, platser) => {

    if (!inloggadUser) window.location.href = "/myprofile";
    else {

      let x = 0;

      if (!inloggadUser.bokadePass) {
        console.log('ne 1 körs');
        bookPass(passId, platser);
        x = 1
      } else if (inloggadUser.bokadePass.length !== 0) {
        console.log('nr 2 körs');
        inloggadUser.bokadePass.map((item) => {
          if (passId == item) {
        console.log('nr 3 körs');
            avbokaPass(passId, platser);
          } else {
        console.log('nr 4 körs');
            bookPass(passId, platser);
            x = 1;
          }
        })
      } else if (x === 0) {
        console.log('nr 5 körs');
        bookPass(passId, platser);
      }
    };
  }

// START: SORTERA PASSEN

  // PER DAG
  const sortPassDay = (e) => {
    const filteredPass = pass.filter((pass) => {
      return pass.dag == e;
    });
    setPassDenDagen(filteredPass);
    // scrollToPass();
  };

  // PER KATEGORI
  const sortKategories = (selectedKategori) => {
    const filteredKategoryPass = pass.filter((pass) => {
      return pass.kategori == selectedKategori;
    });
    setPassDenDagen(filteredKategoryPass);
    // scrollToPass();
    setPassKategorier(selectedKategori);

  };

// END: SORTERA PASSEN

  const addBokadToPassDenDagen = () => {

    passDenDagen.map((pass) => { 

    });
  };

  useEffect(() => {
    if (passDenDagen !== 0 || !passDenDagen) {
      addBokadToPassDenDagen();
    }
  }, []);


  // START: AVBOKA PASS

  const avbokaPass = async (passId, passPlatser) => {

    let newBokadePass = [];

    inloggadUser.bokadePass.find((item) => {
      if (passId == item) {
      } else {
        newBokadePass.push(item);
      }
    });

    // UPPDATERAR DATA PROFILER
    const profulerDoc = doc(db, "profiler", inloggadUser.id);
    const newFields = { bokadePass: newBokadePass };
    await updateDoc(profulerDoc, newFields);

    UpdateLocalStorage(inloggadUser.id);

    passPlatser--;

    // UPPDATERAR DATA PASS
    const passfDoc = doc(db, "pass", passId);
    const newFields2 = { platser: passPlatser };
    await updateDoc(passfDoc, newFields2);

    document.querySelector("#check-modal").style.display = "flex";


  };

  // END: AVBOKA PASS

  // SCROLL FUNCTION
  const scrollToPass = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  
  return (
    <>
      <article className="booking-page-container" id="top-section">
        <div className="booking-page-header-desktop">
          <h1>Boka Pass</h1>
        </div>
        <div className="booking-content">
          <section className="Sportix-Section" id="calender-flex">
            <div className="booking-page-header-mobile">
              <h3>Kalender</h3>
            </div>
            <Calendar
              onChange={setDate}
              value={date}
              onClickDay={sortPassDay}
            />
          </section>

          <section className="Sportix-Section" id="mobile-style">
            <div className="booking-page-header-mobile">
              {" "}
              <h3>Pass</h3>{" "}
            </div>
            <div className="blue-wrapper">
              <select
                className="drop-down"
                name="välj pass"
                onChange={(e) => sortKategories(e.target.value)}
              >
                <option value="null">Välj pass</option>
                <option value="kondition">Kondition</option>
                <option value="styrka">Styrka</option>
                <option value="flexebilitet">Flexebilitet</option>
                <option value="crossfit">Crossfit</option>
              </select>

              {passDenDagen.map((pass, index) => {
                let btn_text = "Boka";
                let bokadText = "bokat!";
                // let FULLBOKAT_NONE = {display: 'none'}
                // let FULLBOKAT_BLOCK = {display: 'block'}

                if (inloggadUser.bokadePass) {
                  inloggadUser.bokadePass.map((item) => {
                    if (pass.id === item) {
                      btn_text = "Avboka";
                      bokadText = "avbokat";
                    }

                    // if (pass.platser == pass.maxAntal && pass.id === item) {
                    //   console.log(pass.aktivitet, pass, item);
                    //   FULLBOKAT_NONE = {display: 'block'}
                    //   FULLBOKAT_BLOCK = {display: 'none'}
                    // }
                  });
                }

                return (
                  <>
                    <CheckModal bokadText={bokadText} />
                    <div key={index} className="pass-card center" ref={ref}>
                      <h2
                        className="booking-antal"
                        style={
                          pass.platser == pass.maxAntal
                            ? { color: "#ff6161" }
                            : { color: "white" }
                        }
                      >
                        {!pass.platser ? 0 : pass.platser}/{pass.maxAntal}
                      </h2>
                      <img
                        clasName="booking-icon"
                        src={require("./" + pass.kategori + ".png")}
                        alt="no img"
                        height="40px"
                        width="30px"
                      />
                      <div key={Math.random()} className="aktv-tid-div">
                        <h1>{pass.aktivitet}</h1>
                        <p>
                          {pass.dayString}, {pass.dateString} {pass.monthString}{" "}
                          <br />
                          {pass.tid}
                        </p>
                      </div>
                      <h2>{pass.instruktör}</h2>

                      <button
                        // style={FULLBOKAT_BLOCK}
                        class="myButton booking-btn"
                        onClick={() => handleBokaBtn(pass.id, pass.platser)}
                      >
                        {btn_text}
                      </button>

                      {/* <button
                        style={FULLBOKAT_NONE}
                        class="myButton booking-btn">
                        Full
                      </button> */}
                    </div>
                  </>
                );
              })}
            </div>
          </section>
        </div>
      </article>
    </>
  );
}

export default BookingPage;
