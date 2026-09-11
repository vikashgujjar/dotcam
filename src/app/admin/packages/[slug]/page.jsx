'use client';

import { baseurl } from '@/app/component/urls';
import axios from 'axios';
import { useSearchParams ,useRouter} from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { 
  FiCalendar, 
  FiPackage, 
  FiFileText, 
  FiDollarSign, 
  FiMousePointer,
  FiSave,
  FiRefreshCw,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiList,
  FiType,
  FiX
} from 'react-icons/fi';
import Swal from 'sweetalert2';

const Page = ({params:{slug}}) => {
  const route= useRouter()

   const [formData, setFormData] = useState({
      package_duration: '',
      passtype: '',
      pass_des: '',
      price: '',
      buttontext: ''
    });
  const [newDetail, setNewDetail] = useState({ title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [details, setDetails] = useState([]);





    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const fetchpackage=async()=>{
  const response = await axios.get (`${baseurl}/package/${slug}`);
  const data = await response.data;
 
  if(data.success){
    setFormData(data?.pack)
   setDetails(JSON.parse(data?.pack?.pass_details))
  }
}








const handleSubmit = async(e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      pass_details: details
    };

 const response = await axios.post(`${baseurl}/package/edit/${slug}`,finalData)
const data = await response.data;
if(data.success){
  Swal.fire({
  title: "Done",
  text: data.message,
  icon: "success"
});

route.push("/admin/packages")


}
else{


 Swal.fire({
  title: "Oops...",
  text: data.message,
  icon: "error"
});

}
  };

  const handleReset = () => {
    setFormData({
      package_duration: '',
      passtype: '',
      pass_des: '',
      price: '',
      buttontext: ''
    });
    setDetails([]);
    setNewDetail({ title: '', description: '' });
    setEditingIndex(null);
    setIsEditing(false);
  };

   const handleAddDetail = () => {
    if (newDetail.title.trim() && newDetail.description.trim()) {
      if (editingIndex !== null) {
        // Update existing detail
        const updatedDetails = [...details];
        updatedDetails[editingIndex] = newDetail;
        setDetails(updatedDetails);
        setEditingIndex(null);
      } else {
        // Add new detail
        setDetails([...details, newDetail]);
      }
      setNewDetail({ title: '', description: '' });
      setIsEditing(false);
    }
  };

 const handleEditDetail = (index) => {
    setNewDetail(details[index]);
    setEditingIndex(index);
    setIsEditing(true);
  };

  const handleDeleteDetail = (index) => {
    setDetails(details.filter((_, i) => i !== index));
  };

  const handleCancelEdit = () => {
    setNewDetail({ title: '', description: '' });
    setEditingIndex(null);
    setIsEditing(false);
  };






useEffect(()=>{
  fetchpackage()
},[])







  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Package</h1>
          </div>
  
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Duration Field */}
              <div className="space-y-2">
                <label htmlFor="duration" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FiCalendar className="w-4 h-4 text-blue-500" />
                  Package Duration
                </label>
                <div className="relative">
                  <select 
                    name="package_duration" 
                    id="duration"
                    value={formData.package_duration}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white cursor-pointer hover:border-gray-400"
                  >
                    <option value="">---Select Subscription---</option>
                    <option value="monthly">Monthly Subscription</option>
                    <option value="yearly">Yearly Subscription</option>
                  </select>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <FiCalendar className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
  
              {/* Package Type Field */}
              <div className="space-y-2">
                <label htmlFor="passtype" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FiPackage className="w-4 h-4 text-green-500" />
                  Package Type
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="passtype" 
                    id="passtype" 
                    placeholder="Enter Package Type (e.g., Basic, Premium, Pro)"
                    value={formData.passtype}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 placeholder-gray-400 hover:border-gray-400"
                  />
                  <FiPackage className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
  
              {/* Package Description Field */}
              <div className="space-y-2">
                <label htmlFor="pass_des" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FiFileText className="w-4 h-4 text-purple-500" />
                  Package Description
                </label>
                <div className="relative">
                  <textarea 
                    name="pass_des" 
                    id="pass_des" 
                    placeholder="Describe the features and benefits of this package..."
                    value={formData.pass_des}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 placeholder-gray-400 hover:border-gray-400 resize-none"
                  />
                  <FiFileText className="absolute left-4 top-4 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
  
              {/* Price Field */}
              <div className="space-y-2">
                <label htmlFor="price" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FiDollarSign className="w-4 h-4 text-yellow-500" />
                  Package Price
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="price" 
                    id="price" 
                    required
                    placeholder="Enter Package Price (e.g., 29.99)"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 placeholder-gray-400 hover:border-gray-400"
                  />
                  <FiDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
  
              {/* Button Text Field */}
              <div className="space-y-2">
                <label htmlFor="buttontext" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FiMousePointer className="w-4 h-4 text-red-500" />
                  Button Text
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="buttontext" 
                    id="buttontext" 
                    required
                    placeholder="Enter Button Text (e.g., Subscribe Now, Get Started)"
                    value={formData.buttontext}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 placeholder-gray-400 hover:border-gray-400"
                  />
                  <FiMousePointer className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
  
           
         <section className="border-t pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FiList className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Package Features</h2>
                    <p className="text-sm text-gray-600">Add key features and details of your package</p>
                  </div>
                </div>
  
              
                <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <FiType className="w-4 h-4 text-blue-500" />
                        Feature Title
                      </label>
                      <input
                        type="text"
                        value={newDetail.title}
                        onChange={(e) => setNewDetail({ ...newDetail, title: e.target.value })}
                        placeholder="Enter feature title"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 bg-white"
                      />
                    </div>
  
                
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <FiList className="w-4 h-4 text-green-500" />
                        Feature Description
                      </label>
                      <input
                        type="text"
                        value={newDetail.description}
                        onChange={(e) => setNewDetail({ ...newDetail, description: e.target.value })}
                        placeholder="Enter feature description"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 placeholder-gray-400 bg-white"
                      />
                    </div>
                  </div>
  
                
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={handleAddDetail}
                      disabled={!newDetail.title.trim() || !newDetail.description.trim()}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex-1"
                    >
                      {isEditing ? (
                        <>
                          <FiSave className="w-4 h-4" />
                          Update Feature
                        </>
                      ) : (
                        <>
                          <FiPlus className="w-4 h-4" />
                          Add Feature
                        </>
                      )}
                    </button>
  
                    {isEditing && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                      >
                        <FiX className="w-4 h-4" />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
  
            
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <span>Added Features</span>
                    {details.length > 0 && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                        {details.length} items
                      </span>
                    )}
                  </h3>
  
                  {details.length === 0 ? (
                   <>
                   </>
                  ) : (
                    <div className="grid gap-3">
                      {details.map((detail, index) => (
                        <div
                          key={index}
                          className="flex items-start justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-200 transition-all duration-200 group"
                        >
                          <div className=" flex-1 flex justify-between">
                            <h4 className="font-semibold text-gray-800 text-sm mb-1">
                              {detail.title}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {detail.description}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              type="button"
                              onClick={() => handleEditDetail(index)}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                              <FiEdit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteDetail(index)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section> 
  
              {/* Form Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium hover:shadow-sm"
                >
                  <FiRefreshCw className="w-4 h-4" />
                  Reset Form
                </button>
                
                <button
                  type="submit"
                  
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium hover:from-blue-600 hover:to-purple-700"
                >
                  <FiSave className="w-4 h-4" />
                  Create Package
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Page;
