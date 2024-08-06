"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaBook,
  FaClipboardList,
  FaFileAlt,
  FaBullhorn,
} from "react-icons/fa";
import getStudentData from "../app/student-dashboard/getStudentbyId";

const StudentDashboard = () => {
  const router = useRouter();
  const [studentData, setStudentData] = useState(null);

  const navigateTo = (path) => {
    router.push(path);
  };
  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const data = await getStudentData();
      setStudentData(data);
    } catch (error) {
      console.error("Error fetching student data:", error);
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
            {studentData?.firstName || "Student Name"}
          </span>
        </div>
        <nav>
          <SidebarItem
            icon={<FaUser />}
            text="Profile"
            onClick={() => navigateTo("/student-dashboard/student-profile")}
          />
          <SidebarItem icon={<FaBook />} text="Subjects" />
          <SidebarItem icon={<FaClipboardList />} text="Class" />
          <SidebarItem icon={<FaFileAlt />} text="Results" />
          <SidebarItem icon={<FaBullhorn />} text="Notices" />
        </nav>
      </div>

      <div className="flex-1 p-10 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
        <h2 className="text-xl font-semibold mb-4">
          Welcome, {studentData?.firstName || "Student"}
        </h2>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <DashboardItem
            icon={<FaUser size={24} color="white" />}
            title="Profile"
            onClick={() => navigateTo("/student-dashboard/student-profile")}
          />
          <DashboardItem
            icon={<FaBook size={24} color="white" />}
            title="Subjects"
          />
          <DashboardItem
            icon={<FaClipboardList size={24} color="white" />}
            title="Class"
          />
          <DashboardItem
            icon={<FaFileAlt size={24} color="white" />}
            title="Results"
          />
          <DashboardItem
            icon={<FaFileAlt size={24} color="white" />}
            title="Registration Form"
          />
          <DashboardItem
            icon={<FaFileAlt size={24} color="white" />}
            title="Admit Card"
          />
          <DashboardItem
            icon={<FaFileAlt size={24} color="white" />}
            title="Exam Form"
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

const SidebarItem = ({ icon, text }) => (
  <div className="flex items-center mb-4 cursor-pointer hover:bg-purple-800 p-2 rounded">
    {icon}
    <span className="ml-2">{text}</span>
  </div>
);

export default StudentDashboard;
