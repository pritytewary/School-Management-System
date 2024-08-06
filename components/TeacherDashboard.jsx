"use client";

import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaBook,
  FaClipboardList,
  FaFileAlt,
  FaBullhorn,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import getTeacherData from "../app/teacher-dashboard/getTeacherbyId";

const TeacherDashboard = () => {
  const router = useRouter();
  const [teacherData, setTeacherData] = useState(null);
  const navigateTo = (path) => {
    router.push(path);
  };

  useEffect(() => {
    fetchTeacherData();
  }, []);

  const fetchTeacherData = async () => {
    try {
      const data = await getTeacherData();
      setTeacherData(data);
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    }
  };

  const DashboardItem = ({ icon, title, onClick }) => (
    <div
      className="bg-sky-500 rounded-lg shadow-md p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-sky-600 transition-colors"
      onClick={onClick}
    >
      {icon}
      <span className="mt-2 text-white text-center">{title}</span>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-purple-900 text-white p-6">
        <div className="flex items-center mb-6">
          <FaUser className="text-3xl mr-2" />
          <span className="font-bold">
            {teacherData?.firstName || "Teacher Name"}
          </span>
        </div>
        <nav>
          <SidebarItem
            icon={<FaUser />}
            text="Profile"
            onClick={() => navigateTo("/teacher-dashboard/teacher-profile")}
          />
          <SidebarItem icon={<FaBook />} text="Subjects" />
          <SidebarItem icon={<FaClipboardList />} text="Class" />

          <SidebarItem icon={<FaBullhorn />} text="Notices" />
        </nav>
      </div>

      <div className="flex-1 p-10 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
        <h2 className="text-xl font-semibold mb-4">
          Welcome, {teacherData?.firstName || "Teacher"}
        </h2>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <DashboardItem
            icon={<FaUser size={24} color="white" />}
            onClick={() => navigateTo("/teacher-dashboard/teacher-profile")}
            title="Profile"
          />
          <DashboardItem
            icon={<FaBook size={24} color="white" />}
            title="Subjects"
          />

          <DashboardItem
            icon={<FaBullhorn size={24} color="white" />}
            title="Notices"
          />
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, onClick }) => (
  <div
    className="flex items-center mb-4 cursor-pointer hover:bg-purple-800 p-2 rounded"
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{text}</span>
  </div>
);

export default TeacherDashboard;
