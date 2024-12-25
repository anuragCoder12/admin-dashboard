import React from 'react'
import styles from "./table.module.css";
function Table() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Products</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Stock</td>
            <td>Date</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Apple</td>
            <td>100</td>
            <td>1/1/2024</td>
            <td>$100</td>
          </tr>
          <tr>
            <td>Apple</td>
            <td>100</td>
            <td>1/1/2024</td>
            <td>$100</td>
          </tr>
          <tr>
            <td>Apple</td>
            <td>100</td>
            <td>1/1/2024</td>
            <td>$100</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table