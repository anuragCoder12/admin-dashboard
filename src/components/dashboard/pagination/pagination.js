import React from 'react'
import styles from "./pagination.module.css";
function Pagination({ setPaginationCount, setInitialPaginationCount, initialPaginationCount, dataLength, paginationCount }) {
  const handlePrevious = () => {
    if(initialPaginationCount > 0) {

      setInitialPaginationCount((prev) => prev - 6)
      setPaginationCount((prev) => prev - 6)
    }
  }
  const handleNext = () => {
    if(paginationCount < dataLength) {
      
      setInitialPaginationCount((prev) => prev + 6)
      setPaginationCount((prev) => prev + 6)
    }
  }
  return (
    <div className={styles.container}>
      {
        initialPaginationCount > 0 &&
          <button onClick={handlePrevious} className={` ${styles.disabled}`}>
              Previous
      </button>
      }
      {
        dataLength > 6 && 
          <button onClick={handleNext} className={`${styles.active} `}>
              Next
      </button>
      }
    </div>
  );
}

export default Pagination