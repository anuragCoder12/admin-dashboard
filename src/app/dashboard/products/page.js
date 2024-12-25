import React from 'react'
import styles from "./products.module.css";
import Search from '@/components/dashboard/search/search';
import ListingTable from '@/components/dashboard/listingTable/table';
import Pagination from '@/components/dashboard/pagination/pagination';
function Products() {
  const tableHeadings = [ "Product", "Stock", "Status", "Price"];
  const products = [
    {
      name: "Apple",
      stock: "100",
      status: "active",
      price: "$100",
    },
    {
      name: "Apple",
      stock: "100",
      status: "active",
      price: "$100",
    },
    {
      name: "Apple",
      stock: "100",
      status: "active",
      price: "$100",
    }]
  return (
      <div className={styles.container}>
        <div className={styles.top}>
          <Search placeholder="Search Products" />
          <button className={styles.addButton}>Add items</button>
        </div>
        <div className={styles.table}>
          <ListingTable tableHeadings={tableHeadings} listItems={products}/>
      </div>
      <Pagination/>
      </div>
  );
}

export default Products