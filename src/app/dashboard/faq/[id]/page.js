"use client";
import { RegionsApi } from "@/data/Endpoints/regions";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../../form.module.css";
import { FaqApi } from "@/data/Endpoints/faq";

function Detail() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!id) return;

    const fetchRegion = async () => {
      try {
        const res = await FaqApi.getSingleFaq(id);
        console.log(res?.data?.data)
        reset(res?.data?.data); 
      } catch (error) {
        console.error("Region fetch error:", error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchRegion();
  }, [id, router, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await FaqApi.updateFaq(id, data);
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
          placeholder="Question"
          {...register("question")}
        />

        <input
          type="text"
          placeholder="Answer"
          {...register("answer")}
        />

        

        <button type="submit" className={styles.button}>Update Region</button>
      </form>
    </div>
  );
}

export default Detail;
