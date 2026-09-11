"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { baseurl } from "@/app/component/urls";
import { MdEdit, MdDeleteSweep } from "react-icons/md";
import Swal from "sweetalert2";
import Loader from "@/app/component/Loader";

const BlogListPage = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}/blog`);
      const data = response.data;
      if (data.success) {
        setBlogs(data.data || []);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this blog post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const response = await axios.delete(`${baseurl}/blog/${id}`);
          if (response.data.success) {
            Swal.fire("Deleted!", response.data.message || "Blog deleted successfully.", "success");
            fetchBlogs();
          } else {
            Swal.fire("Failed!", "Could not delete the blog.", "error");
          }
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire("Error!", "An error occurred during deletion.", "error");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-5">
      {loading && <Loader />}
      
      {!loading && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
            <Link
              href="/admin/blog/create"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition text-sm font-semibold"
            >
              Create Blog
            </Link>
          </div>

          {/* Blogs Grid or Table */}
          <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider text-xs">Image</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider text-xs">Title</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider text-xs">Author</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider text-xs">Created Date</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 text-gray-700">
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {blog.image ? (
                          <img
                            src={`http://localhost:4000${blog.image}`}
                            alt={blog.title}
                            className="w-16 h-10 object-cover rounded border border-gray-100"
                          />
                        ) : (
                          <div className="w-16 h-10 bg-gray-100 flex items-center justify-center text-xs text-gray-400 rounded">
                            No Img
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 max-w-xs truncate">
                        {blog.title}
                      </td>
                      <td className="px-6 py-4">{blog.auther || "Admin"}</td>
                      <td className="px-6 py-4">
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 flex gap-4 text-xl">
                        <Link
                          href={`/admin/blog/${blog.slug}`}
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="Edit Blog"
                        >
                          <MdEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="text-red-600 hover:text-red-800 transition cursor-pointer"
                          title="Delete Blog"
                        >
                          <MdDeleteSweep />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {blogs.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No blog posts found. Click "Create Blog" to add your first post.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogListPage;
