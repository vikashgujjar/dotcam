"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { baseurl } from "@/app/component/urls";
import { MdEdit, MdDeleteSweep, MdPhotoLibrary } from "react-icons/md";
import Swal from "sweetalert2";
import Loader from "@/app/component/Loader";

const ServiceListPage = () => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}/service`);
      const data = response.data;
      if (data.success) {
        setServices(data.data || []);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this service!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const response = await axios.delete(`${baseurl}/service/${id}`);
          if (response.data.success) {
            Swal.fire("Deleted!", response.data.message || "Service deleted successfully.", "success");
            fetchServices();
          } else {
            Swal.fire("Failed!", "Could not delete the service.", "error");
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
    fetchServices();
  }, []);

  return (
    <div className="p-5">
      {loading && <Loader />}
      
      {!loading && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Services</h1>
            <Link
              href="/admin/service/create"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition text-sm font-semibold"
            >
              Create Service
            </Link>
          </div>

          {/* Services Table */}
          <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider text-xs">Gallery</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider text-xs">Title</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider text-xs">Category/Type</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider text-xs">Steps Count</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider text-xs">YT Link</th>
                    <th className="px-6 py-3 font-semibold uppercase tracking-wider text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 text-gray-700">
                  {services.map((svc) => (
                    <tr key={svc.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          {svc.images && svc.images.length > 0 ? (
                            <div className="flex -space-x-2 overflow-hidden">
                              {svc.images.slice(0, 3).map((img, i) => (
                                <img
                                  key={i}
                                  src={`http://localhost:4000/uploads/${img}`}
                                  alt=""
                                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                                />
                              ))}
                              {svc.images.length > 3 && (
                                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-2 ring-white text-[10px] font-bold text-gray-500">
                                  +{svc.images.length - 3}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">No Images</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {svc.title}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 uppercase tracking-wide">
                          {svc.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {svc.service_steps_data ? (
                          <span className="font-semibold">
                            {Array.isArray(svc.service_steps_data) 
                              ? svc.service_steps_data.length 
                              : Object.keys(JSON.parse(JSON.stringify(svc.service_steps_data))).length} steps
                          </span>
                        ) : (
                          <span className="text-gray-400">0 steps</span>
                        )}
                      </td>
                      <td className="px-6 py-4 max-w-[150px] truncate text-xs text-gray-400">
                        {svc.service_yt_link || "None"}
                      </td>
                      <td className="px-6 py-4 flex gap-4 text-xl">
                        <Link
                          href={`/admin/service/${svc.slug}`}
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="Edit Service"
                        >
                          <MdEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(svc.id)}
                          className="text-red-600 hover:text-red-800 transition cursor-pointer"
                          title="Delete Service"
                        >
                          <MdDeleteSweep />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {services.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No services found. Click "Create Service" to add your first service.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceListPage;
