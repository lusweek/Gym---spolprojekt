import React from "react";
import useModal from "./AddForm";
import Modal from "./Modal";
import "./formStyle.css";





/* Form page*/ 

export default function App() {
  const { isShowing: isLoginFormShowed, toggle: toggleLoginForm } = useModal();
  const {
    isShowing: isRegistrationFormShowed,
    toggle: toggleRegistrationForm
  } = useModal();

  return (
    <>
      <div className="App">
       
        <button className="modal-toggle" onClick={toggleRegistrationForm}>
          Kassa
        </button>

        <Modal
          isShowing={isLoginFormShowed}
          hide={toggleLoginForm}
          title="kassa"
        >
          <form>
            <div className="form-group">
              <input type="text" placeholder="Förnamn" />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Efternamn" />
            </div>
           
          </form>
        </Modal>

        {/*Personuppgifter */ }

        <Modal
          isShowing={isRegistrationFormShowed}
          hide={toggleRegistrationForm}
          title=""
        >
          <h2 className="titleKassa">Kassa</h2>
               <h5 className="infoKassa">Personuppgifter</h5>
          <form>
                      <div className="form-group">
                     <h3 className="namnKassa"> Förnamn</h3>
              <input className="namnInput"  type="text" placeholder="Förnamn" />
            </div>
                      <div className="form-group">
                      <h3 className="eftKassa">Efternamn</h3>
              <input className="eftInput" type="text" placeholder="Efternamn" />
            </div>
                      <div className="form-group">
                      <h3 className="telKassa">Telefonummer</h3>
              <input className="telInput" type="text" placeholder="Telefonummer" />
            </div>
                      <div className="form-group">
                      <h3 className="adressKassa"> Adress </h3>
                          <input className="GataInput" type="text"  placeholder="Ex. Gatavägen 1" />
                          <input className="postInput" type="text"  placeholder="Postnummer" />
                          <input  className="stadInput" type="text" placeholder="Stad" />
            </div>
          </form>
          <hr />

          <h2 className="textForm"> Betalningssätt</h2>
           
            <div className="kassaForm">
              <img className="klarnaIm" /><h3 className="klarnaTextForm">Faktura</h3>
            </div>
            <div className="kassaFormV">
              <img className="visaIm" /><h3 className="visaTextForm">Kort</h3>
            </div>
            
            <div className="kassaFormS">
                      <img className="swishIm" /><h3 className="swishTextForm">Swish</h3>
            </div>
          
          
             
        </Modal>
      </div>
      
    </>
  );
}
