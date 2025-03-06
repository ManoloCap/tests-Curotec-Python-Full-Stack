import React, { useEffect } from 'react';
import './style.css'; // Import ItemPanel styles

const ItemPanel = ({ dataList, actions }) => {

    useEffect(() => {
        const squares = document.querySelectorAll('.small-square');
        squares.forEach((square, index) => {
            square.style.animationDelay = `${index * 0.1}s`;
            square.classList.add('fall-in');
        });
    }, [dataList]);

    return (
        <div className="item-panel">
          {actions?.fadeOutItems && (
            <div className="messageBarContainer">
              <label> Loading ... </label>
            </div>
          )}
          {actions?.itemsApiError && (
            <div className="messageBarContainer">
              <label> {actions.itemsApiError} </label>
            </div>
          )}
          <div className="items-container">
            {dataList.map((item, index) => (
              <div key={index} className={`small-square ${actions?.fadeOutItems ? 'fade-out' : ''}`}>
                <button className="delete-button" onClick={() => actions.handleDelete(item.id)}>X</button>
                <div className="item-details">
                  <h2 className=""> {`ID: ${item?.id} `}</h2>
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
    );
};

export default ItemPanel;