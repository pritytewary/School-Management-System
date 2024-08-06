"use client";
import React, { useEffect, useState } from "react";
import { baseApiRequest } from "../../../lib/api-request";
import { FaBook, FaEdit } from "react-icons/fa";
import { CreateSubjectModal } from "../../../components/AdminDashboard";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [subjectToEdit, setSubjectToEdit] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await baseApiRequest({
        url: "/admin/subject/list",
        method: "GET",
      });
      console.log("Full response:", response);

      const data = response.data ? response.data : response;

      console.log("Processed data:", data);

      if (data && Array.isArray(data.data)) {
        setSubjects(data.data);
      } else if (Array.isArray(data)) {
        setSubjects(data);
      } else {
        console.error("Invalid data format:", data);
        setError("Invalid data format received from the server");
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setError("Failed to fetch subjects. Please try again later.");
    }
  };

  const handleEditClick = (subject) => {
    setSubjectToEdit(subject);
    setIsEditModalOpen(true);
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <FaBook className="mr-2" />
          Subjects List
        </h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teacher
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjects.map((subject) => (
                <tr key={subject._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {subject.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {subject.teachers && subject.teachers.length > 0
                        ? subject.teachers
                            .map((teacher) => {
                              console.log("Teacher object:", teacher);
                              return `${teacher.firstName} ${teacher.lastName}`;
                            })
                            .join(", ")
                        : "No teachers assigned"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEditClick(subject)}
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
        <CreateSubjectModal
          onClose={() => {
            setIsEditModalOpen(false);
            setSubjectToEdit(null);
          }}
          subjectToEdit={subjectToEdit}
          fetchSubjects={fetchSubjects}
        />
      )}
    </div>
  );
};

export default SubjectList;
