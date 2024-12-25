"use client";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";

function Navbar() {
  const pathname = usePathname();
  return (
    <div className={styles.container}>
      <div className={styles.pathTitle}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className={styles.search}>
          <IoSearch />
          <input type="text" placeholder="Search..." className={styles.input} />
        </div>
        <div className={styles.icons}>
          <IoMdNotifications />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
