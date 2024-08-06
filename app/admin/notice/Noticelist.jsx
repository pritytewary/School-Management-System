"use client";
import React, { useEffect, useState } from "react";
import { baseApiRequest } from "../../../lib/api-request";
import { FaBell, FaEdit } from "react-icons/fa";
import { CreateNoticeModal } from "../../../components/AdminDashboard";

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [noticeToEdit, setNoticeToEdit] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await baseApiRequest({
        url: "/admin/notice/list",
        method: "GET",
      });
      console.log("Full response:", response);

      const data = response.data ? response.data : response;

      console.log("Processed data:", data);

      if (data && Array.isArray(data.data)) {
        setNotices(data.data);
      } else if (Array.isArray(data)) {
        setNotices(data);
      } else {
        console.error("Invalid data format:", data);
        setError("Invalid data format received from the server");
      }
    } catch (error) {
      console.error("Error fetching notices:", error);
      setError("Failed to fetch notices. Please try again later.");
    }
  };

  const handleEditClick = (notice) => {
    setNoticeToEdit(notice);
    setIsEditModalOpen(true);
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <FaBell className="mr-2" />
          Notices List
        </h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notice Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notices.map((notice) => (
                <tr key={notice._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {notice.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(notice.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEditClick(notice)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isEditModalOpen && (
        <CreateNoticeModal
          onClose={() => {
            setIsEditModalOpen(false);
            setNoticeToEdit(null);
          }}
          noticeToEdit={noticeToEdit}
          fetchNotices={fetchNotices}
        />
      )}
    </div>
  );
};

export default NoticeList;
