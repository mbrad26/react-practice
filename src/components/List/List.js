import React, { useContext } from 'react';
// import CardGroup from "react-bootstrap/CardGroup";
// import Card from "react-bootstrap/Card";
// import Image from "react-bootstrap/Image";
import Item from '../Item/Item.js';
import { Context } from '../App/App';
import './List.css';

const List = () => {
  const { data } = useContext(Context);

  return (
    <div className='row justify-content-around' data-testid='wrapper'>
      {data.map(
        item => <Item key={item.id} item={item} />
      )}
    </div>
  )
};

export default List;
