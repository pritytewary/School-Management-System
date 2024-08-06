import React from "react";
import StudentDashboard from "../../components/StudentDashboard";

const StudentDashboardpage = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <StudentDashboard id={params.id} />
    </div>
  );
};

export default StudentDashboardpage;
