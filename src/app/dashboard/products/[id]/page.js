"use client"
import React, { useState, useEffect } from 'react';
import styles from "./productDetails.module.css";
import { ProductsApi } from '@/data/Endpoints/products';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { RegionsApi } from '@/data/Endpoints/regions';
import Image from 'next/image';
import { CategoryApi } from '@/data/Endpoints/category';

function Detail() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  console.log("gyghuhu", errors)

  const [product, setProduct] = useState(null);
  const [featured, setFeatured] = useState(false);
  const [region, setRegion] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [regId, setRegId] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [defCategory, setDefCategory] = useState([]);
  const router = useRouter();
  const { id } = useParams();

  const handleFeatured = () => {
    const newFeaturedValue = !featured;
    setFeatured(newFeaturedValue);
    setValue("flag", newFeaturedValue);
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
    fetchCategory();
  }, []);

  useEffect(() => {
    if (product?.flag !== undefined) {
      setFeatured(product.flag);
    }
  }, [product]);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await ProductsApi.getSingleProduct(id);
        reset(res?.data?.data);
        setProduct(res?.data?.data);
   setDefCategory(res?.data?.data?.category);

console.log("sadwqa", res?.data?.data?.category)
        
      } catch (error) {
        console.error("Product fetch error:", error);
        router.push("/404");
      }
    };

    fetchProduct();
  }, [id, router, reset]);

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("priority", data.priority);
      formData.append("size", data.size);
      formData.append("length", data.length);
      formData.append("grade", data.grade);
      formData.append("description", data.description);
      formData.append("flag", featured);
      
      // Handle file uploads
      if (data.logo[0]) {
        formData.append("logo", data.logo[0] || product?.logo);
      }
      if (data.image[0]) {
        formData.append("image", data.image[0] || product?.image);
      }

      // Update Product API Call
      await ProductsApi.updateProduct(id, formData);
      alert("Product updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Product update failed!");
    }
  };
console.log("a,alaa", defCategory)
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Product Name"
          {...register("name", { required: true })}
        />
        {errors.name && <p className={styles.error}>Product Name is required</p>}

        <select {...register("category", { required: true })}>
          <option disabled defaultValue={defCategory}>Select Category</option>
          {category.map(
            (cat, i) => (
              <option key={i} value={cat?._id}>{cat?.name}</option>
            )
          )}
        </select>
        {errors.category && <p className={styles.error}>Category is required</p>}

        <input type="number" placeholder="Priority" {...register("priority")} />
        <input type="text" placeholder="Size" {...register("size")} />
        <input type="text" placeholder="Length" {...register("length")} />
        <input type="text" placeholder="Grade" {...register("grade")} />

        <input type="file" {...register("logo")} />
        {product?.logo && (
          <Image src={product?.logo} alt="logo" width={100} height={100} />
        )}

        <input type="file" {...register("image")} />
        {product?.image && (
          <Image src={product?.image} alt="logo" width={100} height={100} />
        )}

        <textarea
          placeholder="Product Description"
          {...register("description")}
          rows="5"
        ></textarea>
        {errors.description && (
          <p className={styles.error}>Description is required</p>
        )}

        <div className={styles.featuredContainer}>
          <p>Featured</p>
          <div onClick={handleFeatured} className={styles.featured}>
            <div className={featured ? styles.active : styles.circle} />
          </div>
        </div>

        <button type="submit" className={styles.button}>Update Product</button>
      </form>
    </div>
  );
}

export default Detail;
