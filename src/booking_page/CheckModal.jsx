import React from 'react'
import '../booking_page/bookingPage.css'
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";

function CheckModal({ bokadText }) {

    const closeModal = () => {
        window.location.reload()
    }

  return (
    
    <div id='check-modal'>
        <div className='check-modal-now-it-fucking-works'>
            <FaCheck className='check-icon' />
            <h1>Pass {bokadText}</h1>
            <p>Se dina bokade pass under <a href="/myprofile">Min sidor</a></p>
            <button onClick={closeModal}>OK</button>
        </div>
    </div>
  )
}

export default CheckModal