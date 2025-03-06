import React, { useEffect, useState } from 'react';
import './style.css'; // Import ItemPanel styles

const ItemPanel = ({ dataList, actions }) => {

    const [individualItemFadeOut, setIndividualItemFadeOut] = useState(null);
    const [activateAddItem, setActivateAddItem] = useState(false);
    const [newItem, setNewItem] = useState({
      name: '', value: ''
    });

    useEffect(() => {
        const squares = document.querySelectorAll('.small-square');
        squares.forEach((square, index) => {
            square.style.animationDelay = `${index * 0.1}s`;
            square.classList.add('fall-in');
        });
    }, [dataList]);

    const handleDeleteButton = async (item) => {
      console.log("FADING OUT ITEM: ", item)
      setIndividualItemFadeOut(item.id)
      actions.handleDelete(item.id)
    }

    const handlesNewItemButton = () => {
      if(activateAddItem == false){
        setActivateAddItem(true)
      }
    }

    const handleAddItem = async () => {
      setActivateAddItem(false);
      actions?.createItem(newItem)
    }

    const handleCancelAddItem = async () => {
      setActivateAddItem(false)
      setNewItem({ name: '', value: '' })
    }

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
                <button className="delete-button" onClick={() => handleDeleteButton(item)}>X</button>
                <div className={`item-details ${actions?.fadeOutItems ? 'fade-out' : '' }`}> 
                  <h2 className=""> {`ID: ${item?.id} `}</h2>
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-description">{item.description}</p>
                </div>
              </div>
            ))}
            {actions?.fadeOutItems ? null : (
              <div className="small-square" onClick={handlesNewItemButton}>
                <div className="item-details"> 
                    {activateAddItem ? (
                      <div className="createItemCard">
                        <div>
                            <h4 className="item-name"> name </h4>
                            <input
                                id="newItemName"
                                type="text"
                                value={newItem?.name}
                                onChange={(e) => setNewItem((prevItem) => ({ ...prevItem, name: e.target.value }))}
                            />
                        </div>
                        <div className="add-item-input-description">
                            <p className="item-description"> description </p>
                            <textarea
                                className="add-item-input"
                                id="newItemDescription"
                                value={newItem?.description}
                                onChange={(e) => setNewItem((prevItem) => ({ ...prevItem, description: e.target.value }))}
                            ></textarea>
                        </div>
                        <div>
                            <button className="cancel-button" onClick={() => {handleCancelAddItem(newItem)}}> Cancel </button>
                            <button className="add-item-button" onClick={handleAddItem}> Add Item </button>
                        </div>
                    </div>
                    ) : (
                      <img src="/images/add_item.gif" alt="Add Item" />
                    )}
                </div>
              </div>
            )}

          </div>
        </div>
    );
};

export default ItemPanel;