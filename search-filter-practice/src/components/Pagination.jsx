import React from 'react'
import { useState, useEffect } from 'react'
import Cards from './Cards';
import "./pagination.css";

const Pagination = (props) => {
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    // useEffect(<function>, <dependency>)
    const itemsPerPage = props.items;
    
    const lastItemIndex = itemsPerPage * currentPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    console.log(lastItemIndex, 'lastItemIndex');
    console.log(firstItemIndex, 'firstItemIndex');

    const currentUsers = data != null ? data.slice(firstItemIndex,lastItemIndex) : [];
    console.log(currentUsers);
    const totalPages = data != null ? (Math.ceil(data.length / itemsPerPage)) : 0;
    console.log(totalPages);
    useEffect(()=>{
        const timer = setTimeout(() => {
            fetch('https://dummyjson.com/users')
              .then(response => response.json())
              .then(data => setData(data.users))
              .catch(error => console.error("Error fetching data:", error));
          }, 2000); // 3-second delay
        
          // Cleanup the timer
          return () => clearTimeout(timer);
    },[]);

    const handlePageChange = (pageNo)=>{
        setCurrentPage(pageNo)
        console.log(currentPage,'currentPage')
        console.log()
    }
  return (

    <div className='pagination_div'>
        {
            data != null ? (
              
                <>
                <Cards userData = {currentUsers}/>
                
                {Array(totalPages).fill().map((_, index) => (
                    <a  className={`pagination-link ${currentPage === index + 1 ? 'active' : ''}`} 
                     key={index} onClick={()=>{handlePageChange(index + 1)}}>{index + 1}</a>
                ))}
            </>
                
            ) : (
                <div className="loading-container">
                <p className="loading-text">Loading...</p>
              </div>
            )
        }
    </div>
  )
}

export default Pagination

