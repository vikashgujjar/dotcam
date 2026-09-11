"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "@/app/component/urls";
import Swal from "sweetalert2";
import Loader from "@/app/component/Loader";
import { FiTrash2, FiMail, FiCalendar, FiUser, FiSearch, FiMessageSquare } from "react-icons/fi";

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}/message`);
      if (response.data.success) {
        setMessages(response.data.messages || []);
        setFilteredMessages(response.data.messages || []);
      }
    } catch (error) {
      console.error("Fetch messages error:", error);
      Swal.fire("Error", "Could not load messages.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Filter messages based on search term
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = messages.filter(
      (m) =>
        m.name.toLowerCase().includes(term) ||
        m.email.toLowerCase().includes(term) ||
        (m.subject && m.subject.toLowerCase().includes(term)) ||
        m.message.toLowerCase().includes(term)
    );
    setFilteredMessages(filtered);
  }, [searchTerm, messages]);

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Prevent opening the message details modal
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this message!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const response = await axios.delete(`${baseurl}/message/${id}`);
          if (response.data.success) {
            Swal.fire("Deleted!", "Message has been deleted.", "success");
            if (selectedMessage && selectedMessage.id === id) {
              setSelectedMessage(null);
            }
            fetchMessages();
          }
        } catch (error) {
          console.error("Delete message error:", error);
          Swal.fire("Error", "Failed to delete message.", "error");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {loading && <Loader />}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FiMessageSquare className="text-blue-600" /> Client Messages
          </h1>
          <p className="text-gray-500 text-sm">View and manage contact form inquiries from visitors.</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by sender, email, subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 outline-none transition text-sm bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List Card */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-[calc(100vh-250px)] flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <span className="text-xs font-semibold uppercase text-gray-400 tracking-wider">
              Inbox ({filteredMessages.length})
            </span>
          </div>

          <div className="divide-y divide-gray-100 overflow-y-auto flex-1">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-4 hover:bg-blue-50/30 cursor-pointer transition flex justify-between items-start gap-4 ${
                    selectedMessage?.id === msg.id ? "bg-blue-50/50 border-l-4 border-blue-600 pl-3" : ""
                  }`}
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 justify-between">
                      <h4 className="font-semibold text-gray-800 truncate text-sm">{msg.name}</h4>
                      <span className="text-[10px] text-gray-400 flex items-center gap-1 flex-shrink-0">
                        <FiCalendar /> {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium truncate">{msg.subject || "(No Subject)"}</p>
                    <p className="text-xs text-gray-400 truncate line-clamp-2">{msg.message}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(msg.id, e)}
                    className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition"
                    title="Delete message"
                  >
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-400 space-y-2">
                <FiMail className="mx-auto text-4xl text-gray-300" />
                <p className="font-semibold text-sm">No messages found</p>
                <p className="text-xs text-gray-400">Inquiries submitted on the contact page appear here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Message Details Preview Panel */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6 h-[calc(100vh-250px)] overflow-y-auto flex flex-col justify-between">
          {selectedMessage ? (
            <div className="space-y-5 flex-1">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide block mb-1">
                  Message Details
                </span>
                <h2 className="text-lg font-bold text-gray-900 break-words">
                  {selectedMessage.subject || "(No Subject)"}
                </h2>
              </div>

              <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs text-gray-600">
                <div className="flex items-center gap-2 truncate">
                  <FiUser className="text-gray-400 flex-shrink-0" />
                  <strong className="text-gray-800">Sender:</strong> {selectedMessage.name}
                </div>
                <div className="flex items-center gap-2 truncate">
                  <FiMail className="text-gray-400 flex-shrink-0" />
                  <strong className="text-gray-800">Email:</strong>{" "}
                  <a href={`mailto:${selectedMessage.email}`} className="text-blue-600 hover:underline">
                    {selectedMessage.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-gray-400 flex-shrink-0" />
                  <strong className="text-gray-800">Date:</strong>{" "}
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="space-y-2">
                <strong className="text-xs font-semibold text-gray-700 block">Message Content</strong>
                <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed break-words bg-white p-3 border border-gray-100 rounded-xl">
                  {selectedMessage.message}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400">
              <FiMail className="text-5xl text-gray-200 mb-2" />
              <p className="font-semibold text-sm">Select a Message</p>
              <p className="text-xs text-gray-400 max-w-[200px] mt-1">
                Click on any message in the inbox to view full sender details and message body.
              </p>
            </div>
          )}

          {selectedMessage && (
            <button
              onClick={(e) => handleDelete(selectedMessage.id, e)}
              className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <FiTrash2 /> Delete Message
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessagesPage;
