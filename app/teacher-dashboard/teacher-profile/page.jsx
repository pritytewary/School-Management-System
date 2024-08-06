import React from "react";

import TeacherProfile from "../../../components/Teacher-Profile";

const TeacherProfilePage = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <TeacherProfile id={params.id} />
    </div>
  );
};

export default TeacherProfilePage;
