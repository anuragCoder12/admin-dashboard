import React from 'react'
import styles from "./table.module.css";
import TableBody from './tableBody';
function TableHead({tableHeadings, listItems, paginationCount, initialPaginationCount, deleteId}) {
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
        {
            listItems && listItems.slice(initialPaginationCount, paginationCount).map((item, i) => (

                <TableBody
                deleteId={deleteId}
                route={"regions"}
                key={i}
                id={item._id}
                feild_1={item.region_name}
                feild_2={item.manager_name}
                feild_3={item.phone}
                
                />
            ))
        }
      </table>
    </div>
  );
}

export default TableHead