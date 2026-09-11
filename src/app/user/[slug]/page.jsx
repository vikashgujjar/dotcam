"use client";
import { baseurl, imgurl } from "@/app/component/urls";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";

const page = ({ params: { slug } }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [password, setPassword] = useState();
  const [userLogin, setUserLogin] = useState(false);
  const [allimages, setAllimages] = useState([]);
  const [allvideos, setAllvideos] = useState([]);

  const handelSubmit = async () => {
    if (password.trim() < 3) {
      return;
    }
    const response = await axios.post(
      `${baseurl}/user/login`,
      { password, url: slug },
      {
        withCredentials: true,
      }
    );
    const data = await response.data;

    if (data.success) {
      setUserLogin(true);
    }
  };

  const fetchuser = async () => {
    const response = await axios.get(`${baseurl}/user/auth/loginuser`, {
      withCredentials: true,
    });
    const data = await response.data;
    if (data.success) {
      setUserLogin(true);
      setAllimages(data.img);
      setAllvideos(data.video);
    } else {
      setUserLogin(false);
    }
  };

  useEffect(() => {
    fetchuser();
  }, []);

  console.log(allimages);
  return (
    <div className="h-screen text-white relative">
      {userLogin && (
<div className="p-6">

<div className="">
  <p className="text-center uppercase text-3xl font-bold text-red-800"> --- Image Section ---</p>
        <div className="w-full  grid lg:grid-cols-5 ">



          {allimages?.length > 0 &&
            allimages.map((image, index) => (
              <div key={index}>
              <img src={`${imgurl}/${image.img}`} alt={image.img} />
              </div>
            ))}
        </div>

        </div>


<div>
  <p className="text-center uppercase text-3xl font-bold text-red-800"> --- Video Section ---</p>
        <div className="w-full  grid lg:grid-cols-5 ">

{allvideos?.length > 0 &&
            allvideos.map((video, index) => (
              <div key={index}>
             <video height="600" controls preload="metadata">
                                   <source
                                     src={`${baseurl}/video/stream/${video.video}`} 
                                     type="video/mp4"
                                   />
                                 </video>
              </div>
            ))}

</div>


</div>



        </div>
      )}

      {!userLogin && (
        <div className="fixed w-full h-full bg-gradient-to-br from-black to-gray-900 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Protected Access
              </h1>
              <p className="text-gray-600">
                Please enter password given by admin
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col relative">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={togglePassword ? "text" : "password"}
                    name="password"
                    className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200"
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    placeholder="Enter your password"
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    onClick={() => setTogglePassword(!togglePassword)}
                  >
                    {!togglePassword ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaRegEye size={18} />
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={handelSubmit}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Submit
              </button>
              j
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Contact administrator if you've forgotten your password
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
