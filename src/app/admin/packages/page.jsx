'use client';

import Loader from '@/app/component/Loader';
import { baseurl } from '@/app/component/urls';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MdEdit ,MdDeleteSweep} from "react-icons/md";


const Page = () => {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [selectedCount, setSelectedCount] = useState(packages[0]?.coutnumber || "");


  const fetchPackage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}/package`);
      const data = response.data;
      setPackages(data.data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };


  const handeldelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this package?");
  if (!confirmDelete) return;

  try {
    setLoading(true); // Start loading
    const response = await axios.delete(`${baseurl}/package/${id}`);
    const data = response.data;

    if (data.success) {
      fetchPackage(); 
    } else {
      alert("Failed to delete package.");
    }
  } catch (error) {
    console.error("Delete error:", error);
    alert("An error occurred while deleting.");
  } finally {
    setLoading(false); // Stop loading
  }
};


const handleSelectChange = async(count,id)=>{

try {
  
const response = await axios.put(`${baseurl}/package/updatecount`,{id , count});
const data = await response.data;
if(data.success){
  fetchPackage()
}



} catch (error) {
  
}


}






  useEffect(() => {
    fetchPackage();
  }, []);

  return (
    <>
      {!loading && (
        <div className="p-5">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Packages</h1>
            <Link
              href="create"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition"
            >
              Create
            </Link>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto shadow border border-gray-200 rounded-lg">
            <table className="min-w-full bg-white text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Duration</th>
                  <th className="px-6 py-3">Price</th>
                   <th className="px-6 py-3">Count</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg) => (
                  <tr key={pkg.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{pkg.id}</td>
                    <td className="px-6 py-4">{pkg.passtype}</td>
                    <td className="px-6 py-4">{pkg.package_duration}</td>
                    <td className="px-6 py-4">${pkg.price}</td>
                    <td className="px-6 py-4">

    <select
    value={pkg.coutnumber}
    onChange={(e) => {
     
      handleSelectChange(e.target.value,pkg.id); // run your function
    }}
    name="packageSelect"
    id="packageSelect"
    className="border rounded px-2 py-1"
  >
    {packages.map((pkg) => (
      <option key={pkg.id} value={pkg.coutnumber}>
        {pkg.coutnumber}
      </option>
    ))}
  </select>



                    </td>
                    <td className="px-6 py-4">{pkg.pass_des}</td>
                    <td className="px-6 py-4 flex gap-3 text-xl">
                      <Link
                        href={`${pkg.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        <MdEdit />
                      </Link>

                      <button onClick={()=>handeldelete(pkg.id)} className='text-red-600 cursor-pointer'><MdDeleteSweep /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {loading && <Loader />}
    </>
  );
};

export default Page;
