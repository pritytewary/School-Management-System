"use client";

import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardList,
  FaFileAlt,
  FaBullhorn,
  FaTimes,
  FaNotic,
} from "react-icons/fa";
import { GrNote } from "react-icons/gr";

import { baseApiRequest } from "../lib/api-request";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const router = useRouter();

  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isCreateTeacherOpen, setIsCreateTeacherOpen] = useState(false);
  const [isCreateStudentOpen, setIsCreateStudentOpen] = useState(false);
  const [isCreateSubjectOpen, setIsCreateSubjectOpen] = useState(false);
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
  const [isCreateExamOpen, setIsCreateExamOpen] = useState(false);
  const [teacherToEdit, setTeacherToEdit] = useState(null);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [subjectToEdit, setSubjectToEdit] = useState(null);
  const [classToEdit, setClassToEdit] = useState(null);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [noticeToEdit, setNoticeToEdit] = useState(null);

  const navigateTo = (path) => {
    router.push(path);
  };

  const fetchTeachers = async () => {
    try {
      const response = await baseApiRequest({
        url: "/admin/teacher/list",
        method: "GET",
      });

      console.log("Teachers fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await baseApiRequest({
        url: "/admin/student/list",
        method: "GET",
      });

      console.log("Students fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await baseApiRequest({
        url: "/admin/subject/list",
        method: "GET",
      });

      console.log("Subjects fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await baseApiRequest({
        url: "/admin/class/list",
        method: "GET",
      });

      console.log("Classes fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };
  const fetchNotices = async () => {
    try {
      const response = await baseApiRequest({
        url: "/admin/notice/list",
        method: "GET",
      });

      console.log("Classes fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-blue-900 text-white p-6">
        <div className="flex items-center mb-6">
          <FaUser className="text-3xl mr-2" />
          <span className="font-bold">Admin Name</span>
        </div>
        <nav>
          <SidebarItem
            icon={<FaChalkboardTeacher />}
            text="Teachers List"
            onClick={() => navigateTo("/admin/teachers")}
          />
          <SidebarItem
            icon={<FaUser />}
            text="Student List"
            onClick={() => navigateTo("/admin/students")}
          />
          <SidebarItem
            icon={<FaBook />}
            text="Subjects List"
            onClick={() => navigateTo("/admin/subjects")}
          />
          <SidebarItem
            icon={<FaClipboardList />}
            text="Class List"
            onClick={() => navigateTo("/admin/classes")}
          />
          <SidebarItem icon={<FaFileAlt />} text="Exam List" />
          <SidebarItem icon={<FaBullhorn />} text="Notices" />
        </nav>
      </div>

      <div className="flex-1 p-10 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <DashboardCard
            title="Create Admin"
            icon={<FaUser />}
            onClick={() => setIsCreateUserOpen(true)}
          />
          <DashboardCard
            title="Create Teacher"
            icon={<FaChalkboardTeacher />}
            onClick={() => setIsCreateTeacherOpen(true)}
          />
          <DashboardCard
            title="Create Student"
            icon={<FaUser />}
            onClick={() => setIsCreateStudentOpen(true)}
          />
          <DashboardCard
            title="Create Subject"
            icon={<FaBook />}
            onClick={() => setIsCreateSubjectOpen(true)}
          />
          <DashboardCard
            title="Create Class"
            icon={<FaClipboardList />}
            onClick={() => setIsCreateClassOpen(true)}
          />
          <DashboardCard
            title="Create Exam"
            icon={<FaFileAlt />}
            onClick={() => setIsCreateExamOpen(true)}
          />
          <DashboardCard
            title="Create Notice"
            icon={<GrNote />}
            onClick={() => setIsNoticeOpen(true)}
          />
        </div>
      </div>

      {isCreateUserOpen && (
        <CreateUserModal onClose={() => setIsCreateUserOpen(false)} />
      )}
      {isCreateTeacherOpen && (
        <CreateTeacherModal
          onClose={() => {
            setIsCreateTeacherOpen(false);
            setTeacherToEdit(null);
          }}
          teacherToEdit={teacherToEdit}
          fetchTeachers={fetchTeachers}
        />
      )}
      {isCreateStudentOpen && (
        <CreateStudentModal
          onClose={() => {
            setIsCreateStudentOpen(false);
            setStudentToEdit(null);
          }}
          studentToEdit={studentToEdit}
          fetchStudents={fetchStudents}
        />
      )}
      {isCreateSubjectOpen && (
        <CreateSubjectModal
          onClose={() => {
            setIsCreateSubjectOpen(false);
            setSubjectToEdit(null);
          }}
          subjectToEdit={subjectToEdit}
          fetchSubjects={fetchSubjects}
        />
      )}
      {isCreateClassOpen && (
        <CreateClassModal
          onClose={() => {
            setIsCreateClassOpen(false);
            setClassToEdit(null);
          }}
          classToEdit={classToEdit}
          fetchClasses={fetchClasses}
        />
      )}
      {isCreateExamOpen && (
        <CreateExamModal onClose={() => setIsCreateExamOpen(false)} />
      )}
      {isNoticeOpen && (
        <CreateNoticeModal
          onClose={() => {
            setIsNoticeOpen(false);
            setNoticeToEdit(null);
          }}
          noticeToEdit={noticeToEdit}
          fetchNotices={fetchNotices}
        />
      )}
    </div>
  );
};

const SidebarItem = ({ icon, text, onClick }) => (
  <div
    className="flex items-center mb-4 cursor-pointer hover:bg-blue-800 p-2 rounded"
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{text}</span>
  </div>
);

const DashboardCard = ({ title, icon, onClick }) => (
  <div
    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center justify-between p-6">
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-3xl text-blue-500">{icon}</div>
    </div>
  </div>
);

const CreateUserModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "",
    address: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await baseApiRequest({
        url: "/admin/user/create",
        method: "POST",
        data: formData,
      });
      console.log("user created successfully ", response);
    } catch (error) {
      console.error(" error in user create", error);
    }

    onClose();
  };

  return (
    <Modal title="Create New User" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <Input
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Select
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
        >
          <option value="">Select a role</option>
          <option value="Admin">Admin</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
        </Select>
        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Create User
        </button>
      </form>
    </Modal>
  );
};

export const CreateTeacherModal = ({
  onClose,
  teacherToEdit,
  fetchTeachers,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    role: "",
    address: "",
  });

  useEffect(() => {
    if (teacherToEdit) {
      setFormData({
        firstName: teacherToEdit.firstName,
        lastName: teacherToEdit.lastName,
        username: teacherToEdit.username,
        password: teacherToEdit.password,
        email: teacherToEdit.email,
        role: teacherToEdit.role,
        address: teacherToEdit.address,
      });
    }
  }, [teacherToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = (await teacherToEdit)
        ? `/admin/user/update/${teacherToEdit._id}`
        : "/admin/user/create";
      const method = teacherToEdit ? "PUT" : "POST";
      const data = teacherToEdit
        ? { ...formData }
        : { ...formData, role: "Teacher" };

      const response = await baseApiRequest({
        url,
        method,
        data,
      });

      console.log(
        `Teacher ${teacherToEdit ? "updated" : "created"} successfully`,
        response
      );
      fetchTeachers();
    } catch (error) {
      console.error(
        `Error ${teacherToEdit ? "updating" : "creating"} teacher`,
        error
      );
    }

    onClose();
  };

  return (
    <Modal
      title={`${teacherToEdit ? "Edit" : "Create New"} Teacher`}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <Input
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Select
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
        >
          <option value="Teacher">Teacher</option>
        </Select>
        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {teacherToEdit ? "Update Teacher" : "Create Teacher"}
        </button>
      </form>
    </Modal>
  );
};

export const CreateStudentModal = ({
  onClose,
  studentToEdit,
  fetchStudents = () => {},
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    grade: "",
    address: "",
  });

  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClasses();

    if (studentToEdit) {
      setFormData({
        firstName: studentToEdit.firstName,
        lastName: studentToEdit.lastName,
        username: studentToEdit.username,
        password: studentToEdit.password,
        email: studentToEdit.email,
        grade: studentToEdit.grade || "",
      });
    }
  }, [studentToEdit]);

  const fetchClasses = async () => {
    try {
      const response = await baseApiRequest({
        url: "/admin/class/list",
        method: "GET",
      });
      console.log("Full API response:", response);

      let classesData;
      if (response.data && Array.isArray(response.data)) {
        classesData = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        classesData = response.data.data;
      } else if (Array.isArray(response)) {
        classesData = response;
      } else {
        throw new Error("Unexpected data structure");
      }

      console.log("Processed classes data:", classesData);
      setClasses(classesData);
    } catch (error) {
      setError("Error fetching classes: " + error.message);
      console.error("Error in fetchClasses:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = studentToEdit
        ? `/admin/user/update/${studentToEdit._id}`
        : "/admin/user/create";
      const method = studentToEdit ? "PUT" : "POST";
      const data = studentToEdit
        ? { ...formData }
        : { ...formData, role: "Student" };

      const response = await baseApiRequest({
        url,
        method,
        data,
      });

      console.log(
        `Student ${studentToEdit ? "updated" : "created"} successfully`,
        response
      );
      fetchStudents();
    } catch (error) {
      console.error(
        `Error ${studentToEdit ? "updating" : "creating"} student`,
        error
      );
    }

    onClose();
  };

  return (
    <Modal
      title={`${studentToEdit ? "Edit" : "Create New"} Student`}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <Input
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Select
          label="Class"
          name="grade"
          value={formData.grade}
          onChange={handleInputChange}
        >
          <option value="">Select a class</option>
          {error ? (
            <option value="" disabled>
              {error}
            </option>
          ) : classes && classes.length > 0 ? (
            classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Loading classes...
            </option>
          )}
        </Select>
        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {studentToEdit ? "Update Student" : "Create Student"}
        </button>
      </form>
    </Modal>
  );
};

export const CreateSubjectModal = ({
  onClose,
  subjectToEdit,
  fetchSubjects,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    teacherIds: [],
  });
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();

    if (subjectToEdit) {
      setFormData({
        name: subjectToEdit.name,
        teacherIds: subjectToEdit.teachers.map((teacher) => teacher._id),
      });
    }
  }, [subjectToEdit]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = subjectToEdit
        ? `/admin/subject/update/${subjectToEdit._id}`
        : "/admin/subject/create";
      const method = subjectToEdit ? "PUT" : "POST";
      const data = { ...formData };

      const response = await baseApiRequest({
        url,
        method,
        data,
      });

      console.log(
        `Subject ${subjectToEdit ? "updated" : "created"} successfully`,
        response
      );
      fetchSubjects();
    } catch (error) {
      console.error(
        `Error ${subjectToEdit ? "updating" : "creating"} subject`,
        error
      );
    }

    onClose();
  };

  return (
    <Modal
      title={`${subjectToEdit ? "Edit" : "Create New"} Subject`}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Subject Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <Select
          label="Teachers"
          name="teacherIds"
          value={formData.teacherIds}
          multiple
          onChange={handleInputChange}
        >
          <option value="">Select teachers</option>
          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {`${teacher.firstName} ${teacher.lastName} (${teacher.username})`}
            </option>
          ))}
        </Select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {subjectToEdit ? "Update Subject" : "Create Subject"}
        </button>
      </form>
    </Modal>
  );
};

export const CreateClassModal = ({ onClose, classToEdit, fetchClasses }) => {
  const [formData, setFormData] = useState({
    name: "",
    subjectIds: [],
  });
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();

    if (classToEdit) {
      setFormData({
        name: classToEdit.name,
        subjectIds: classToEdit.subjects.map((subject) => subject._id),
      });
    }
  }, [classToEdit]);

  const fetchSubjects = async () => {
    try {
      const response = await baseApiRequest({
        url: "/admin/subject/list",
        method: "GET",
      });
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const { options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData((prev) => ({ ...prev, subjectIds: selectedOptions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = classToEdit
        ? `/admin/class/update/${classToEdit._id}`
        : "/admin/class/create";
      const method = classToEdit ? "PUT" : "POST";
      const data = { ...formData };

      const response = await baseApiRequest({
        url,
        method,
        data,
      });

      console.log(
        `Class ${classToEdit ? "updated" : "created"} successfully`,
        response
      );
      fetchClasses();
      onClose();
    } catch (error) {
      console.error(
        `Error ${classToEdit ? "updating" : "creating"} class`,
        error
      );
    }
  };

  return (
    <Modal
      title={`${classToEdit ? "Edit" : "Create New"} Class`}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Class Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <Select
          label="Subjects"
          name="subjectIds"
          value={formData.subjectIds}
          onChange={handleSelectChange}
          multiple
        >
          <option value="">Select subjects</option>
          {subjects.map((subject) => (
            <option key={subject._id} value={subject._id}>
              {subject.name}
            </option>
          ))}
        </Select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {classToEdit ? "Update Class" : "Create Class"}
        </button>
      </form>
    </Modal>
  );
};

export const CreateExamModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    subjectId: "",
  });
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await baseApiRequest({
        url: "/admin/subject/list",
        method: "GET",
      });
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await baseApiRequest({
        url: "/admin/exam/create",
        method: "POST",
        data: formData,
      });
      console.log("Exam created successfully", response);
      onClose();
    } catch (error) {
      console.error("Error in exam creation", error);
    }
  };

  return (
    <Modal title="Create New Exam" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Exam Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <Input
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleInputChange}
        />

        <Select
          label="Subject"
          name="subjectId"
          value={formData.subjectId}
          onChange={handleInputChange}
        >
          <option value="">Select a subject</option>
          {subjects.map((subject) => (
            <option key={subject._id} value={subject._id}>
              {subject.name}
            </option>
          ))}
        </Select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Create Exam
        </button>
      </form>
    </Modal>
  );
};

export const CreateNoticeModal = ({ onClose, noticeToEdit, fetchNotices }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    if (noticeToEdit) {
      setFormData({
        name: noticeToEdit.name,
        date: noticeToEdit.date.split("T")[0], // Assuming date is in ISO format
        description: noticeToEdit.description,
      });
    }
  }, [noticeToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = noticeToEdit
        ? `/admin/notice/update/${noticeToEdit._id}`
        : "/admin/notice/create";
      const method = noticeToEdit ? "PUT" : "POST";
      const data = { ...formData, id: noticeToEdit ? noticeToEdit._id : null };

      const response = await baseApiRequest({
        url,
        method,
        data,
      });

      console.log(
        `Notice ${noticeToEdit ? "updated" : "created"} successfully`,
        response
      );
      fetchNotices();
      onClose();
    } catch (error) {
      console.error(
        `Error ${noticeToEdit ? "updating" : "creating"} notice`,
        error
      );
    }
  };

  return (
    <Modal
      title={`${noticeToEdit ? "Edit" : "Create New"} Notice`}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Notice Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
        />
        <Input
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleInputChange}
        />
        <Input
          label="Description"
          name="description"
          type="text"
          value={formData.description}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {noticeToEdit ? "Update Notice" : "Create Notice"}
        </button>
      </form>
    </Modal>
  );
};

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button onClick={onClose} className="text-red-500 hover:text-red-600">
          <FaTimes />
        </button>
      </div>
      {children}
    </div>
  </div>
);

const Input = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
    />
  </div>
);

const Select = ({ label, name, value, onChange, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
    >
      {children}
    </select>
  </div>
);

export default AdminDashboard;
