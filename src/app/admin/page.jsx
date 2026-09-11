"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { baseurl } from "../component/urls";
import { FiUsers, FiPackage, FiGrid, FiBookOpen, FiActivity, FiArrowRight, FiFileText } from "react-icons/fi";
import Loader from "../component/Loader";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    usersCount: 0,
    packagesCount: 0,
    servicesCount: 0,
    blogsCount: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [recentServices, setRecentServices] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch users
        let users = [];
        try {
          const res = await axios.get(`${baseurl}/user`);
          if (res.data && res.data.success) {
            users = res.data.user || [];
          }
        } catch (e) {
          console.log("No users or error fetching users", e);
        }

        // Fetch packages
        let packages = [];
        try {
          const res = await axios.get(`${baseurl}/package`);
          if (res.data && res.data.data) {
            packages = res.data.data || [];
          }
        } catch (e) {
          console.log("No packages or error fetching packages", e);
        }

        // Fetch services
        let services = [];
        try {
          const res = await axios.get(`${baseurl}/service`);
          if (res.data && res.data.data) {
            services = res.data.data || [];
          }
        } catch (e) {
          console.log("No services or error fetching services", e);
        }

        // Fetch blogs
        let blogs = [];
        try {
          const res = await axios.get(`${baseurl}/blog`);
          if (res.data && res.data.data) {
            blogs = res.data.data || [];
          }
        } catch (e) {
          console.log("No blogs or error fetching blogs", e);
        }

        setStats({
          usersCount: users.length,
          packagesCount: packages.length,
          servicesCount: services.length,
          blogsCount: blogs.length,
        });

        // Set recent items
        setRecentUsers(users.slice(-5).reverse());
        setRecentServices(services.slice(-5).reverse());
        setRecentBlogs(blogs.slice(-5).reverse());

      } catch (error) {
        console.error("Dashboard data load error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">Real-time stats and management controls for DotCam portal.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
          <FiActivity className="animate-pulse" /> Live System Active
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Users Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-500">Total Users</span>
              <h3 className="text-3xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">
                {stats.usersCount}
              </h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <FiUsers className="text-xl" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs">
            <span className="text-gray-400">Manage portal user accounts</span>
            <Link href="/admin/users" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
              View All <FiArrowRight />
            </Link>
          </div>
        </div>

        {/* Packages Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-500">Packages</span>
              <h3 className="text-3xl font-extrabold text-gray-900 group-hover:text-yellow-600 transition-colors">
                {stats.packagesCount}
              </h3>
            </div>
            <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl group-hover:bg-yellow-600 group-hover:text-white transition-all duration-300">
              <FiPackage className="text-xl" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs">
            <span className="text-gray-400">Pricing and membership packs</span>
            <Link href="/admin/packages" className="text-yellow-600 font-semibold hover:underline flex items-center gap-1">
              View All <FiArrowRight />
            </Link>
          </div>
        </div>

        {/* Services Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-500">Services</span>
              <h3 className="text-3xl font-extrabold text-gray-900 group-hover:text-green-600 transition-colors">
                {stats.servicesCount}
              </h3>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
              <FiGrid className="text-xl" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs">
            <span className="text-gray-400">Operational shoot categories</span>
            <Link href="/admin/service" className="text-green-600 font-semibold hover:underline flex items-center gap-1">
              View All <FiArrowRight />
            </Link>
          </div>
        </div>

        {/* Blogs Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-500">Blogs</span>
              <h3 className="text-3xl font-extrabold text-gray-900 group-hover:text-purple-600 transition-colors">
                {stats.blogsCount}
              </h3>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
              <FiBookOpen className="text-xl" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs">
            <span className="text-gray-400">Articles and publications</span>
            <Link href="/admin/blog" className="text-purple-600 font-semibold hover:underline flex items-center gap-1">
              View All <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Users List */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-gray-50">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FiUsers className="text-blue-500" /> Recent User Registrations
            </h2>
            <Link href="/admin/users" className="text-xs font-semibold text-blue-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentUsers.map((u) => (
              <div key={u.id} className="py-3 flex items-center justify-between hover:bg-gray-50 px-2 rounded-lg transition">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700 text-sm">
                    {u.usercode?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">{u.usercode}</h4>
                    <span className="text-xs text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <Link
                  href={`/admin/users/${u.url}`}
                  className="text-xs px-2.5 py-1 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-md text-gray-600 transition font-medium"
                >
                  Manage
                </Link>
              </div>
            ))}
            {recentUsers.length === 0 && (
              <div className="text-center py-6 text-sm text-gray-400">No users found. Create one to begin.</div>
            )}
          </div>
        </div>

        {/* Recent Services List */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-gray-50">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FiGrid className="text-green-500" /> Shoot Services
            </h2>
            <Link href="/admin/service" className="text-xs font-semibold text-green-600 hover:underline">
              Manage
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentServices.map((s) => (
              <div key={s.id} className="py-3 flex items-center justify-between hover:bg-gray-50 px-2 rounded-lg transition">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700 text-sm">
                    {s.title?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">{s.title}</h4>
                    <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded uppercase font-bold tracking-wider text-[9px]">
                      {s.type}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/admin/service`}
                  className="text-xs px-2.5 py-1 bg-gray-100 hover:bg-green-600 hover:text-white rounded-md text-gray-600 transition font-medium"
                >
                  Edit
                </Link>
              </div>
            ))}
            {recentServices.length === 0 && (
              <div className="text-center py-6 text-sm text-gray-400">No services created yet.</div>
            )}
          </div>
        </div>

        {/* Recent Blogs List */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 lg:col-span-2">
          <div className="flex justify-between items-center pb-2 border-b border-gray-50">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FiBookOpen className="text-purple-500" /> Recent Blogs
            </h2>
            <Link href="/admin/blog" className="text-xs font-semibold text-purple-600 hover:underline">
              Manage Blogs
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentBlogs.slice(0, 3).map((b) => (
              <div key={b.id} className="p-4 border border-gray-100 rounded-xl hover:border-purple-200 hover:shadow-sm transition space-y-3">
                <div className="flex items-center gap-2">
                  <FiFileText className="text-purple-500 flex-shrink-0" />
                  <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{b.title}</h4>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2">{b.description?.replace(/<[^>]*>/g, "")}</p>
                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2">
                  <span>By {b.auther || "Admin"}</span>
                  <span>{new Date(b.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
            {recentBlogs.length === 0 && (
              <div className="text-center py-6 text-sm text-gray-400 col-span-3">No blog posts found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
