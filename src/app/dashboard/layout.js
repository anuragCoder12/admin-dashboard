import React from "react";
import Navbar from "@/components/dashboard/navBar/navbar";
import Sidebar from "@/components/dashboard/sideBar/sidebar";
import styles from "../../components/dashboard/dashboard.module.css"
function Layout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Navbar />
        {children}
      </div>
    </div>
  );
}

export default Layout;
