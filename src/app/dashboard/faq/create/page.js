"use client"
import React from "react";
import { useForm } from "react-hook-form";
import styles from "../../../form.module.css";
import { RegionsApi } from "@/data/Endpoints/regions";
import { useRouter } from "next/navigation";
import { FaqApi } from "@/data/Endpoints/faq";

function Create() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router  = useRouter()

  const onSubmit = async (data) => {

     const response  = await FaqApi.postFaq(data)
     console.log("bjhefvjh", response)
     if(response?.status === 201){
         alert("Faq created successfully!")
         reset()
         router.back()
     }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Question"
          {...register("question")}
        />
        {errors.region_name && <p className={styles.error}>{errors.region_name.message}</p>}

        <input
          type="text"
          placeholder="Answer"
          {...register("answer")}
        />


        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
}

export default Create;
