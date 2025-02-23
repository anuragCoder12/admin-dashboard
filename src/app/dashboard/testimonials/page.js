"use client";
import React, { useState, useEffect } from "react";

import Search from "@/components/dashboard/search/search";
import ListingTable from "@/components/dashboard/listingTable/table";
import Pagination from "@/components/dashboard/pagination/pagination";
import { RegionsApi } from "@/data/Endpoints/regions";
import TableHead from "@/components/dashboard/listingTable/tableHead";
import Link from "next/link";
import { TestimonialsApi } from "@/data/Endpoints/testimoanials";
import TableBody from "@/components/dashboard/listingTable/tableBody";
import styles from "./testimonials.module.css";
function Testimonials() {
  const tableHeadings = [" Name", "title"];
  const [paginationCount, setPaginationCount] = useState(6);
  const [dataLength, setDataLength] = useState(0);
  const [initialPaginationCount, setInitialPaginationCount] = useState(0);
  const [listItems, setListItems] = useState([]);
  const fetchRegions = async () => {
    const res = await TestimonialsApi.getTestimonials();
    setDataLength(res?.data?.data?.length);
    setListItems(res?.data?.data);
  };
  useEffect(() => {
    fetchRegions();
  }, []);
  const handleDelete = async (id) => {
    const res = await TestimonialsApi.deleteTestimonials(id)
      if(res.status === 200){
        alert("Region deleted successfully!")
        window.location.reload()
      }
  }
console.log("first, listItems", dataLength)
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search Products" />
        <Link href="/dashboard/testimonials/create" className={styles.addButton}>Add items</Link>
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
      route={"testimonials"}
                key={i}
                id={item._id}
                feild_1={item.title}
                feild_2={item.name}
                
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

export default Testimonials;
