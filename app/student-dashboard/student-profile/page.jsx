import React from "react";
import StudentProfile from "../../../components/Student-Profile";
const StudentProfilePage = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <StudentProfile id={params.id} />
    </div>
  );
};

export default StudentProfilePage;
