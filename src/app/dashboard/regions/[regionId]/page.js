"use client";
import { RegionsApi } from "@/data/Endpoints/regions";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../../form.module.css";

function Detail() {
  const { regionId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!regionId) return;

    const fetchRegion = async () => {
      try {
        const res = await RegionsApi.getSingleRegion(regionId);
        reset(res.data); 
      } catch (error) {
        console.error("Region fetch error:", error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchRegion();
  }, [regionId, router, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await RegionsApi.updateRegion(regionId, data);
      if (res.status === 200) {
        alert("Region updated successfully!");
      } else {
        alert("Failed to update region.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred.");
    }
  };

  if (loading) return <p>Loading...</p>;

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

        <button type="submit" className={styles.button}>Update Region</button>
      </form>
    </div>
  );
}

export default Detail;
