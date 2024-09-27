import React, { useState, useEffect } from 'react';

const Pagination = () => {
    const [userData, setUserData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
  
    useEffect(() => {
      fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(data => {
          setUserData(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    // Calculate the index of the first and last items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
    // Slice the array to display only the items for the current page
    const currentItems = userData ? userData.users.slice(indexOfFirstItem, indexOfLastItem) : [];
  
    // Function to handle page changes
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    return (
      <div>
        <h1>User Data</h1>
        {userData ? (
          <div>
            <ul>
              {currentItems.map(user => (
                <li key={user.id}>{user.firstName}</li>
              ))}
            </ul>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(userData.users.length / itemsPerPage) }, (_, index) => (
                <li key={index + 1} onClick={() => handlePageChange(index + 1)}>
                  <a href="!#">{index + 1}</a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
}

export default Pagination;
