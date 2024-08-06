"use client";

import React, { useEffect, useState } from "react";
import { baseApiRequest } from "../../../lib/api-request";
import { FaChalkboardTeacher, FaEdit } from "react-icons/fa";
import { CreateTeacherModal } from "../../../components/AdminDashboard";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [teacherToEdit, setTeacherToEdit] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await baseApiRequest({
        url: "/admin/teacher/list",
        method: "GET",
      });
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleEditClick = (teacher) => {
    setTeacherToEdit(teacher);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <FaChalkboardTeacher className="mr-2" />
          Teachers List
        </h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teachers.map((teacher) => (
                <tr key={teacher._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{`${teacher.firstName} ${teacher.lastName}`}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {teacher.username}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEditClick(teacher)}
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
        <CreateTeacherModal
          onClose={() => {
            setIsEditModalOpen(false);
            setTeacherToEdit(null);
          }}
          teacherToEdit={teacherToEdit}
          fetchTeachers={fetchTeachers}
        />
      )}
    </div>
  );
};

export default TeacherList;
