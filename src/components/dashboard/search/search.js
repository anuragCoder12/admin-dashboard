import React from 'react'
import styles from "./search.module.css";
import { IoSearch } from 'react-icons/io5';
function Search({placeholder}) {
  return (
    <div className={styles.search}>
      <IoSearch />
      <input type="text" placeholder={placeholder} className={styles.input} />
    </div>
  );
}

export default Search