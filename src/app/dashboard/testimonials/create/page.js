"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../../form.module.css";
import { useRouter } from "next/navigation";
import { TestimonialsApi } from "@/data/Endpoints/testimoanials";

function Create() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "thumb_image" && data.thumb_image?.[0]) {
        formData.append(key, data.thumb_image[0]); // File Upload
      } else {
        formData.append(key, data[key]);
      }
    });
setLoading(true)
    const response = await TestimonialsApi.postTestimonials(formData);
    console.log(response);
    setLoading(false);
    if(response?.status === 201){
      alert("Testimonial created successfully!")
      reset()
      router.back()
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Type (Text/File) */}
        <select
          {...register("type", { required: "Type is required" })}
          onChange={(e) => setSelectedType(e.target.value)} // Update state on change
        >
          <option value="">Select Type</option>
          <option value="text">Text</option>
          <option value="file">File</option>
        </select>
        {errors.type && <p className={styles.error}>{errors.type.message}</p>}

        {/* Title */}
        <input
          {...register("title", { required: "Title is required" })}
          type="text"
          placeholder={errors.title ? "Title is required" : "Enter title"}
        />

        {/* Description */}
        <textarea {...register("description")} placeholder="Enter description"></textarea>

        {/* Show Thumbnail Image input only when "file" is selected */}
        {selectedType === "file" && (
          <>
            <input {...register("thumb_image", { required: selectedType === "file" })} type="file" accept="image/*" />
            {errors.thumb_image && <p className={styles.error}>Thumbnail image is required</p>}
          </>
        )}

        {/* Name */}
        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          placeholder={errors.name ? "Name is required" : "Enter name"}
        />

        {/* Designation */}
        <input {...register("designation")} type="text" placeholder="Enter designation" />

        {/* Company Name */}
        <input {...register("company_name")} type="text" placeholder="Enter company name" />

        {/* Place */}
        <input {...register("place")} type="text" placeholder="Enter place" />
        <input {...register("link")} type="text" placeholder="Enter link" />

        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
}

export default Create;
