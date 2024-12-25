import React from 'react'
import styles from "./table.module.css";
function ListingTable({tableHeadings, listItems}) {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            {tableHeadings.map((heading, i) => (
              <th key={i}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listItems.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.stock}</td>
              <td>{item.status}</td>
              <td>{item.price}</td>
              <td>
                <button className={styles.ViewButton}>View</button>
                <button className={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListingTable