

import { useLocation } from 'react-router-dom'
export const NavFilter = () => {
    const location = useLocation()
   
  if ( location.state  === null )
  {
    return (
        null
    )
  }
  else {    
    const { from } = location.state 
    return (
from
    ) 
}
  

  }