"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "../[id]/productDetails.module.css";
import { RegionsApi } from "@/data/Endpoints/regions";
import { ProductApi, ProductsApi } from "@/data/Endpoints/products";
import { CategoryApi } from "@/data/Endpoints/category";

function Create() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  
  const [featured, setFeatured] = useState(false);
  const [region, setRegion] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [regId, setRegId] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleFeatured = () => {
    const newFeaturedValue = !featured; // Toggle the value
    setFeatured(newFeaturedValue); // Update the state
    setValue("flag", newFeaturedValue)
  };

  const fetchRegion = async () => {
    const res = await RegionsApi.getRegions();
    setRegion(res?.data);
  };
const fetchCategory = async () => {
  const res = await CategoryApi.getCat();
 setCategory(res?.data?.categories)

};
  useEffect(() => {
    fetchRegion();
    fetchCategory()
  }, []);

  const toggleItem = (item, id) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
    setRegId((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    // setValue("regions", regId);
  };
  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "logo" || key === "image") {
        formData.append(key, data[key][0]); // Append files
      } else if (key === "flag") {
        formData.append(key, data[key]); // Append `flag` as a boolean
      } else {
        formData.append(key, data[key]); // Append other fields
      }
    });
  
    // Append `regions` as a JSON string
    // formData.append("regions", JSON.stringify(regId));
  
    console.log("FormData being sent:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {
      await ProductsApi.postProduct(formData);
      alert("Product created successfully");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Product Name" {...register("name", { required: true })} />
        <select {...register("category", { required: true })}>
          <option disabled value="">Select Category</option>
          {category && category.map(
            (cat, i) => (
              <option key={i} value={cat._id}>{cat?.name}</option>
            )
          )}
        </select>
        <input type="number" placeholder="Priority" {...register("priority")} />
        <input type="text" placeholder="Size" {...register("size")} />
        <input type="text" placeholder="Length" {...register("length")} />
        <input type="text" placeholder="Grade" {...register("grade")} />
        <input type="text" placeholder="Type" {...register("type")} />
        <input type="file" {...register("image", { required: true })} />

        {/* <div className={styles.dropdownContainer}>
          <div className={styles.inputBox} onClick={() => setIsOpen(!isOpen)}>
            {selectedItems.length > 0 ? selectedItems.join(", ") : "Select items"}
          </div>
          {isOpen && (
            <div className={styles.dropdownList}>
              {region.map((item) => (
                <div
                  key={item?._id}
                  onClick={() => toggleItem(item?.region_name, item?._id)}
                  className={`${styles.dropdownItem} ${
                    selectedItems.includes(item?.region_name) ? styles.selectedItem : ""
                  }`}
                >
                  {item?.region_name}
                </div>
              ))}
            </div>
          )}
        </div> */}

        <textarea placeholder="Product Description" {...register("description", { required: true })} rows="5"></textarea>
        <div className={styles.featuredContainer}>
          <p>Featured</p>
          <div onClick={handleFeatured} className={styles.featured}>
            <div className={featured ? styles.active : styles.circle} />
          </div>
        </div>
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
}

export default Create;
