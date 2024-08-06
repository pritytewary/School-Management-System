"use client";

import { useState } from "react";
import Image from "next/image";
import { baseApiRequest } from "../lib/api-request";
import { useRouter } from "next/navigation";

export default function Signin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const loginResponse = await baseApiRequest({
        url: "/auth/login",
        method: "POST",
        data: formData,
      });
      console.log("Login response:", loginResponse);

      if (!loginResponse || !loginResponse.token) {
        throw new Error("Invalid login response from server");
      }

      const decodedToken = JSON.parse(atob(loginResponse.token.split(".")[1]));
      const userRole = decodedToken.role;

      if (!userRole) {
        throw new Error("User role not found in token");
      }

      console.log("User role:", userRole);

      if (userRole === "Student") {
        setTimeout(() => router.push("/student-dashboard"), 0);
      } else if (userRole === "Teacher") {
        setTimeout(() => router.push("/teacher-dashboard"), 0);
      } else if (userRole === "Admin") {
        setTimeout(() => router.push("/admin-dashboard"), 0);
      } else {
        setError("Unknown user role");
      }
    } catch (error) {
      console.error("Signin error:", error);
      setError(error.message || "An error occurred during sign in");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 bg-purple-400 relative">
        <h1 className="flex items-center justify-center h-full font-bold text-5xl">
          EverGreen Academy
        </h1>
        <Image
          src="/school.jpg"
          alt="Sign In"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      </div>
      <div className="flex-1 flex items-center justify-center p-8 shadow-xl ">
        <div className="w-full max-w-xl">
          <h2 className="text-3xl font-bold mb-6 text-center ">Sign In</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition duration-300"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
