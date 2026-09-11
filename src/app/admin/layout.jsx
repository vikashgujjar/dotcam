"use client";

import React, { useEffect, useState } from "react";
import { FiHome, FiSettings, FiUser, FiMenu, FiX, FiSearch, FiBell, FiMessageSquare, FiBook, FiUsers, FiBarChart, FiCamera, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { LuPackageCheck } from "react-icons/lu";
import { MdRoomService } from "react-icons/md";
import { IoIosArrowDown,IoIosArrowUp,IoMdLogOut} from "react-icons/io";


import { FaUser } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { baseurl } from "../component/urls";
import { useRouter } from "next/navigation";


const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toggle,setToggle]=useState("")
  const [userData,setUserData]= useState();
  const router = useRouter()
  
  const menuItems = [
    { icon: FiHome, label: "Dashboard", href: "/admin" },
    { icon: LuPackageCheck, label: "Packages", href: "/admin/packages" },
    { icon: MdRoomService, label: "Service", href: "/admin/service" },
    { icon: FiBook, label: "Blogs", href: "/admin/blog" },
    { icon: FaUser, label: " Users", href: "/admin/users" },
    { icon: FiMessageSquare, label: "Messages", href: "/admin/messages" },
    { icon: FiUsers, label: "All Users", href: false  },
    { icon: FiBarChart, label: "Analytics", href: "#" },
    { icon: FiUser, label: "Profile", href: "#" },
    { icon: FiSettings, label: "Settings", href: "#" },
  ];

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };







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


const fetchAdmin = async () => {
      try {
        const response = await axios.get(`${baseurl}/admin/getadmin`, {
          withCredentials: true, // important for cookies
        });

        const data = response.data;

        if (data.success && data.admin) {
          // ✅ Admin verified — you can store admin data in state if needed
          console.log("Admin verified:", data.admin);
        } else {
          // ❌ Not logged in — redirect to admin login
          router.push("/login/admin");
        }
      } catch (error) {
        router.push("/login/admin");
      }
    };



useEffect(()=>{
  fetchAdmin()
  getUser()
},[])



const handellogout= async()=>{
  const response = await axios.get(`${baseurl}/admin/logout`,{
    withCredentials:true
  })
  const data = await response.data;
   
  if(data.success){
    router.push("/login/admin");
  }



}




  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 overflow-y-auto bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        ${sidebarCollapsed ? "w-20" : "w-64"} 
        md:translate-x-0 md:static md:inset-auto`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? "justify-center" : ""}`}>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <FiCamera className="text-white text-sm" />
            </div>
            {!sidebarCollapsed && (
              <span className="text-xl font-bold text-gray-800 whitespace-nowrap">DotCam</span>
            )}
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 flex-shrink-0"
          >
            <FiX className="text-lg text-gray-600" />
          </button>

          {/* Collapse button for desktop */}
          {!sidebarCollapsed && (
            <button
              onClick={toggleSidebar}
              className="hidden md:flex p-1 rounded-lg hover:bg-gray-100 flex-shrink-0"
            >
              <FiChevronLeft className="text-lg text-gray-600" />
            </button>
          )}
        </div>

        {/* Navigation */}
      <nav className="p-4 space-y-1">
  {menuItems.map((item, index) => (
    <div key={item.label}>
      {item.href && (
        <Link
          href={item.href}
          className={`flex items-center gap-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group
            ${sidebarCollapsed ? "justify-center px-3 py-3" : "px-3 py-3"}`}
          title={sidebarCollapsed ? item.label : ""}
        >
          <item.icon className="text-lg text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
          {!sidebarCollapsed && (
            <span className="font-medium whitespace-nowrap">{item.label}</span>
          )}
        </Link>
      )}

      {!item.href && (
        <>
          <button 
            onClick={() => toggle == "user" ? setToggle("") : setToggle("user")} 
            className={`flex w-full items-center justify-between rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group
              ${sidebarCollapsed ? "justify-center px-3 py-3" : "px-3 py-3"}`}
            title={sidebarCollapsed ? item.label : ""}
          >
            <div className="flex items-center gap-3">
              <item.icon className="text-lg text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="font-medium whitespace-nowrap">{item.label}</span>
              )}
            </div>
            <div>
              {toggle == "user" ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </button>

          {/* User Data in Dropdown */}
          {!sidebarCollapsed && (
            <div className={`ml-6 overflow-hidden transition-all duration-300 ease-in-out ${toggle == "user" ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`} >
              {userData?.map((user) => (
                <Link 
                  key={user.id}
                  href={`/admin/users/${user.url}`}
                  className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors"
                >
                  {/* User Avatar */}
                  <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-xs">
                      {user.usercode?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  
                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {user.usercode || 'N/A'}
                    </div>
                   
                  </div>

                
                
                </Link>
              ))}
              
              {(!userData || userData?.length === 0) && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No users found
                </div>
              )}
            </div>
          )}

          {/* Collapsed View - Only show count */}
          {/* {toggle == "user" && sidebarCollapsed && (
            <div className="mt-2 space-y-1">
              {userData?.slice(0, 3).map((user) => (
                <div 
                  key={user.id}
                  className="flex justify-center p-2 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors"
                  title={user.usercode}
                >
                  <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-xs">
                      {user.usercode?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                </div>
              ))}
              {userData && userData.length > 3 && (
                <div className="text-center text-xs text-gray-500">
                  +{userData.length - 3} more
                </div>
              )}
            </div>
          )} */}
        </>
      )}
    </div>
  ))}
</nav>

        {/* Expand button when collapsed */}
        {sidebarCollapsed && (
          <button
            onClick={toggleSidebar}
            className="absolute bottom-20 right-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <FiChevronRight className="text-lg text-gray-600" />
          </button>
        )}

       <div
       
       onClick={handellogout}
          className={`flex items-center gap-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group
            px-3 cursor-pointer  mx-3 py-3`}
         
        >
          <IoMdLogOut className="text-lg text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
         
            <span className="font-medium whitespace-nowrap">Logout</span>
      
        </div>



        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white 
          ${sidebarCollapsed ? "flex justify-center" : ""}`}>
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? "justify-center" : ""}`}>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-sm">U</span>
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">User Name</p>
                <p className="text-xs text-gray-500 truncate">user@example.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300
   `}>
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between p-4">
            {/* Left side - Menu button and Search */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
              >
                <FiMenu className="text-lg text-gray-600" />
              </button>
              
              {/* Search Bar */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300
                    ${sidebarCollapsed ? "md:w-80" : "md:w-64"}`}
                />
              </div>
            </div>

            {/* Right side - Notifications and User */}
            <div className="flex items-center gap-4">

           
              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <FiBell className="text-lg text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* User info - hidden on mobile when sidebar collapsed */}
              <div className={`hidden md:flex items-center gap-3 ${sidebarCollapsed ? "flex-col text-center" : ""}`}>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">User Name</p>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">U</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1  overflow-auto">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;