import { Offerbuttons } from "./OfferBtns";
export const setMembership = (CardId) => {

    Offerbuttons.map((card, index) => {
        if (CardId == card.id){
            
            localStorage.setItem('Kort',JSON.stringify(card));
   console.log(card)
      } 
      })
      

  }