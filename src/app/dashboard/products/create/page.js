import React from 'react'
import styles from "../[slug]/productDetails.module.css";
function Create() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input type="text" placeholder="Product Name" name="title" />
        <select name="status" id="status">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <input type="text" placeholder="Product Price" name="price" />
        <input type="file" placeholder="Product Image" name="image" />
        <textarea
          name="description"
          rows="16"
          placeholder="Product Description"
        ></textarea>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Create