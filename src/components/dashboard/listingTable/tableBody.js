"use client"
import React,  { useEffect } from "react";
import styles from "./table.module.css";
import Link from "next/link";
import { RegionsApi } from "@/data/Endpoints/regions";
import { useRouter } from "next/navigation";
function TableBody({ feild_1, feild_2, feild_3, feild_4, id, route, deleteId }) {
  const router = useRouter()
  const handleDelete  = async (id) => {
    deleteId(id)
  }
  useEffect(() => {

  },[])
  console.log("sjsdawo", feild_1)
  return (
    <tbody>
    
        <tr>
          {feild_1 && <td>{feild_1}</td>}
          {feild_2 && <td>{feild_2}</td>}
          {feild_3 && <td>{feild_3}</td>}
          {feild_4 && <td>{feild_4}</td>}
          <td>
            <Link href={`/dashboard/${route}/${id}`} className={styles.ViewButton}>View</Link>
            <button onClick={() => handleDelete(id)} className={styles.deleteButton}>Delete</button>
          </td>
        </tr>
   
    </tbody>
  );
}

export default TableBody;
