import React from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { GrFormClose } from "@react-icons/all-files/gr/GrFormClose";
// import "../admin_page/AdminPage.css";
import "./minaSidor.css";
import style from "./Kassa/BetalningStyle.module.css"
import UpdateLocalStorage from "../functions/UpdateLocalStorage";
import openLoadingModal from "../Components/loading_screen/OpenLoadingModal";

function UpdateProfileModal({
  closeModal,
  id,
  email,
  name,
  lastName,
  password,
  phoneNumber,
  img,
}) {
  const [newName, setNewName] = useState(name ? name : "");
  const [newEmail, setNewEmail] = useState(email ? email : "");
  const [newPhoneNumber, setNewPhoneNumber] = useState(
    phoneNumber ? phoneNumber : ""
  );
  const [newImg, setNewImg] = useState(img ? img : "");
  const [newLastName, setNewLastName] = useState(lastName ? lastName : "");
  const [newPassword, setNewPassword] = useState(password ? password : "");

  // UPPDATERAR DATA

  const updateStaff = async (DBcollextion) => {
    openLoadingModal();

    const staffDoc = doc(db, DBcollextion, id);
    const newFields = {
      img: newImg,
      name: newName,
      lastName: newLastName,
      email: newEmail,
      password: newPassword,
      phoneNumber: newPhoneNumber,
    };
    await updateDoc(staffDoc, newFields);

    UpdateLocalStorage(id);
    setTimeout(close, 3000);
  };

  // STÄNGER FÖRST NÄR LOCAL STORAGE HAR UPPDATERATS
  const close = () => {
    if (localStorage.getItem("user")) closeModal();
    else setTimeout(close4sec, 2000);
  };

  const close4sec = () => {
    if (localStorage.getItem("user")) closeModal();
    else setTimeout(close6sec, 2000);
  };

  const close6sec = () => {
    if (localStorage.getItem("user")) closeModal();
    else setTimeout(close8sec, 2000);
  };

  const close8sec = () => {
    if (localStorage.getItem("user")) closeModal();
    else setTimeout(close10sec, 2000);
  };

  const close10sec = () => {
    closeModal();
    alert("Kunde inte uppdatera, ladda om sidan och försök igen");
  };

  // BILD
  function previewImage() {
    let file = document.getElementById(`${id}-file-modal`).files;
    if (file.length > 0) {
      let fileReader = new FileReader();
      fileReader.onload = function (event) {
        document
          .getElementById(`${id}-preview-modal`)
          .setAttribute("src", event.target.result);
        setNewImg(event.target.result);
      };

      fileReader.readAsDataURL(file[0]);
    }
  }

  const closeModalNow = () => {
    document.querySelector(`#${id}-update-modal`).style.display='none'
  }

  return (
    <section id={`${id}-update-modal`} className="update-modal-wrapper-mypages">
      <article className="update-modal-mypages">
        <GrFormClose className="close-icon-mypages" onClick={closeModalNow} />

        <img
          className="staff-img"
          id={`${id}-preview-modal`}
          src={img}
          alt={`Ingen bild tillagd`}
        />

        <div className="modal-img-wrapper-mypages">
          <h4>Uppdatera bild:</h4>
          <input
            type="file"
            name="file"
            id={`${id}-file-modal`}
            accept="image/*"
            onChange={previewImage}
          ></input>
        </div>
        <div className="input-divs">
          <div className="input-div">
            <h4> Namn</h4>
            <input
              type="text"
              placeholder={name}
              onChange={(e) => {
                setNewName(e.target.value);
              }}
              defaultValue={name}
            />
          </div>

          <div className="input-div">
            <h4> Efternamn</h4>
            <input
              type="text"
              placeholder={lastName}
              onChange={(e) => {
                setNewLastName(e.target.value);
              }}
              defaultValue={lastName}
            />
          </div>

          <div className="input-div">
            <h4> Email</h4>
            <input
              type="text"
              placeholder={email}
              onChange={(e) => {
                setNewEmail(e.target.value);
              }}
              defaultValue={email}
            />
          </div>

          <div className="input-div">
            <h4> Telefonnummer</h4>
            <input
              type="text"
              placeholder={phoneNumber}
              onChange={(e) => {
                setNewPhoneNumber(e.target.value);
              }}
              defaultValue={phoneNumber}
            />
          </div>

          {/* <div className="input-div">
            <h1> Lösenord</h1>
            <input
              type="password"
              placeholder={password}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              defaultValue={password}
            />
          </div> */}
        </div>

        <div className="m30-mypages">
          <button
            onClick={() => {
              updateStaff("profiler");
            }}
          >
            Spara
          </button>
        </div>
      </article>
    </section>
  );
}

export default UpdateProfileModal;
