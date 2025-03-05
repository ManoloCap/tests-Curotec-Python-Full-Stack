import React, { useState, useEffect } from 'react';
import ItemPanel from './components/ItemPanel/Component';
import InputsCard from './components/InputsCard/Component'; // Import the InputsCard component
import APIConnector from './services/api'

let apiData = {
  totalPages: 5,
  page: 1,
  perPage: 10,
  totalAmount: 50
};

let dataList = [
  { name: "Item 1", description: "Description 1" },
  { name: "Item 2", description: "Description 2" },
  { name: "Item 1", description: "Description 1" },
  { name: "Item 2", description: "Description 2" },
  { name: "Item 1", description: "Description 1" },
  { name: "Item 2", description: "Description 2" },
  { name: "Item 1", description: "Description 1" },
  { name: "Item 2", description: "Description 2" },
  // Add more objects as needed
];

let api = new APIConnector();

function App() {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(0);

  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [cardsList, setCardsList] = useState([]);

  const handleSearch = async () => {
    populateData(page,perPage)
  };


  useEffect(() => {
  }, []);

  useEffect(() => {
    console.log(`Current Page: ${page}, Items Per Page: ${perPage}`);
  }, [page, perPage]);


  const populateData = async (page, perPage) => {
    console.log("CALLING METHOD ... PAGE AND PERPAGE", page, " AND ", perPage)
    let response = await api.getItems(page,perPage)
    setTotalPages(response.total_pages)
    setPage(response.current_page)
    setPerPage(response.per_page)
    setTotalItems(response.total_count)
    setCardsList(response.items)
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
        <ItemPanel dataList={cardsList} />
      </div>
    </div>
  );
}

export default App;