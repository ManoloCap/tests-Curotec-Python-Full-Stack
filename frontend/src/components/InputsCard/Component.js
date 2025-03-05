import React, { useState } from 'react';
import './style.css'; 

const InputsCard = ({ page, setPage, perPage, setPerPage, totalPages, handleSearch }) => {
  const [newPage, setNewPage] = useState(page);
  const [newPerPage, setNewPerPage] = useState(perPage);

  const pageOnChange = (event) => {
    setPage(Number(event.target.value))
  }

  const perPageOnChange = (event) => {
    setPerPage(Number(event.target.value))
  }
  
  return (
    <div className="inputs-card-container">
        <div className="inputs-card-container-left">
            <div>
                <label> <strong>Total Pages:</strong> </label>
                <label htmlFor="page"> {totalPages} </label>
            </div>
            <div>
                <label> <strong>Current Page:</strong> </label>
                <label htmlFor="page"> {page} </label>
            </div>
            <div>
                <label> <strong>Items Per Page:</strong> </label>
                <label> {perPage} </label>
            </div>
        </div>
        <div className="inputs-card-container-right">
            <div>GO TO ↓</div>
            <label>
                <strong>Page </strong>
                <input
                id="page"
                type="number"
                value={page}
                onChange={pageOnChange}
                />
            </label>
            <label>
                <strong>Per Page:</strong>
                <input
                id="perPage"
                type="number"
                value={perPage}
                onChange={perPageOnChange}
                />
            </label>
            <button className="apply-button" type="button" onClick={handleSearch}>
                Apply
            </button>
        </div>
    </div>
  );
};

export default InputsCard;