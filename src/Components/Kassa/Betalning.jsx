import React from "react";
import useModal from "./AddForm";
import Modal from "./Modal";
import "./BetalningStyle.css";



export default function App() {

  const {
    isShowing: isRegistrationFormShowed,
    toggle: toggleRegistrationForm
  } = useModal();

  return (
    <>
      <div className="App">
       
        <button className="modal-toggle" onClick={toggleRegistrationForm}>
        Betalningssätt
        </button>

       

        <Modal
          isShowing={isRegistrationFormShowed}
          hide={toggleRegistrationForm}
          title=""
              >
         
        
                 <div >
            <h2 className="text"> Betalningssätt</h2>
            <h2 className="m-h2">3 månader: Kostnad 1300:-</h2>
            <div className="kassa">
              <img className="klarna-Logo" /><h3 className="klarnaText">Faktura</h3>
            </div>
            <div className="kassa1">
              <img className="visa" /><h3 className="visaText">Kort</h3>
            </div>
            
            <div className="kassa2">
                      <img className="swish" /><h3 className="swishText">Swish</h3>
            </div>
            </div>
        </Modal>
      </div>

    </>
  );
}
