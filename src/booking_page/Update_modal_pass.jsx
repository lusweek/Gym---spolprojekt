import React, { useState } from 'react'
import '../admin_page/AdminPage.css'
import { GrFormClose } from "@react-icons/all-files/gr/GrFormClose";
import { db } from '../firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import Calendar from 'react-calendar';
import openLoadingModal from '../Components/loading_screen/OpenLoadingModal'
import closeLoadingModal from '../Components/loading_screen/CloseLoadingModal'

function Update_modal_pass({ id, aktivitet, instruktör, maxAntal, platser, tid, dag, getPass, prevDayString, prevMonthSpring, prevDateString, kategori }) {

    const [newAktivitet, setNewAktivitet] = useState(aktivitet)
    const [newpassKategori, setNewPassKategori] = useState(kategori)
    const [newInstruktör, setNewInstruktör] = useState(instruktör)
    const [newMaxAntal, setNewMaxAntal] = useState(maxAntal)
    const [newTid, setNewTid] = useState(tid)
    const [newDate, setNewDate] = useState(dag)
    const [date, setDate] = useState('')

    const [dayString, setDayString] = useState(prevDayString)
    const [monthString, setMonthString] = useState(prevMonthSpring)
    const [dateString, setDateString] = useState(prevDateString)

// UPPDATERAR DATA
  const updatePass = async (DBcollextion) => {
    openLoadingModal()
    fixDays()
    const staffDoc = doc(db, DBcollextion, id)
    console.log('newAktivitet: ', newAktivitet, 'newInstruktör: ', newInstruktör, 'newMaxAntal: ', newMaxAntal
    , 'newTid: ' ,newTid, 'newDate: ', newDate, 'dayString: ', dayString, 'dateString: ', dateString, 'monthString: ', monthString
    );
    const newFields = {
        aktivitet: newAktivitet, 
        instruktör: newInstruktör, 
        maxAntal: newMaxAntal,
        tid: newTid,
        dag: String(newDate),
        dateString: dayString,
        dayString: dateString,
        monthString: monthString,
        kategori: newpassKategori
        }
    await updateDoc(staffDoc, newFields)
    getPass()
    closeLoadingModal()
    alert('Pass uppdaterat!')
    closeModal()
  }

// RADERAR DATA
  const deleteStaff = async (id, DBcollextion) => {
    if (window.confirm('Radera pass?')){
        openLoadingModal()
        const staffDoc = doc(db, DBcollextion, id);
        await deleteDoc(staffDoc);
        getPass()
        closeModal()
        closeLoadingModal()
        
    }
  }

//

    const closeModal = () => {
        document.querySelector(`#update-modal-${id}`).style.display="none"
    }


    const fixDays = (e) => {
        const date1 = new Date(e)
        const timestamp = date1.getTime()
        const dateTimestamp = new Date(timestamp)
        setDateString(dateTimestamp.getDate())
        setDate(e)

        let day = ""

        switch (dateTimestamp.getDay()) {
            case 0:
                day = "Söndag"
                break;
            case 1:
                day = "Måndag"
                break;
            case 2:
                day = "Tisdag"
                break;
            case 3:
                day = "Onsdag"
                break;
            case 4:
                day = "Torsdag"
                break;
            case 5:
                day = "Fredag"
                break;
            case 6:
                day = "Lördag"
                break;
        }

        setDayString(day)

        let month = ""

        switch (dateTimestamp.getMonth()) {
            case 0:
                month = "Januari"
                break;
            case 1:
                month = "Februari"
                break;
            case 2:
                month = "Mars"
                break;
            case 3:
                month = "April"
                break;
            case 4:
                month = "Maj"
                break;
            case 5:
                month = "Juni"
                break;
            case 6:
                month = "Juli"
                break;
            case 7:
                month = "Agusti"
                break;
            case 8:
                month = "September"
                break;
            case 9:
                month = "Oktober"
                break;
            case 10:
                month = "November"
                break;
            case 11:
                month = "December"
                break;
    }

    setMonthString(month)
   }

  return (
    <section id={`update-modal-${id}`} className='update-modal-wrapper'>
        <article className='update-modal'>
            <GrFormClose className='close-icon' onClick={closeModal} />

            <div className='modal-input-wrapper'>
                <h1>Ändra namn på aktivitet:</h1>
                <input 
                    type="text" 
                    placeholder={aktivitet}
                    onChange={(e) => {setNewAktivitet(e.target.value)}}
                    defaultValue={aktivitet} 
                />
            </div>

            <div className='modal-input-wrapper'>
              <h1>Ändra kategori:</h1>
              <select className='drop-down input-select' name='välj pass' onChange={(e) => setNewPassKategori(e.target.value)}>
                <option value="">Välj kategori</option>
                <option value="kondition">Kondition</option>
                <option value="flexibilitet">Flexibilitet</option>
                <option value="styrka">Styrka</option>
                <option value="crossfit">Crossfit</option>
            </select>
            </div>

            <div className='modal-input-wrapper'>
                <h1>Ändra instruktör: </h1>
                <input 
                    type="text" 
                    placeholder={instruktör}
                    onChange={(e) => {setNewInstruktör(e.target.value)}}
                    defaultValue={instruktör}
                />
            </div>

            <div className='center'>
            <p>Dag: </p>
            <Calendar value={date} onClickDay={fixDays}/>
            </div>

            <div className='modal-input-wrapper'>
                <h1>Ändra tid: </h1>
                <input 
                    type="text" 
                    placeholder={tid}
                    onChange={(e) => {setNewTid(e.target.value)}}
                    defaultValue={tid}
                />
            </div>

            <div className='modal-input-wrapper'>
                <h1>Ändra maxAntal: </h1>
                <input 
                    type="text" 
                    placeholder={maxAntal}
                    onChange={(e) => {setNewMaxAntal(e.target.value)}}
                    defaultValue={maxAntal}
                />
            </div>
            
            <div className="m30">
                <button onClick={() => {updatePass('pass')}}>Spara</button>
                <button onClick={() => {deleteStaff(id, 'pass')}}>Ta bort pass</button>
            </div>

        </article>
    </section>
  )
}

export default Update_modal_pass