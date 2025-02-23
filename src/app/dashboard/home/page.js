"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "../../form.module.css";

import { Homepi } from "@/data/Endpoints/home";

function HomePage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [s1VideoFile, setS1VideoFile] = useState(null);
  const [s2Image1File, setS2Image1File] = useState(null);
  const [s2Image2File, setS2Image2File] = useState(null);
  const [s3VideoFile, setS3VideoFile] = useState(null);
  const [satisfiedVideoFile, setSatisfiedVideoFile] = useState(null);
  const [existingData, setExistingData] = useState({});
  const [existings1_video, setExistings1_video] = useState("");
  const [existings2_image1, setExistings2_image1] = useState("");
  const [existings2_image2, setExistings2_image2] = useState("");
  const [existings3_video, setExistings3_video] = useState("");
  const [existingsatisfied_video, setExistingsatisfied_video] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Homepi.get();
        if (response.data) {
          const data = response.data.data;
          setExistingData(data);
          setValue("s1_title", data.s1_title || "");
          setValue("s1_description", data.s1_description || "");
          setValue("s1_trust", data.s1_trust || "");
          setValue("s2_desc", data.s2_desc || "");
          setValue("featured_heading", data.featured_heading || "");
          setValue("featured_desc", data.featured_desc || "");
          setValue("s4_icon_title", data.s4_icon_title || "");
          setValue("satisfied_title", data.satisfied_title || "");
          
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setValue]);
console.log("sfzkfos", existingData?.s1_video)
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("s1_title", data.s1_title);
      formData.append("s1_description", data.s1_description);
      formData.append("s1_trust", data.s1_trust);
      formData.append("s2_desc", data.s2_desc);
      formData.append("featured_heading", data.featured_heading);
      formData.append("featured_desc", data.featured_desc);
      formData.append("s4_icon_title", data.s4_icon_title);
      formData.append("satisfied_title", data.satisfied_title);
console.log("nskfnd", s1VideoFile, s2Image1File, s2Image2File, s3VideoFile, satisfiedVideoFile)
       formData.append("s1_video", s1VideoFile || existingData?.s1_video);
    formData.append("s2_image1", s2Image1File || existingData?.s2_image1);
      formData.append("s2_image2", s2Image2File || existingData?.s2_image2);
      formData.append("s3_video", s3VideoFile || existingData?.s3_video);
      formData.append("satisfied_video", satisfiedVideoFile || existingData?.satisfied_video);

      setLoading(true);
      const response = await Homepi.post(formData);
      console.log("Success:", response);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          type="text"
          placeholder="Section 1 Title"
          {...register("s1_title", { required: "Section 1 Title is required" })}
        />
        {errors.s1_title && <span>{errors.s1_title.message}</span>}

        <input
          type="text"
          placeholder="Section 1 Description"
          {...register("s1_description", { required: "Section 1 Description is required" })}
        />
        {errors.s1_description && <span>{errors.s1_description.message}</span>}

        <input
          type="text"
          placeholder="Section 1 Trust"
          {...register("s1_trust", { required: "Section 1 Trust is required" })}
        />
        {errors.s1_trust && <span>{errors.s1_trust.message}</span>}

<div>
{existingData.s1_video && (
  <div>
    <p>Existing Section 1 Video:</p>
    <video width="300" controls>
      <source src={existingData.s1_video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
)}

{/* Display selected file name if chosen */}
<p>{s1VideoFile ? `Selected File: ${s1VideoFile.name}` : "No file chosen"}</p>

<input
  type="file"
  accept="video/*"
  {...register("s1_video")}
  onChange={(e) => setS1VideoFile(e.target.files[0])}
/>
</div>
       
        {errors.s1_video && <span>{errors.s1_video.message}</span>}

        <input
          type="text"
          placeholder="Section 2 Description"
          {...register("s2_desc", { required: "Section 2 Description is required" })}
        />
        {errors.s2_desc && <span>{errors.s2_desc.message}</span>}

        {existingData.s2_image1 && (
          <div>
            <p>Existing Section 2 Image 1:</p>
            <img src={existingData.s2_image1} alt="Section 2 Image 1" width="300" />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          {...register("s2_image1")}
          onChange={(e) => setS2Image1File(e.target.files[0])}
        />
        {errors.s2_image1 && <span>{errors.s2_image1.message}</span>}

        {existingData.s2_image2 && (
          <div>
            <p>Existing Section 2 Image 2:</p>
            <img src={existingData.s2_image2} alt="Section 2 Image 2" width="300" />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          {...register("s2_image2")}
          onChange={(e) => setS2Image2File(e.target.files[0])}
        />
        {errors.s2_image2 && <span>{errors.s2_image2.message}</span>}

        {existingData.s3_video && (
          <div>
            <p>Existing Section 3 Video:</p>
            <video width="300" controls>
              <source src={existingData.s3_video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        <input
          type="file"
          accept="video/*"
          {...register("s3_video")}
          onChange={(e) => setS3VideoFile(e.target.files[0])}
        />
        {errors.s3_video && <span>{errors.s3_video.message}</span>}

        <input
          type="text"
          placeholder="Featured Heading"
          {...register("featured_heading", { required: "Featured Heading is required" })}
        />
        {errors.featured_heading && <span>{errors.featured_heading.message}</span>}

        <input
          type="text"
          placeholder="Featured Description"
          {...register("featured_desc", { required: "Featured Description is required" })}
        />
        {errors.featured_desc && <span>{errors.featured_desc.message}</span>}

        <input
          type="text"
          placeholder="Section 4 Icon Title"
          {...register("s4_icon_title", { required: "Section 4 Icon Title is required" })}
        />
        {errors.s4_icon_title && <span>{errors.s4_icon_title.message}</span>}

        <input
          type="text"
          placeholder="Satisfied Title"
          {...register("satisfied_title", { required: "Satisfied Title is required" })}
        />
        {errors.satisfied_title && <span>{errors.satisfied_title.message}</span>}

        {existingData.satisfied_video && (
          <div>
            <p>Existing Satisfied Video:</p>
            <video width="300" controls>
              <source src={existingData.satisfied_video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        <input
          type="file"
          accept="video/*"
          {...register("satisfied_video")}
          onChange={(e) => setSatisfiedVideoFile(e.target.files[0])}
        />
        {errors.satisfied_video && <span>{errors.satisfied_video.message}</span>}
{/* <select multiple>
  <option value="active">Active</option>
  <option value="inactive">Inactive</option>
</select> */}
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default HomePage;