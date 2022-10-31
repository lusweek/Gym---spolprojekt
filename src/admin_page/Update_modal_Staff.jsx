import React from 'react'
import { db } from '../firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { useState, useEffect } from "react";
import { GrFormClose } from "@react-icons/all-files/gr/GrFormClose";
import openLoadingModal from '../Components/loading_screen/OpenLoadingModal';
import closeLoadingModal from '../Components/loading_screen/CloseLoadingModal';

function Update_modal_staff({ id, staffName, age, img, getStaff, text, kategori, level}) {

    const [newName, setNewName] = useState(staffName)
    const [newAge, setNewAge] = useState(age)
    const [newImg, setNewImg] = useState(img)
    const [newText, setNewText] = useState(text)
    const [newKategori, setNewKategori] = useState(kategori)
    const [newLevel, setNewLevel] = useState(level)

// UPPDATERAR DATA

  const updateStaff = async (DBcollextion) => {
    openLoadingModal()
    const staffDoc = doc(db, DBcollextion, id)
    const newFields = {age: Number(newAge), img: newImg, name: newName, text: newText, kategori: newKategori, level: Number(newLevel)}
    await updateDoc(staffDoc, newFields)
    
    getStaff()
    closeModal()
    closeLoadingModal()
    
    window.location.reload();
  }


//BILD
function previewImage() {
    let file = document.getElementById(`${id}-file-modal`).files;
    if (file.length > 0) {
        let fileReader = new FileReader();
        fileReader.onload = function (event) {
            document.getElementById(`${id}-preview-modal`).setAttribute("src", event.target.result);
            setNewImg(event.target.result)
        };

        fileReader.readAsDataURL(file[0]);
    }
}


const closeModal = () => {
    document.querySelector(`#update-modal-${id}`).style.display="none"
}

  return (
    <section id={`update-modal-${id}`} className='update-modal-wrapper'>
        <article className='update-modal'>
            <GrFormClose className='close-icon' onClick={closeModal} />
            <h1>{staffName}, {age} år</h1>
            <img className='staff-img' id={`${id}-preview-modal`} src={img} alt={`bild på ${staffName}`} />
            <div className='input-div'>

                <h1>Ändra namn:</h1>
                <input 
                    type="text" 
                    placeholder={staffName} 
                    onChange={(e) => {setNewName(e.target.value)}} 
                    defaultValue={staffName}
                />
            </div>
               
            <div className='input-div'>
                <h1>Ändra ålder:</h1>
                <input 
                    type="number" 
                    placeholder={age} 
                    onChange={(e) => {setNewAge(e.target.value)}} 
                    defaultValue={age}
                />
            </div>

            <div className='modal-input-wrapper-ka'>
                <h1 className='m10'>Ändra kategori:</h1>
                <select className='drop-down-k' name='välj pass' onChange={(e) => setNewKategori(e.target.value)}>
                  <option value="null">Ange den anställdes kategori</option>
                  <option value="ledning">Ledning</option>
                  <option value="tränare">Tränare</option>
                  <option value="reception">Reception</option>
                  <option value="instruktör">Instruktör</option>
                </select>
              </div>

              <div className='drop-down-bes'>
              <h1>Ändra din beskrivning: </h1>
              <textarea type="text" maxlength="500" defaultValue={newText} onChange={(e) => {setNewText(e.target.value)}}  />
              <p>max 500 tecken</p>
              </div>

              <div className='drop-down-le'>
                <h1 className='m10'>Ändra level:</h1>
                <select className='drop-down-k' placeholder={level} defaultValue={level} name='välj pass' onChange={(e) => setNewLevel(e.target.value)}>
                  <option value="1">Level 1</option>
                  <option value="2">Level 2</option>
                  <option value="3">Level 3</option>
                </select>
              </div>

            <div className='drop-down-k'>
                <h1>Uppdatera bild:</h1>
                 <input 
                    type="file" 
                    name="file" 
                    id={`${id}-file-modal`} 
                    accept="image/*" 
                    onChange={previewImage} 
                ></input>
            </div>

            <div className="m30">
              
                <button className='product-button' onClick={() => {updateStaff('staff')}}>Spara</button>
            </div>
            
        </article>
    </section>
  )
}

export default Update_modal_staff