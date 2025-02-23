"use client";
import React, { useState, useEffect } from "react";
import styles from "./category.module.css";
import Search from '@/components/dashboard/search/search';
import ListingTable from '@/components/dashboard/listingTable/table';
import Pagination from '@/components/dashboard/pagination/pagination';
import { ProductsApi } from "@/data/Endpoints/products";
import TableBody from "@/components/dashboard/listingTable/tableBody";
import { TestimonialsApi } from "@/data/Endpoints/testimoanials";
import Link from "next/link";
import { CategoryApi } from "@/data/Endpoints/category";
function Category() {
  const tableHeadings = [ "Name"];
  const [paginationCount, setPaginationCount] = useState(6);
  const [dataLength, setDataLength] = useState(0);
  const [initialPaginationCount, setInitialPaginationCount] = useState(0);
  const [listItems, setListItems] = useState([]);
  const fetchList = async () => {
    const res = await CategoryApi.getCat();
    setDataLength(res?.data?.categories?.length);
    setListItems(res?.data?.categories);
  };
  useEffect(() => {
    fetchList();
  }, []);
  const handleDelete = async (id) => {
    console.log("the id is", id)
    const res = await CategoryApi.deleteCat(id)
      if(res.status === 200){
        alert("Region deleted successfully!")
        window.location.reload()
      }
  }
  console.log("jijikj", listItems)
  return (
      <div className={styles.container}>
        <div className={styles.top}>
          <Search placeholder="Search Products" />
          <Link href="/dashboard/category/create" className={styles.addButton}>Add items</Link>
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

export default Category