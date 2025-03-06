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

  const handleDeletion = async () => {

  }

  const sendTemporalMessage = (message) => {
    setItemsApiError(message)
    setTimeout(() => setItemsApiError(false), 5000);
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
          handleSearch={handleSearch}
        />
        <ItemPanel 
          dataList={cardsList} 
          actions={
            {
              deleteItem: handleDeletion,
              fadeOutItems: fadeOutItems,
              itemsApiError:  itemsApiError
            }
          }
        />
      </div>
    </div>
  );
}

export default App;