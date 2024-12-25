import React from 'react'
import styles from "./pagination.module.css";
function Pagination() {
  return (
    <div className={styles.container}>
          <button className={` ${styles.disabled}`}>
              Previous
      </button>
          <button className={`${styles.active} `}>
              Next
      </button>
    </div>
  );
}

export default Pagination