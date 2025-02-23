"use client"
import React from "react";
import { useForm } from "react-hook-form";
import styles from "../../../form.module.css";
import { RegionsApi } from "@/data/Endpoints/regions";
import { useRouter } from "next/navigation";

function Create() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router  = useRouter()

  const onSubmit = async (data) => {

     const response  = await RegionsApi.postRegion(data)
     console.log("bjhefvjh", response)
     if(response?.status === 201){
         alert("Region created successfully!")
         reset()
         router.back()
     }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Region Name"
          {...register("region_name", { required: "Region Name is required" })}
        />
        {errors.region_name && <p className={styles.error}>{errors.region_name.message}</p>}

        <input
          type="text"
          placeholder="Manager Name"
          {...register("manager_name", { required: "Manager Name is required" })}
        />
        {errors.manager_name && <p className={styles.error}>{errors.manager_name.message}</p>}

        <input
          type="tel"
          placeholder="Phone"
          {...register("phone", {
            required: "Phone is required",
            pattern: { value: /^[0-9]+$/, message: "Invalid phone number" },
          })}
        />
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
}

export default Create;
