"use client";
import React, { useState, useEffect } from "react";
import styles from "./products.module.css";
import Search from '@/components/dashboard/search/search';
import ListingTable from '@/components/dashboard/listingTable/table';
import Pagination from '@/components/dashboard/pagination/pagination';
import { ProductsApi } from "@/data/Endpoints/products";
import TableBody from "@/components/dashboard/listingTable/tableBody";
import { TestimonialsApi } from "@/data/Endpoints/testimoanials";
import Link from "next/link";
function Products() {
  const tableHeadings = [ "Product", "Description", "Priority"];
  const [paginationCount, setPaginationCount] = useState(6);
  const [dataLength, setDataLength] = useState(0);
  const [initialPaginationCount, setInitialPaginationCount] = useState(0);
  const [listItems, setListItems] = useState([]);
  const fetchList = async () => {
    const res = await ProductsApi.getProducts();
    console.log(res)
    setDataLength(res?.data?.data?.length);
    setListItems(res?.data?.data);
  };
  useEffect(() => {
    fetchList();
  }, []);
  const handleDelete = async (id) => {
    console.log("the id is", id)
    const res = await ProductsApi.deleteProduct(id)
      if(res.status === 200){
        alert("Region deleted successfully!")
        window.location.reload()
      }
  }
  return (
      <div className={styles.container}>
        <div className={styles.top}>
          <Search placeholder="Search Products" />
          <Link href="/dashboard/products/create" className={styles.addButton}>Add items</Link>
        </div>
        <div className={styles.table}>
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
                deleteId={handleDelete}
      route={"products"}
                key={i}
                id={item._id}
                feild_1={item.name}
                feild_3={item.description}
                feild_4={item?.priority}
                
                />
            ))
        }
      </table>
    </div>
      </div>
      <Pagination
        initialPaginationCount={initialPaginationCount}
        dataLength={dataLength}
        paginationCount={paginationCount}
        setInitialPaginationCount={setInitialPaginationCount}
        setPaginationCount={setPaginationCount}
      />
      </div>
  );
}

export default Products