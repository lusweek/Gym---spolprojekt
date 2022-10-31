import { useState } from 'react';
import '../minaSidor.css'
import style from "./BetalningStyle.module.css"
import { setMembership } from '../Membership/SetMembership';
import { Offerbuttons } from '../Membership/OfferBtns';

export function PaymentBtn(props) {
 

  return (
    <div className='m30-mypages-continue'>
  <button onClick={props.CardContinue}>
    Fortsätt
  </button>
  
  </div>
  )
}
