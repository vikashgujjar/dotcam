"use client";
import { baseurl, imgurl } from "@/app/component/urls";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegImage, FaImage, FaUpload } from "react-icons/fa";
import { IoVideocam, IoVideocamOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { RxVideo } from "react-icons/rx";

const page = ({ params }) => {
  const [toggle, setToggle] = useState("image");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectVideo, setSelectVideo] = useState();
  const [allImage, setAllImage] = useState();
  const [allVideo, setAllVideo] = useState();

  console.log(allVideo);

  const removeImage = (index) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const fetchuser = async (slug) => {
    const response = await axios.get(`${baseurl}/user/${slug}`);
    const data = await response.data;
  };

  const fetchImg = async (slug) => {
    try {
      const response = await axios.get(`${baseurl}/image/${slug}`);
      const data = await response.data;
      if (data.success) {
        setAllImage(data.images);
      }
    } catch (error) {}
  };
  const fetchVideo = async (slug) => {
    try {
      const response = await axios.get(`${baseurl}/video/${slug}`);
      const data = await response.data;
      if (data.success) {
        setAllVideo(data.videos);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchuser(params.slug);
    fetchImg(params.slug);
  }, []);

  useEffect(() => {
    if (toggle == "image") {
      fetchImg(params.slug);
    } else {
      fetchVideo(params.slug);
    }
  }, [toggle]);

  const handelAdd = async () => {
    if (selectedImages.length === 0) {
      alert("Please select images");
      return;
    }

    const formData = new FormData();

    selectedImages.forEach((image) => {
      formData.append("image", image); // 🔥 This must match the multer field name
    });

    try {
      const response = await axios.post(
        `${baseurl}/image/create/${params.slug}`,
        formData
      );

      if (response.data.success) {
        setSelectedImages([]);
        fetchImg(params.slug);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handelAddVideo = async () => {
    if (!selectVideo) {
      alert("Please select Video");
      return;
    }

    const formData = new FormData();
    formData.append("video", selectVideo);
    try {
      const response = await axios.post(
        `${baseurl}/video/create/${params.slug}`,
        formData
      );

      if (response.data.success) {
        setSelectVideo(null);
        fetchVideo(params.slug);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handelDeleteImage = async (id) => {
    const response = await axios.delete(`${baseurl}/image/${id}`);
    const data = await response.data;
    if (data.success) {
      fetchImg(params.slug);
    }
  };

  const handelDeleteVideo = async (id) => {
const response = await axios.delete(`${baseurl}/video/${id}`)
const data = await response.data;
if(data.success){
        fetchVideo(params.slug);

}


  };

  return (
    <div className=" min-h-screen p-4 bg-black">
      <div className="flex xl:px-20 justify-between py-5 gap-4">
        {/* Image Toggle Button */}
        <button
          onClick={() => setToggle("image")}
          className={`w-full flex justify-center items-center gap-3 text-lg px-5 py-3 rounded-2xl cursor-pointer font-bold uppercase transition-all duration-300 ${
            toggle === "image"
              ? "bg-green-500 text-white border-2 border-green-400 shadow-lg shadow-green-500/30"
              : "bg-gray-800 text-gray-300 border-2 border-gray-600 hover:bg-gray-700"
          }`}
        >
          {toggle === "image" ? (
            <FaImage size={20} />
          ) : (
            <FaRegImage size={20} />
          )}
          Images
        </button>
        <button
          onClick={() => setToggle("video")}
          className={`w-full flex justify-center items-center gap-3 text-lg px-5 py-3 rounded-2xl cursor-pointer font-bold uppercase transition-all duration-300 ${
            toggle === "video"
              ? "bg-blue-500 text-white border-2 border-blue-400 shadow-lg shadow-blue-500/30"
              : "bg-gray-800 text-gray-300 border-2 border-gray-600 hover:bg-gray-700"
          }`}
        >
          {toggle === "video" ? (
            <IoVideocam size={20} />
          ) : (
            <IoVideocamOutline size={20} />
          )}
          Videos
        </button>
      </div>
      <div className="xl:px-20 py-5">
        {toggle === "image" ? (
          <>
            <div className="bg-gray-900 rounded-2xl p-6 border-2 border-green-500/20">
              <div>
                <h2 className="text-green-400 text-xl font-bold mb-4">
                  Images Content
                </h2>

                <label
                  htmlFor="imgid"
                  className="cursor-pointer flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <FaUpload />
                  Choose Files
                </label>
                <input
                  type="file"
                  name=""
                  id="imgid"
                  className="hidden"
                  onChange={(e) => setSelectedImages([...e.target.files])}
                  multiple // if you want multiple files
                  accept="image/*" // if you only want images
                />
              </div>

              {selectedImages.length > 0 && (
                <>
                  <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
                    {selectedImages.length > 0 &&
                      selectedImages?.map((image, index) => (
                        <div
                          key={index}
                          className="relative group border rounded-lg overflow-hidden bg-gray-100"
                        >
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-48 object-cover"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center "
                          >
                            ×
                          </button>
                        </div>
                      ))}
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handelAdd}
                      className=" px-4 py-1 font-bold bg-blue-600 text-white rounded-xl cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 border-2 border-green-500/20 my-5">
              {allImage && (
                <div className="grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {allImage?.map((item, index) => {
                    return (
                      <div className="relative group" key={index}>
                        <img
                          src={`${imgurl}/${item.img}`}
                          alt={`${item.img}`}
                          className="h-[20rem] w-full object-cover "
                        />

                        <a
                          href={`${imgurl}/${item.img}`}
                          download={`${item.img}`}
                          target="_blank"
                        >
                          <IoMdDownload className=" opacity-0 group-hover:opacity-100 duration-300 absolute top-3 left-3  text-green-500 text-2xl cursor-pointer" />
                        </a>

                        <MdDelete
                          onClick={() => handelDeleteImage(item.id)}
                          className=" opacity-0 group-hover:opacity-100 duration-300 absolute top-3 right-3  text-red-700 text-2xl cursor-pointer"
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {!allImage?.length > 0 && (
                <div className="text-center">
                  <p className="text-white font-bold">Image Not Available</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="bg-gray-900 rounded-2xl p-6 border-2 border-blue-500/20">
              <h2 className="text-blue-400 text-xl font-bold mb-4">
                Videos Content
              </h2>

              <div>
                <label
                  htmlFor="video"
                  className="cursor-pointer flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <RxVideo />
                  Choose Video
                </label>
                {/* RxVideo */}
                <input
                  type="file"
                  name="video"
                  id="video"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectVideo(e.target.files[0]);
                    }
                  }}
                />

                {selectVideo && (
                  <div className="my-3 relative">
                    <video
                      src={URL.createObjectURL(selectVideo)}
                      alt={`Preview`}
                      className=""
                      controls
                    />

                    <button
                      onClick={() => setSelectVideo(null)}
                      className="absolute top-2  right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center "
                    >
                      ×
                    </button>

                    <div className="text-center my-5">
                      <button
                        onClick={handelAddVideo}
                        className=" px-4 py-1 font-bold bg-blue-600 text-white rounded-xl cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 border-2 border-green-500/20 my-5">
              <div className="grid  gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {allVideo?.map((video, index) => (
                  <div key={index} className="relative group">
                    <video height="400" controls preload="metadata">
                      <source
                        src={`${baseurl}/video/stream/${video.video}`} // Remove cache-busting for videos
                        type="video/mp4"
                      />
                    </video>

                    <a
                      href={`${baseurl}/video/stream/${video.video}`}
                      download={`${video.video}`}
                      target="_blank"
                    >
                      <IoMdDownload className="opacity-0 group-hover:opacity-100 duration-300  absolute  top-3 left-3 text-green-500 text-2xl cursor-pointer" />
                    </a>

                    <MdDelete
                      onClick={() => handelDeleteVideo(video.id)}
                      className=" opacity-0 group-hover:opacity-100 duration-300  absolute  top-3 right-3 text-red-700 text-2xl cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
