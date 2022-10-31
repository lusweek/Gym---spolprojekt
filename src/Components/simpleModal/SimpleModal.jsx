import React from 'react'
import './simpleModal.css'
import {motion} from "framer-motion"

function SimpleModal({ modalText, isOpen }) {

    console.log(isOpen);

    const variants = {
        open: { opacity: 1 },
        closed: { opacity: 0 }
    }   

  return (

    <motion.div  
        animate={ isOpen ? "open" : "closed" }
        variants={ variants }
        id='simple-modal'>
        <motion.div 
            animate={{scale: 1}} 
            initial={{scale: 0}} 
                
            className='modal-container'>
            <p>{modalText}</p>
        </motion.div>
    </motion.div>
  )
}

export default SimpleModal