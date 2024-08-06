import React from "react";

import TeacherDashboard from "../../components/TeacherDashboard";

const TeacherDashboardpage = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <TeacherDashboard id={params.id} />
    </div>
  );
};

export default TeacherDashboardpage;
