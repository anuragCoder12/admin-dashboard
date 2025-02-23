"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "../../form.module.css";
import { TestimonialPageApi } from "@/data/Endpoints/testimonialPage";

function TestimonialPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [existingVideo, setExistingVideo] = useState(""); // Store existing video URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TestimonialPageApi.getTestimonialPage();
        console.log(response?.data?.data,"gyfrdd");
        if (response.data) {
          setValue("title", response?.data?.data?.title || "");
          setExistingVideo(response?.data?.data?.video || ""); 
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      
     
        formData.append("video", videoFile || existingVideo);
        setLoading(true);
      const response = await TestimonialPageApi.postTestimonialPage(formData);
      console.log("Success:", response);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={styles.container}>
    
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <span>{errors.title.message}</span>}

          {/* Show existing video if available */}
          {existingVideo && (
            <div>
              <p>Existing Video:</p>
              <video width="300" controls>
                <source src={existingVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          <input
            type="file"
            accept="video/*"
            {...register("video")}
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
          {errors.video && <span>{errors.video.message}</span>}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
    
    </div>
  );
}

export default TestimonialPage;
