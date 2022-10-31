import React, { useState, useEffect } from "react";
import Item from "./Item";
import WebbshopModal from "./WebbshopModal";
import "../css/ItemList.css";
import { db } from '../../../firebase-config'
import { collection, getDocs } from 'firebase/firestore'

function ItemList() {

//   // START: HÄMTAR PRODUKTER 
  const produkterCollectionRef = collection(db, "produkter")
    const [database, setDatabase ] = useState([])

  const getProdukter = async () => {
    const data = await getDocs(produkterCollectionRef)
    setDatabase(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
  };

useEffect(() => {
    getProdukter()
  }, []);
  // END: HÄMTAR PRODUKTER 


  const [openModal, setOpenModal] = useState(false);
  
  const equipment = [];
  const clothesTop = [];
  const clothesBottom = [];
  const currentModal = [];

  function itemModal(itemId){
    const modalId = itemId;
    global.modalId = modalId;
    setOpenModal(true);
  }

  for (var i = 0; i < database.length; i++) {
    if(global.modalId === database[i].id){
      currentModal.push(database[i])
    }
  }
  
  for (var l = 0; l < database.length; l++) {
    //Loop over database and pushing object into correct array.
    if (database[l].type === "equipment") {
      equipment.push(database[l]);
    } else if (database[l].type === "bottom") {
      clothesBottom.push(database[l]);
    } else {
      clothesTop.push(database[l]);
    }
  }

  return (
    <div className="ItemList">
      {openModal &&
        currentModal.map((item, index) => (
          <WebbshopModal
            closeModal={setOpenModal}
            id={item.id}
            produktNamn={item.produktNamn}
            price={item.price}
            img={item.img}
            brand={item.brand}
            shortDesc={item.shortDesc}
            color={item.color}
            item={item}
            key={index}
            type={item.type}
            orderSize={item.orderSize}
          />
        ))}
      <div className="list-section">
        <h1 className="list-title">Överdelar</h1>
      </div>
      {clothesTop.map((item, index) => (
        <Item
        itemModal={itemModal}
        produktNamn={item.produktNamn}
          id={item.id}
          price={item.price}
          key={index}
          item={item}
          img={item.img}
          />
          ))}
      <div className="list-section">
        <h1 className="list-title">Underdelar</h1>
      </div>
      {clothesBottom.map((item, index) => (
        <Item
        itemModal={itemModal}
        produktNamn={item.produktNamn}
        id={item.id}
        price={item.price}
        key={index}
        item={item}
        img={item.img}
        />
        ))}
<div className="list-section">
  <h1 className="list-title">Utrustning</h1>
</div>
{equipment.map((item, index) => (
  <Item
    itemModal={itemModal}
    id={item.id}
    produktNamn={item.produktNamn}
    price={item.price}
    key={index}
    item={item}
    img={item.img}
  />
))}
    </div>
  );
}

export default ItemList;
