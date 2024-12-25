import React from "react";
import { FaGlobeAmericas } from "react-icons/fa";
import styles from "./card.module.css";

function Card() {
  return (
    <div className={styles.container}>
      <FaGlobeAmericas size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>Total Users</span>
        <span className={styles.number}>100+</span>
        <span className={styles.details}>
          <span className={styles.possitive}>10.25%</span>
         more sales in this year
        </span>
      </div>
    </div>
  );
}

export default Card;
