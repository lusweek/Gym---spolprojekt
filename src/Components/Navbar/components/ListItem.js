import "../css/ListItem.css";


function ListItem(props) {
  // console.log(props);
  return (
    <div className="Listitem">
      <i className="item-icon">{props.icon}</i>
      <h1 className="item-name">{props.name}</h1>
    
    </div>
  );
}

export default ListItem;
