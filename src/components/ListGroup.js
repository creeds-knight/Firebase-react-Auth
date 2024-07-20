import { useState } from "react";

function ListGroup () {
  const items = ["NewYork", "California", "Pasedena", "Las Vegas", "London"]
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <>
      <h1>List</h1>
      <ul className="list-group">
        {items.map((item) => (<li key={item}
	className="list-group-item active"
	onClick={handleClick}>{item}</li>))}
      </ul>
    </>
  );
}

export default ListGroup;
