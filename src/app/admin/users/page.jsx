"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import UserPopup from './UserPopup'
import axios from 'axios'
import { baseurl } from '@/app/component/urls'
import { FaUser, FaImage, FaVideo, FaCalendarAlt, FaSyncAlt, FaLink } from 'react-icons/fa';
import { MdDeleteSweep } from "react-icons/md";
import Swal from 'sweetalert2'

const page = () => {
const [creatuser,setCreateuser]=useState(false)
const [userData,setUserData]= useState();


const getUser=async()=>{
  try {
    
    const response = await axios.get(`${baseurl}/user`);
    const data = await response.data
    if(data.success){
      setUserData(data.user)
      
    }
  } catch (error) {
    
  }
}



useEffect(()=>{
  getUser()
},[])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };


  const deleteUser= async(id)=>{
    const response = await axios.delete(`${baseurl}/user/${id}`);
    const data = await response.data;
    if(data.success){
      Swal.fire({
        icon:"success",
        title:"Success",
        text:data.message
        
      })
      getUser()
    }
    else{
      Swal.fire({
        icon:"error",
        title:"Error",
        text:data.message
        
      })

    }
  }




const handleCopy = (url) => {
    const urlToCopy = `${window.location.origin}/user/${url}`;
    navigator.clipboard.writeText(urlToCopy).then(() => {
    }).catch(err => {
      console.error("Failed to copy:", err);
    });
  };


  return (
    <div className="">
 {creatuser && <UserPopup  onClose={setCreateuser}  getUser={getUser}/>}

<div className='p-5'> 


  <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold"> Users</h1>
            <button
            onClick={()=>setCreateuser(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition"
            >
              Create
            </button>
          </div>


          <div className="">
    

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <FaUser className="text-gray-400" />
                  User
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <FaImage className="text-gray-400" />
                  Images
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <FaVideo className="text-gray-400" />
                  Videos
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-400" />
                  Created Date
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Code
              </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
               Link
              </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {userData?.map((user, index) => (
              <tr 
                key={user.id} 
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {user.usercode?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.usercode || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {user.url || 'No URL'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <FaImage className="text-green-500" />
                    <span className="text-sm text-gray-900 font-medium">
                      {user.total_image || 0}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <FaVideo className="text-purple-500" />
                    <span className="text-sm text-gray-900 font-medium">
                      {user.total_video || 0}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {formatDate(user.createdAt)}
                    </span>
                  </div>
                </td>

                {/* MdDeleteSweep */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {user.usercode || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
  <button onClick={()=>handleCopy(user.url)} className=" cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors">
    <FaLink className="w-4 h-4" />
    
  </button>
</td>


                 <td className="px-6 py-4 whitespace-nowrap">
  <button onClick={()=>deleteUser(user.id)} className=" cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200 transition-colors">
    <MdDeleteSweep className="w-4 h-4" />
    Delete
  </button>
</td>
              </tr>
            ))}
          </tbody>
        </table>

        {userData?.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500">No users found</div>
          </div>
        )}
      </div>
    </div>
    </div>
    </div>
  )
}

export default page
