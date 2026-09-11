"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { baseurl } from "@/app/component/urls";
import Swal from "sweetalert2";
import Loader from "@/app/component/Loader";
import { FiArrowLeft, FiUploadCloud } from "react-icons/fi";
import Link from "next/link";

const EditBlogPage = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [blogId, setBlogId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    auther: "",
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseurl}/blog/${slug}`);
        if (response.data && response.data.success) {
          const blog = response.data.data;
          setBlogId(blog.id);
          setFormData({
            title: blog.title || "",
            auther: blog.auther || "Admin",
            description: blog.description || "",
            image: blog.image || "",
          });
          if (blog.image) {
            setImagePreview(`http://localhost:4000${blog.image}`);
          }
        } else {
          Swal.fire("Error", "Could not load blog details.", "error");
          router.push("/admin/blog");
        }
      } catch (error) {
        console.error("Fetch blog detail error:", error);
        Swal.fire("Error", "Could not connect to api or blog not found.", "error");
        router.push("/admin/blog");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogDetails();
    }
  }, [slug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      Swal.fire("Validation Error", "Title is required.", "error");
      return;
    }

    try {
      setLoading(true);
      const postData = new FormData();
      postData.append("title", formData.title);
      postData.append("auther", formData.auther);
      postData.append("description", formData.description);
      
      if (imageFile) {
        postData.append("image", imageFile);
      } else {
        postData.append("image", formData.image);
      }

      const response = await axios.put(`${baseurl}/blog/${blogId}`, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        Swal.fire("Success", "Blog updated successfully!", "success");
        router.push("/admin/blog");
      } else {
        Swal.fire("Error", response.data.message || "Failed to update blog.", "error");
      }
    } catch (error) {
      console.error("Update blog error:", error);
      Swal.fire("Error", error.response?.data?.message || "An error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {loading && <Loader />}

      <div className="flex items-center gap-4">
        <Link href="/admin/blog" className="p-2 hover:bg-gray-100 rounded-full transition">
          <FiArrowLeft className="text-xl text-gray-700" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
          <p className="text-gray-500 text-sm">Modify details and update publication.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Blog Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g. Elegant Outdoor Shoot Tips"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Author Name</label>
            <input
              type="text"
              name="auther"
              value={formData.auther}
              onChange={handleInputChange}
              placeholder="e.g. Admin or Writer name"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Image upload */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Blog Cover Image</label>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 hover:border-blue-500 rounded-xl p-6 w-full md:w-1/2 cursor-pointer transition bg-gray-50 hover:bg-blue-50/20 group">
              <FiUploadCloud className="text-3xl text-gray-400 group-hover:text-blue-500 transition mb-2" />
              <span className="text-sm text-gray-600 font-medium">Click to upload new file</span>
              <span className="text-xs text-gray-400 mt-1">PNG, JPG or WEBP (Max 5MB)</span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>

            {imagePreview && (
              <div className="w-full md:w-1/2 space-y-2 text-center md:text-left">
                <span className="text-xs font-semibold text-gray-400 block uppercase">Image Preview / Current Cover</span>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-48 object-cover rounded-xl border border-gray-100 shadow-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Content / Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={8}
            placeholder="Write the full content of the blog post here..."
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
          <Link
            href="/admin/blog"
            className="px-5 py-2.5 border border-gray-200 rounded-full hover:bg-gray-50 transition text-sm font-semibold text-gray-600"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full transition text-sm font-semibold shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlogPage;
