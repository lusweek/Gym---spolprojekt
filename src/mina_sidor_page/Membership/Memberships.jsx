import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {Offerbuttons} from "./OfferBtns"
import { setMembership } from './SetMembership'
export default function Memberships(props) {
  const [Card, SetCard] = useState("")

  const ShowModal = (e) =>{
  const CardId = e.target.value
   setMembership(CardId)
  
    {
      props.onclick()
    } 
  }
  //localStorage.removeItem("Kort")
  useEffect(() => {
    SetCard(JSON.parse(localStorage.getItem("Kort")) ? JSON.parse(localStorage.getItem("Kort")) : '')
  }, [])
  return  Card ? (

<div>
  
  <article className='profile-right'>
          <div className="OfferSection">
            <div className="OfferInfo"> 
              <h3>Medlemskap & passkort</h3>
            </div>
 
<button id='ChoosenBtn' value={Card.id} key={Card.id} className={Card.class} role="button">{Card.value} <br></br> {Card.price}</button>
          </div>
  
  </article>
  </div>



  )
  : (
    
<div>
  
  <article className='profile-right'>
          <div className="OfferSection">
            <div className="OfferInfo"> 
              <h3>Medlemskap & passkort</h3>
            </div>
            { Offerbuttons.map(button => {
  return (
  
  <button value={button.id} key={button.id} onClick={ShowModal} className={button.class} role="button">{button.value}<br></br> {button.price}</button>
  
  )
  })}
          </div>
  
  </article>
  </div>
  
  )
}


// import React from 'react'

// export default function Memberships(props) {
//   return (
//     <div>
//     <article className='profile-right'>
//             <div className="OfferSection">
//               <div className="OfferInfo"> 
//                 <h3>Medlemskap & passkort</h3>
//               </div>
//               <button onClick={props.onclick} className="OfferOne" role="button"><p className="rowOne">3 månader</p>  <p className="rowTwo"> 1300:- </p> </button>
//               <button onClick={props.onclick} className="OfferTwo" role="button"><p className="rowOne">6 månader</p>  <p className="rowTwo"> 2100:- </p> </button>
//               <button onClick={props.onclick} className="OfferThree" role="button"><p className="rowOne">12 månader</p>  <p className="rowTwo"> 3600:- </p> </button>
//               <button onClick={props.onclick} className="OfferFour" role="button"> <p className="rowOne">Passkort</p>  <p className="rowTwo"> 150:- </p></button>
          
//             </div>

//     </article>
//     </div>
//   )
// }



