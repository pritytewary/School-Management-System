"use client";

import { useState, useEffect } from "react";
import React from "react";
import getTeacherData from "../app/teacher-dashboard/getTeacherbyId";

const TeacherProfile = () => {
  const [teacherData, setTeacherData] = useState(null);

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

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white py-6 px-8">
          <h1 className="text-3xl font-bold">Teacher Profile</h1>
        </div>
        <div className="p-8">
          {teacherData ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileField
                  label="First Name"
                  value={teacherData.firstName}
                />
                <ProfileField label="Last Name" value={teacherData.lastName} />
                <ProfileField label="Email" value={teacherData.email} />
                <ProfileField label="Address" value={teacherData.address} />
                <ProfileField label="Phone" value={teacherData.phone} />
                <ProfileField label="Subject" value={teacherData.subject} />
                <ProfileField
                  label="Years of Experience"
                  value={teacherData.experience}
                />
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">About Me</h2>
                <p className="text-gray-700">{teacherData.bio}</p>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">Loading teacher data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="mb-4">
    <h3 className="text-sm font-semibold text-gray-600">{label}</h3>
    <p className="text-lg text-gray-800">{value}</p>
  </div>
);

export default TeacherProfile;
