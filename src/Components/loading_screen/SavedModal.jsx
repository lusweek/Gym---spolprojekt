import React from 'react'
import style from "./SavedModal.module.css"

import { ImCross } from '@react-icons/all-files/im/ImCross';
export default function SavedModal(props) {
        return (
          <>  <div className={style.modal}>
  
           <div className={style.modalContent}> 

           <p className={style.exit} onClick={() => props.setshowModal(false)}><ImCross/></p>
          <p> Dina ändringar är Sparade! </p>
            <button onClick={() => props.setshowModal(false)}>Okej</button>
           </div> 
            </div></>
          )

        }
        

        