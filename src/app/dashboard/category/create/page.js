"use client"
import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import styles from "../../../form.module.css";
import { CategoryApi } from '@/data/Endpoints/category';
import { RegionsApi } from '@/data/Endpoints/regions';
function Create() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const [image, setImage] = useState(null);
      const [logo, setLogo] = useState(null);
      const [region, setRegion] = useState([]);
      const [isOpen, setIsOpen] = useState(false);
      const [selectedItems, setSelectedItems] = useState([]);
      const [regId, setRegId] = useState([]);
      const fetchRegion = async () => {
        const res = await RegionsApi.getRegions();
        setRegion(res?.data);
      };
      useEffect(() => {
        fetchRegion();
      },[])

      const toggleItem = (item, id) => {
        setSelectedItems((prev) =>
          prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
        setRegId((prev) =>
          prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
        // setValue("regions", regId);
      };
console.log("snnds", logo)
const handleSubmitForm = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("image", image);
    formData.append("logo", logo);
    formData.append("regions", JSON.stringify(regId));
    try {
        const res = await CategoryApi.postCat(formData)
        if(res.status === 201){
            window.location.reload()
        }
    } catch (error) {
        console.log(" category not postedq", error)
    }
}

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)} >
        <input
          type="text"
          placeholder="category Name"
          {...register("name", { required: "Region Name is required" })}
        />
        

  <textarea
          name="description"
          rows="16"
          placeholder="Product Description"
          {...register("description")}
        ></textarea>

        <input
          type="file"
          placeholder="image"
          {...register("image")}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
         type="file"
         onChange={(e) => setLogo(e.target.files[0])}
         />

        <div className={styles.dropdownContainer}>
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
        </div>


        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  )
}

export default Create