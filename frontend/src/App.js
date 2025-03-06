import React, { useState, useEffect } from 'react';
import ItemPanel from './components/ItemPanel/Component';
import InputsCard from './components/InputsCard/Component'; // Import the InputsCard component
import APIConnector from './services/api'
import './App.css';

let api = new APIConnector();

function App() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [cardsList, setCardsList] = useState([]);

  const [fadeOutItems, setFadeOutItems] = useState(false);
  const [itemsApiError, setItemsApiError] = useState(false);

  const handleSearch = async () => {
    setFadeOutItems(true);
    await populateData(page,perPage)
    setFadeOutItems(false);
  };


  useEffect(() => {
  }, []);

  useEffect(() => {
    console.log(`Current Page: ${page}, Items Per Page: ${perPage}`);
  }, [page, perPage]);


  const populateData = async (page, perPage) => {
    console.log("CALLING METHOD ... PAGE AND PERPAGE", page, " AND ", perPage)
    setItemsApiError(false)
    let response = await api.getItems(page, perPage);
    if(!response){
      console.log("An error occurred while fetching items");
      setCardsList([]);
      sendTemporalMessage("An error occurred while fetching items");
      return
    }
    
    if ('detail' in response) {
      setItemsApiError(response.detail)
      setCardsList([]);
      return;
    }

    setTotalPages(response.total_pages)
    setPage(response.current_page)
    setPerPage(response.per_page)
    setTotalItems(response.total_count)
    setCardsList(response.items)
  }

  const handleDelete = async (id) => {
    console.log("Deleting ID: ", id)
    await api.deleteItem(id)
    setFadeOutItems(true)
    await populateData(page,perPage)
    setFadeOutItems(false)
  }

  const sendTemporalMessage = (message) => {
    setItemsApiError(message)
    setTimeout(() => setItemsApiError(false), 5000);
  }
  
  const createItem = async (newItem) => {
    const new_item_response = await api.createItem(newItem.name, newItem.description)
    console.log("POPULATE IT ... ", new_item_response,)
    setFadeOutItems(true)
    await populateData(page,perPage)
    setFadeOutItems(false)
  }
  return (
    <div className="App">
      <div className="AppLayout">
        <InputsCard
          page={page}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          totalPages={totalPages}
          totalItems={totalItems}
          handleSearch={handleSearch}
        />
        <ItemPanel 
          dataList={cardsList} 
          actions={
            {
              handleDelete: handleDelete,
              fadeOutItems: fadeOutItems,
              itemsApiError:  itemsApiError,
              createItem: createItem
            }
          }
        />
      </div>
    </div>
  );
}

export default App;