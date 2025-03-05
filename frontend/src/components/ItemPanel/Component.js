import React, { useEffect } from 'react';
import './style.css'; // Import ItemPanel styles

const ItemPanel = ({ dataList }) => {
  useEffect(() => {
    const squares = document.querySelectorAll('.small-square');
    squares.forEach((square, index) => {
      square.style.animationDelay = `${index * 0.1}s`;
      square.classList.add('fall-in');
    });
  }, [dataList]);

  return (
    <div className="item-panel">
      <div className="items-container">
        {dataList.map((item, index) => (
          <div key={index} className="small-square">
            <strong>Name:</strong> {item.name}<br/>
            <strong>Description:</strong> {item.description}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemPanel;