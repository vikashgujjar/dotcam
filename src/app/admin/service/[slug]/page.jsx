"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { baseurl } from "@/app/component/urls";
import Swal from "sweetalert2";
import Loader from "@/app/component/Loader";
import { FiArrowLeft, FiUploadCloud, FiPlus, FiTrash2, FiSave } from "react-icons/fi";
import Link from "next/link";

const EditServicePage = () => {
  const router = useRouter();
  const { slug } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [serviceId, setServiceId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    bennerdis: "",
    otherdis: "",
    service_steps_dis: "",
    service_yt_link: "",
  });

  const [steps, setSteps] = useState([]);
  const [newStep, setNewStep] = useState({ title: "", description: "" });
  
  const [existingImages, setExistingImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseurl}/service/${slug}`);
        if (response.data && response.data.success) {
          const service = response.data.data;
          setServiceId(service.id);
          setFormData({
            title: service.title || "",
            type: service.type || "",
            bennerdis: service.bennerdis || "",
            otherdis: service.otherdis || "",
            service_steps_dis: service.service_steps_dis || "",
            service_yt_link: service.service_yt_link || "",
          });
          
          // Parse steps
          if (service.service_steps_data) {
            setSteps(
              Array.isArray(service.service_steps_data)
                ? service.service_steps_data
                : JSON.parse(JSON.stringify(service.service_steps_data))
            );
          } else {
            setSteps([]);
          }

          // Existing Images
          setExistingImages(service.images || []);
        } else {
          Swal.fire("Error", "Could not load service details.", "error");
          router.push("/admin/service");
        }
      } catch (error) {
        console.error("Fetch service detail error:", error);
        Swal.fire("Error", "Could not connect to API or service not found.", "error");
        router.push("/admin/service");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchServiceDetails();
    }
  }, [slug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImageFiles((prev) => [...prev, ...files]);
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...previews]);
    }
  };

  const removeSelectedImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddStep = () => {
    if (newStep.title.trim() && newStep.description.trim()) {
      setSteps((prev) => [...prev, newStep]);
      setNewStep({ title: "", description: "" });
    }
  };

  const removeStep = (index) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.type.trim() || !formData.bennerdis.trim() || !formData.otherdis.trim() || !formData.service_steps_dis.trim()) {
      Swal.fire("Validation Error", "All fields marked with * are required.", "error");
      return;
    }

    try {
      setLoading(true);
      const postData = new FormData();
      postData.append("title", formData.title);
      postData.append("type", formData.type);
      postData.append("bennerdis", formData.bennerdis);
      postData.append("otherdis", formData.otherdis);
      postData.append("service_steps_dis", formData.service_steps_dis);
      postData.append("service_yt_link", formData.service_yt_link);
      
      // Append steps stringified
      postData.append("service_steps_data", JSON.stringify(steps));

      // Append image files
      if (imageFiles.length > 0) {
        imageFiles.forEach((file) => {
          postData.append("images", file);
        });
      } else {
        // If no new images uploaded, we keep the existing ones
        // Wait, the backend replaces files if req.files.length > 0, otherwise keeps old ones.
        // So if we don't send any files, the backend retains the existing database records.
      }

      const response = await axios.put(`${baseurl}/service/${serviceId}`, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        Swal.fire("Success", "Service updated successfully!", "success");
        router.push("/admin/service");
      } else {
        Swal.fire("Error", response.data.message || "Failed to update service.", "error");
      }
    } catch (error) {
      console.error("Update service error:", error);
      Swal.fire("Error", error.response?.data?.message || "An error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {loading && <Loader />}

      <div className="flex items-center gap-4">
        <Link href="/admin/service" className="p-2 hover:bg-gray-100 rounded-full transition">
          <FiArrowLeft className="text-xl text-gray-700" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Shoot Service</h1>
          <p className="text-gray-500 text-sm">Modify shoot service details and operational workflows.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Service Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g. Wedding Cinematography"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Type/Category */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Category / Type *</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              placeholder="e.g. wedding, cinematic, events"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Banner Description */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Banner Summary *</label>
            <input
              type="text"
              name="bennerdis"
              value={formData.bennerdis}
              onChange={handleInputChange}
              placeholder="Brief summary text showing on the top banner"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Other Description */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Detailed Description *</label>
            <textarea
              name="otherdis"
              value={formData.otherdis}
              onChange={handleInputChange}
              rows={4}
              placeholder="Full details and operational workflows..."
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* YT Link */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Youtube Video Embed URL</label>
            <input
              type="text"
              name="service_yt_link"
              value={formData.service_yt_link}
              onChange={handleInputChange}
              placeholder="e.g. https://www.youtube.com/embed/XXXXXX"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Gallery Image Upload */}
        <div className="space-y-2 border-t pt-6">
          <h3 className="text-lg font-bold text-gray-800">Service Gallery</h3>
          <p className="text-xs text-gray-500">
            Select files to replace the existing gallery. Leave blank to retain current gallery.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 hover:border-blue-500 rounded-xl p-8 cursor-pointer transition bg-gray-50 hover:bg-blue-50/20 group h-40">
              <FiUploadCloud className="text-3xl text-gray-400 group-hover:text-blue-500 transition mb-2" />
              <span className="text-sm text-gray-600 font-medium">Select New Gallery Images</span>
              <input type="file" multiple accept="image/*" onChange={handleImagesChange} className="hidden" />
            </label>

            {/* Previews & Current Photos */}
            <div className="space-y-4">
              {imagePreviews.length > 0 ? (
                <div className="border border-yellow-100 rounded-xl p-4 bg-yellow-50/30 space-y-2 max-h-40 overflow-y-auto">
                  <span className="text-xs font-bold text-yellow-600 block uppercase">
                    New Uploads ({imagePreviews.length}) <span className="font-normal text-gray-400">(Will overwrite current)</span>
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {imagePreviews.map((preview, i) => (
                      <div key={i} className="relative group rounded-lg overflow-hidden border border-gray-200 bg-white">
                        <img src={preview} alt="" className="w-full h-12 object-cover" />
                        <button
                          type="button"
                          onClick={() => removeSelectedImage(i)}
                          className="absolute inset-0 bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                existingImages.length > 0 && (
                  <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 space-y-2 max-h-40 overflow-y-auto">
                    <span className="text-xs font-semibold text-gray-400 block uppercase">Current Gallery ({existingImages.length})</span>
                    <div className="grid grid-cols-4 gap-2">
                      {existingImages.map((img, i) => (
                        <div key={i} className="rounded-lg overflow-hidden border border-gray-200 bg-white">
                          <img src={`http://localhost:4000/uploads/${img}`} alt="" className="w-full h-12 object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Service Steps Section */}
        <div className="space-y-4 border-t pt-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Service Steps</h3>
            <p className="text-xs text-gray-500">Edit procedural steps (milestones) for this service.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Steps Section Description *</label>
            <input
              type="text"
              name="service_steps_dis"
              value={formData.service_steps_dis}
              onChange={handleInputChange}
              placeholder="e.g. How we capture your dream wedding step by step"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Add Step Card */}
          <div className="p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Step Title</label>
              <input
                type="text"
                value={newStep.title}
                onChange={(e) => setNewStep({ ...newStep, title: e.target.value })}
                placeholder="e.g. Consult & Contract"
                className="w-full border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Step Description</label>
              <input
                type="text"
                value={newStep.description}
                onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
                placeholder="e.g. Discussion of timelines and event details"
                className="w-full border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={handleAddStep}
              className="md:col-span-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition self-center"
            >
              <FiPlus /> Add Step
            </button>
          </div>

          {/* Steps List */}
          {steps.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 block uppercase">Current Steps ({steps.length})</span>
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden bg-white">
                {steps.map((st, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 hover:bg-gray-50 transition">
                    <div>
                      <span className="text-xs font-bold text-blue-600 mr-2">Step {idx + 1}</span>
                      <strong className="text-sm text-gray-800">{st.title}</strong>
                      <p className="text-xs text-gray-500 mt-0.5">{st.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeStep(idx)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-md transition text-lg"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
          <Link
            href="/admin/service"
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

export default EditServicePage;
