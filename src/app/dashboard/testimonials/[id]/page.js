"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../../form.module.css";
import { TestimonialsApi } from "@/data/Endpoints/testimoanials";

function Detail() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [thumbImage, setThumbImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!id) return;

    const fetchTestimonial = async () => {
      try {
        const res = await TestimonialsApi.getSingleTestimonial(id);
        const testimonial = res?.data?.data;

        if (testimonial) {
          reset(testimonial);
          setThumbImage(testimonial.thumb_image);
        }
      } catch (error) {
        console.error("Testimonial fetch error:", error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, [id, router, reset]);

  const onSubmit = async (data) => {
    try {
        const formData = new FormData();
        const isFilePresent = data.thumb_image?.[0]; // Check if a new file is selected
  
        Object.keys(data).forEach((key) => {
          if (key === "thumb_image" && isFilePresent) {
            formData.append(key, data.thumb_image[0]); // Append file
          } else {
            formData.append(key, data[key]);
          }
        });
  
        formData.append("type", isFilePresent ? "file" : "text"); 

      const res = await TestimonialsApi.updateTestimonials(id, formData);
      if (res.status === 200) {
        alert("Testimonial updated successfully!");
      } else {
        alert("Failed to update testimonial.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <input
          {...register("title", { required: "Title is required" })}
          type="text"
          placeholder="Enter title"
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}

        <textarea {...register("description")} placeholder="Enter description"></textarea>

        {thumbImage && (
            <>
          <div>
            <img src={thumbImage} alt="Thumbnail" width="150" />
          </div>
        <input {...register("thumb_image")} type="file" accept="image/*" />
            </>
        )}

        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          placeholder="Enter name"
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}

        <input {...register("designation")} type="text" placeholder="Enter designation" />

        <input {...register("company_name")} type="text" placeholder="Enter company name" />

        <input {...register("place")} type="text" placeholder="Enter place" />

        <button type="submit" className={styles.button}>
          {loading ? "Submitting..." : "Update Testimonial"}
        </button>
      </form>
    </div>
  );
}

export default Detail;
