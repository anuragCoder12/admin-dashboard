import React from 'react'
import styles from "./right.module.css"
function Right() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lorem ipsum</h2>
      <p className={styles.text}>
        text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </div>
  );
}

export default Right;