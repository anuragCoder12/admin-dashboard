"use client"
import Link from 'next/link'
import React from 'react'
import styles from "./menuLink.module.css";
import { usePathname } from 'next/navigation';
function MenuLink({ item }) {
    const pathname = usePathname()
  return (
    <>
      <Link href={item.link} className={`${styles.container} ${pathname === item.link && styles.active}`}>
        <span>{item.icon}</span>
        <span>{item.name}</span>
      </Link>
    </>
  );
}

export default MenuLink