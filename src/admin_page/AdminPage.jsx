import React from "react";
import "./AdminPage.css";
import { useState, useEffect } from "react";
import Update_modal_Staff from "./Update_modal_Staff";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { FaPencilAlt } from "@react-icons/all-files/fa/FaPencilAlt";
import Update_modal_product from "./Update_modal_product";
import Calendar from "react-calendar";
import openLoadingModal from "../Components/loading_screen/OpenLoadingModal";
import closeLoadingModal from "../Components/loading_screen/CloseLoadingModal";
import Update_modal_pass from "../booking_page/Update_modal_pass";
import bace_icon from "../booking_page/styrka.png";

function AdminPage() {
  // TILL ANSTÄLLDA
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newText, setNewText] = useState("");
  const [newStaffCategory, setStaffCategory] = useState("");
  const [level, setLevel] = useState(0);

  const staffCollectionRef = collection(db, "staff");
  const [staff, setStaff] = useState([]);

  // TILL PRODUKTER
  const [IMG_SRC_produkt, setIMG_SRC_produkt] = useState("");
  const [kategori, setKategori] = useState("");
  const [price, setPris] = useState(0);
  const [produktNamn, setProduktNamn] = useState("");
  const [orderSize, setOrderSize] = useState("S,M,L,XL");

  const [productBrand, setproductBrand] = useState("");
  const [productColor, setproductColor] = useState("");
  const [productshortDesc, setproductshortDesc] = useState("");

  const produkterCollectionRef = collection(db, "produkter");
  const [produkter, setProdukter] = useState([]);

  // TILL PASS
  const [IMG_SRC_pass, setIMG_SRC_pass] = useState("");
  const [aktivitet, setAktivitet] = useState("");
  const [instruktör, setInstruktör] = useState("");
  const [maxAntal, setMaxAntal] = useState(0);
  const [tid, setTid] = useState("");
  const [date, setDate] = useState("");
  const [passKategori, setPassKategori] = useState("");

  const [dayString, setDayString] = useState("");
  const [monthString, setMonthString] = useState("");
  const [dateString, setDateString] = useState(0);

  const passCollectionRef = collection(db, "pass");
  const [pass, setPass] = useState([]);

  // HÄMTAR DATA
  // HÄMTAR ANSTÄLLDA

  const getStaff = async () => {
    const data = await getDocs(staffCollectionRef);
    setStaff(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setAllStaff(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getStaff();
  }, []);

  // HÄMTAR PRODUKTER

  const getProdukter = async () => {
    const data = await getDocs(produkterCollectionRef);
    setProdukter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setAllProdukter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPass();
    getProdukter();
  }, []);

  const getPass = async () => {
    const data = await getDocs(passCollectionRef);
    setPass(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setAllPass(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // BILD PRODUKTER
  function previewImageProdukt() {
    const file = document.getElementById("file-produkt").files;

    if (file.length > 0) {
      let fileReader = new FileReader();
      fileReader.onload = function (event) {
        document
          .getElementById("preview-produkt")
          .setAttribute("src", event.target.result);
        setIMG_SRC_produkt(event.target.result);
      };

      fileReader.readAsDataURL(file[0]);
    }
  }

  // LÄGGER TILL DATA
  // ANSTÄLLDA

    // LÄGG TILL KATEGORI
 
  const createStaff = async () => {
    openLoadingModal();
    await addDoc(staffCollectionRef, {
      name: newName,
      age: Number(newAge),
      img: IMG_SRC,
      text: newText,
      kategori: newStaffCategory,
      level: Number(level),
    });
    clearFields();
    getStaff();
    closeLoadingModal();
  };

  // PRODUKTER
  const createProduct = async () => {
    openLoadingModal();
    await addDoc(produkterCollectionRef, {
      img: IMG_SRC_produkt,
      kategori: kategori,
      price: Number(price),
      produktNamn: produktNamn,
      type: kategori,
      brand: productBrand,
      shortDesc: productshortDesc,
      color: productColor,
      orderSise: orderSize,
    });

    getProdukter();
    clearFields();
    closeLoadingModal();
  };

  // PASS
  const createPass = async () => {
    openLoadingModal();
    await addDoc(passCollectionRef, {
      aktivitet: aktivitet,
      kategori: passKategori,
      dag: String(date),
      instruktör: instruktör,
      maxAntal: Number(maxAntal),
      tid: tid,
      dayString: dayString,
      monthString: monthString,
      dateString: dateString,
    });
    clearFields();
    getPass();
    alert("Pass tillagt!");
    closeLoadingModal();
  };

  // RADERAR DATA
  // PRODUKTER
  const deleteProdukter = async (id, DBcollextion) => {
    if (window.confirm("Radera?")) {
      openLoadingModal();
      const staffDoc = doc(db, DBcollextion, id);
      await deleteDoc(staffDoc);
      getProdukter();
      closeLoadingModal();
    }
  };

  // STAFF
  const deleteStaff = async (id, DBcollextion) => {
    if (window.confirm("Radera?")) {
      openLoadingModal();
      const staffDoc = doc(db, DBcollextion, id);
      await deleteDoc(staffDoc);
      getStaff();
      closeLoadingModal();
    }
  };

  // PASS
  const deletePass = async (id, DBcollextion) => {
    if (window.confirm("Radera pass?")) {
      openLoadingModal();
      const staffDoc = doc(db, DBcollextion, id);
      await deleteDoc(staffDoc);
      getPass();
      closeLoadingModal();
    }
  };

  //

  // FIXAR DAGARNA TILL VARJE PASS

  const fixDays = (e) => {
    const date1 = new Date(e);
    const timestamp = date1.getTime();
    const dateTimestamp = new Date(timestamp);
    setDateString(dateTimestamp.getDate());
    setDate(e);

    let day = "";

    switch (dateTimestamp.getDay()) {
      case 0:
        day = "Söndag";
        break;
      case 1:
        day = "Måndag";
        break;
      case 2:
        day = "Tisdag";
        break;
      case 3:
        day = "Onsdag";
        break;
      case 4:
        day = "Torsdag";
        break;
      case 5:
        day = "Fredag";
        break;
      case 6:
        day = "Lördag";
        break;
    }

    setDayString(day);

    let month = "";

    switch (dateTimestamp.getMonth()) {
      case 0:
        month = "Januari";
        break;
      case 1:
        month = "Februari";
        break;
      case 2:
        month = "Mars";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "Maj";
        break;
      case 5:
        month = "Juni";
        break;
      case 6:
        month = "Juli";
        break;
      case 7:
        month = "Agusti";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "Oktober";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
        break;
    }

    setMonthString(month);
  };

  // -----------

  const clearFields = () => {
    const allInputs = document.querySelectorAll(".input");
    for (let i = 0; i < allInputs.length; i++) {
      allInputs[i].value = "";
    }

    const allSelected = document.querySelectorAll(".input-select");
    for (let i = 0; i < allSelected.length; i++) {
      allSelected[i].selectedIndex = 0;
    }

    const allImages = document.querySelectorAll(".input-img");
    for (let i = 0; i < allImages.length; i++) {
      allImages[i].src = "";
    }

    document.querySelector("#staff-input-1").value = "";
    document.querySelector("#staff-input-2").value = "";
    document.querySelector("#staff-input-3").value = "";
  };

  const openUpdateModal = (id) => {
    document.querySelector(`#update-modal-${id}`).style.display = "flex";
  };

  const openProductUpdateModal = (id) => {
    document.querySelector(`#update-modal-${id}`).style.display = "flex";
  };

  const openUpdateModalPass = (id) => {
    document.querySelector(`#update-modal-${id}`).style.display = "flex";
  };

  // BILD ANSTÄLLDA
  const [IMG_SRC, setIMG_SRC] = useState("");

  function previewImage() {
    let file = document.getElementById("file").files;

    if (file.length > 0) {
      let fileReader = new FileReader();
      fileReader.onload = function (event) {
        document
          .getElementById("preview")
          .setAttribute("src", event.target.result);
        setIMG_SRC(event.target.result);
      };

      fileReader.readAsDataURL(file[0]);
    }
  }

  // SÖKFUNKTION PASS

  const [allPass, setAllPass] = useState();
  const [prevTextLenthPass, setPrevTextLenthPass] = useState(-1);

  const searchPass = (text) => {
    const e = text.toLowerCase();

    setPrevTextLenthPass((prevCount) => prevCount + 1);

    const passNames = pass.map((item) => item.aktivitet.toLowerCase());

    let filteredPass = [];

    passNames.map((item, index) => {
      if (item.includes(e) === true) {
        filteredPass.push(pass[index]);
      }
    });

    if (prevTextLenthPass == text.length) {
      document.querySelector("#serchIdPass").value = "";
      setPrevTextLenthPass(-1);
      setPass(allPass);
    } else {
      setPass(filteredPass);
    }
  };

  // SÖKFUNKTION PRODUKTER

  const [allProdukter, setAllProdukter] = useState();
  const [prevTextLenthProdukter, setPrevTextLenthProdukter] = useState(-1);

  const searchProdukter = (text) => {
    const e = text.toLowerCase();

    setPrevTextLenthProdukter((prevCount) => prevCount + 1);

    const produkterNames = produkter.map((item) =>
      item.produktNamn.toLowerCase()
    );

    let filteredProdukter = [];

    produkterNames.map((item, index) => {
      if (item.includes(e) === true) {
        filteredProdukter.push(produkter[index]);
      }
    });

    if (prevTextLenthProdukter == text.length) {
      document.querySelector("#serchIdProdukter").value = "";
      setPrevTextLenthProdukter(-1);
      setProdukter(allProdukter);
    } else {
      setProdukter(filteredProdukter);
    }
  };

  // SÖKFUNKTION ANSTÄLLDA

  const [allStaff, setAllStaff] = useState();
  const [prevTextLenth, setPrevTextLenth] = useState(-1);

  const search = (text) => {
    const e = text.toLowerCase();

    setPrevTextLenth((prevCount) => prevCount + 1);

    const staffNames = staff.map((item) => item.name.toLowerCase());

    let filteredStaff = [];

    staffNames.map((item, index) => {
      if (item.includes(e) === true) {
        filteredStaff.push(staff[index]);
      }
    });

    if (prevTextLenth == text.length) {
      document.querySelector("#serchId").value = "";
      setPrevTextLenth(-1);
      setStaff(allStaff);
    } else {
      setStaff(filteredStaff);
    }
  };

  return (
    <>
      {/* ------------------------------ PASS -------------------------------- */}

      <section className="Sportix-Section" id="top-admin">
        <div className="m30">
          <h3>Lägg till nytt pass</h3>
          <div className="style-admin-add" id="pass-desktop">
            <div className="modal-input-wrapper">
              <p>Aktivitet:</p>
              <input
                className="input"
                type="text"
                onChange={(e) => setAktivitet(e.target.value)}
              />
            </div>

            <div className="modal-input-wrapper">
              <p>Kategori:</p>
              <select
                className="drop-down input-select"
                name="välj pass"
                onChange={(e) => setPassKategori(e.target.value)}
              >
                <option value="">Välj kategori</option>
                <option value="kondition">Kondition</option>
                <option value="styrka">Styrka</option>
                <option value="flexebilitet">Flexebilitet</option>
                <option value="crossfit">Crossfit</option>
              </select>
            </div>
          </div>

          <p>Dag: </p>
          {/* <div className='calendar-div'> */}
          <Calendar
            className="admin-calendar"
            value={date}
            onClickDay={fixDays}
          />
          {/* </div> */}

          <div className="style-admin-add">
            <div id="pass-desktop">
              <div className="modal-input-wrapper">
                <p>Tid:</p>
                <input
                  className="input"
                  type="text"
                  required
                  onChange={(e) => setTid(e.target.value)}
                />
              </div>
              <div className="modal-input-wrapper">
                <p>Instruktör:</p>
                <input
                  className="input"
                  type="text"
                  required
                  onChange={(e) => setInstruktör(e.target.value)}
                />
              </div>
              <div className="modal-input-wrapper">
                <p>Max antal:</p>
                <input
                  className="input"
                  type="number"
                  required
                  onChange={(e) => setMaxAntal(e.target.value)}
                />
              </div>
            </div>
            <button onClick={createPass} className="admin-buttons">
              Lägg till pass
            </button>
          </div>
        </div>

        <article>
          <form>
            <input
              id="serchIdPass"
              type="text"
              name="search"
              placeholder="Sök namn på pass..."
              onChange={(e) => searchPass(e.target.value)}
            />
          </form>
          <div className="pass-wrapper">
            {pass.map((pass, index) => {
              return (
                <>
                  <div
                    key={index}
                    id="admin-pass-card"
                    className="pass-card center"
                  >
                    <h2 className="booking-antal">Max: {pass.maxAntal}</h2>
                    <div className="aktv-tid-div">
                      <h1>{pass.aktivitet}</h1>
                      <p>
                        {pass.dayString}, {pass.dateString} {pass.monthString}{" "}
                        <br />
                        {pass.tid}
                      </p>
                    </div>
                    <h2>{pass.instruktör}</h2>
                    <button
                      onClick={() => openUpdateModalPass(pass.id)}
                      className="myButton admin-edit-btn"
                    >
                      <FaPencilAlt className="pen-icon" />
                    </button>
                    <button
                      className="staff-btn-delete myButtonDelete"
                      onClick={() => {
                        deletePass(pass.id, "pass");
                      }}
                    >
                      Radera
                    </button>
                  </div>

                  <Update_modal_pass
                    key={Math.random()}
                    id={pass.id}
                    aktivitet={pass.aktivitet}
                    instruktör={pass.instruktör}
                    maxAntal={pass.maxAntal}
                    platser={pass.platser}
                    tid={pass.tid}
                    date={pass.dag}
                    dag={pass.dag}
                    getPass={getPass}
                    prevDayString={pass.dayString}
                    prevMonthSpring={pass.monthString}
                    prevDateString={pass.dateString}
                    kategori={pass.kategori}
                  />
                </>
              );
            })}
          </div>
        </article>
      </section>

      <div className="line"></div>

      {/* ------------------------------ PRODUKTER ------------------------- */}

      <section className="Sportix-Section">
        <div className="m30">
          <h3>Lägg till ny produkt</h3>
          <div id="product-desktop">
            <div className="modal-input-wrapper">
              <p>Namn på produkt:</p>
              <input
                className="input"
                type="text"
                onChange={(e) => setProduktNamn(e.target.value)}
              />
            </div>

            <div className="modal-input-wrapper">
              <p className="m10">Kategori:</p>
              <select
                className="drop-down input-select"
                name="välj pass"
                onChange={(e) => setKategori(e.target.value)}
              >
                <option value="null">Välj kategori</option>
                <option value="equipment">Utrustning</option>
                <option value="top">Överdel</option>
                <option value="bottom">Underdel</option>
              </select>
            </div>

            <div className="modal-input-wrapper">
              <p>Varumärke: </p>
              <input
                className="input"
                type="text"
                onChange={(e) => setproductBrand(e.target.value)}
              />
            </div>

            <div className="modal-input-wrapper">
              <p>Pris:</p>
              <input
                className="input"
                type="number"
                required
                onChange={(e) => setPris(e.target.value)}
              />
            </div>

            <div className="modal-input-wrapper">
              <p>Färg:</p>
              <input
                className="input"
                type="text"
                onChange={(e) => setproductColor(e.target.value)}
              />
            </div>

            <div className="modal-input-wrapper">
              <p>Storlek:</p>
              <select
                className="drop-down input-select"
                name="välj pass"
                onChange={(e) => setOrderSize(e.target.value)}
              >
                <option value="S,M,L,XL">S,M,L,XL</option>
                <option value="oneSize">One size</option>
              </select>
            </div>
          </div>
          <div className="modal-input-wrapper">
            <p>Kort beskrivning: </p>
            <textarea
              className="input"
              type="text"
              onChange={(e) => setproductshortDesc(e.target.value)}
              cols="30"
              rows="3"
            ></textarea>
          </div>

          <div className="modal-input-wrapper column">
            <input
              className="input-file"
              type="file"
              name="file-produkt"
              id="file-produkt"
              accept="image/*"
              onChange={previewImageProdukt}
            ></input>
            <img className="input-img" src="" id="preview-produkt" />
          </div>

          <button onClick={createProduct} className="admin-buttons">
            Spara
          </button>
        </div>

        <form>
          <input
            id="serchIdProdukter"
            type="text"
            name="search"
            placeholder="Sök namn på produkt..."
            onChange={(e) => searchProdukter(e.target.value)}
          />
        </form>

        <article className="map-article">
          {produkter.map((produkt, index) => {
            return (
              <>
                <div
                  key={index}
                  className="staff-card-admin"
                  id={`${produkt.id}-div`}
                >
                  <h1 className="m10">{produkt.produktNamn}</h1>
                  <h1 className="m10">{produkt.price} kr</h1>
                  <p className="m10">{produkt.kategori}</p>
                  <button
                    class="myButton admin-edit-btn"
                    onClick={() => openProductUpdateModal(produkt.id)}
                  >
                    <FaPencilAlt className="pen-icon" />
                  </button>
                  <img
                    className="img-produkt"
                    src={produkt.img}
                    alt={`Bild på ${produkt.produktNamn}`}
                  />

                  <button
                    className="staff-btn-delete myButtonDelete"
                    onClick={() => {
                      deleteProdukter(produkt.id, "produkter");
                    }}
                  >
                    Radera
                  </button>
                </div>

                <Update_modal_product
                  id={produkt.id}
                  img={produkt.img}
                  kategori={produkt.kategori}
                  price={produkt.price}
                  produktNamn={produkt.produktNamn}
                  getProdukter={getProdukter}
                  productBrand={produkt.brand}
                  productshortDesc={produkt.shortDesc}
                  productColor={productColor}
                  setOrderSize={orderSize}
                />
              </>
            );
          })}
        </article>
      </section>

      <div className="line"></div>

      {/* ------------------------------ ANSTÄLLDA ------------------------- */}

      <section className="Sportix-Section">
        <div className="m30">
          <h3>Lägg till ny anställd +</h3>
       
            <input
              id="staff-input-1"
              type="text"
              placeholder="Name..."
              onChange={(e) => {
                setNewName(e.target.value);
              }}
            />
            <input
              id="staff-input-2"
              type="number"
              placeholder="Age..."
              onChange={(e) => {
                setNewAge(e.target.value);
              }}
            />
      
          <div id="pass-desktop">
            <div className="modal-input-wrapper">
              <p className="m10">Kategori:</p>
              <select
                className="drop-down input-select"
                name="välj pass"
                onChange={(e) => setStaffCategory(e.target.value)}
              >
                <option value="null">Ange den anställdes kategori</option>
                <option value="ledning">Ledning</option>
                <option value="tränare">Tränare</option>
                <option value="reception">Reception</option>
                <option value="instruktör">Instruktör</option>
              </select>
            </div>

            <div className="modal-input-wrapper">
              <p>Kort beskrivning om dig: </p>
              <textarea
                id="staff-input-3"
                maxlength="500"
                type="text"
                placeholder="Skriv om dig..."
                onChange={(e) => {
                  setNewText(e.target.value);
                }}
              />
              <p>max 500 tecken</p>
            </div>
          </div>
          {/* <p style={{fontWeight:'bold'}}>Ange level: </p>
              <div className='modal-input-wrapper-level'>
                <p className='m10'> Level 1: Kundnivå <br /> Level 2: Kan skapa pass <br /> Level 3: Kan skapa pass, anställda och produkter </p>
                <select className='drop-down input-select' name='välj pass' onChange={(e) => setLevel(e.target.value)}>
                  <option value="1">Level 1</option>
                  <option value="2">Level 2</option>
                  <option value="3">Level 3</option>
                </select>
              </div> */}

          <input
            type="file"
            name="file"
            id="file"
            accept="image/*"
            onChange={previewImage}
            className="input-file"
          ></input>
          <img className="input-img" src="" id="preview" />

          <button onClick={createStaff} className="admin-buttons">
            Lägg till
          </button>
        </div>
        <form>
          <input
            id="serchId"
            type="text"
            name="search"
            placeholder="Sök namn på personal..."
            onChange={(e) => search(e.target.value)}
          />
        </form>

        <article className="map-article">
          {staff.map((staff, index) => {
            return (
              <>
                <div
                  key={index}
                  className="staff-card-admin"
                  id={`${staff.id}-div`}
                >
                  <h1 id={`${staff.id}-name`}>
                    {staff.name}, {staff.age} år
                  </h1>
                  <img
                    className="staff-img"
                    src={staff.img}
                    alt={`bild på ${staff.name}`}
                  />
                  <p className="staff-text">{staff.text}</p>
                  <button
                    className="admin-edit-btn myButton"
                    onClick={() => openUpdateModal(staff.id)}
                  >
                    <FaPencilAlt className="pen-icon" />
                  </button>
                  <button
                    className="staff-btn-delete myButtonDelete"
                    onClick={() => {
                      deleteStaff(staff.id, "staff");
                    }}
                  >
                    Radera
                  </button>
                </div>

                <div id={`modal-div-${staff.id}`}>
                  <Update_modal_Staff
                    id={staff.id}
                    staffName={staff.name}
                    age={staff.age}
                    img={staff.img}
                    getStaff={getStaff}
                    text={staff.text}
                    kategori={staff.kategori}
                    level={staff.level}
                  />
                </div>
              </>
            );
          })}
        </article>
      </section>

      <div className="line"></div>
    </>
  );
}

export default AdminPage;
