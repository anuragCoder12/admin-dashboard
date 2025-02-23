"use client";
import React, { useState, useEffect } from "react";
import styles from "./regions.module.css";
import Search from "@/components/dashboard/search/search";
import ListingTable from "@/components/dashboard/listingTable/table";
import Pagination from "@/components/dashboard/pagination/pagination";
import { RegionsApi } from "@/data/Endpoints/regions";
import TableHead from "@/components/dashboard/listingTable/tableHead";
import Link from "next/link";
function Regions() {
  const tableHeadings = ["Region Name", "Manager Name", "Phone"];
  const [paginationCount, setPaginationCount] = useState(6);
  const [dataLength, setDataLength] = useState(0);
  const [initialPaginationCount, setInitialPaginationCount] = useState(0);
  const [regions, setRegions] = useState([]);
  const fetchRegions = async () => {
    const res = await RegionsApi.getRegions();
    setDataLength(res?.data?.length);
    setRegions(res?.data);
  };
  useEffect(() => {
    fetchRegions();
  }, []);
  const handleDelete = async (id) => {
    console.log("the id is", id)
    const res = await RegionsApi.deleteRegion(id)
      if(res.status === 200){
        alert("Region deleted successfully!")
        window.location.reload()
      }
  }
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search Products" />
        <Link href="/dashboard/regions/create" className={styles.addButton}>Add items</Link>
      </div>
      <div className={styles.table}>
        <TableHead
        deleteId={handleDelete}
          initialPaginationCount={initialPaginationCount}
          paginationCount={paginationCount}
          tableHeadings={tableHeadings}
          listItems={regions}
        />
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

export default Regions;
