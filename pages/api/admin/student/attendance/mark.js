import { verifyUser } from "../../../../../lib/jwt";
import withApiWrapper from "../../../../../lib/with-api-wrapper";
import Attendance from "../../../../../models/Attendance";
import HttpError from "http-errors";

async function markAttendance(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Student") {
    throw new HttpError.Unauthorized("Only students can mark attendance");
  }

  const { grade, student, date, status } = req.body;

  if (!grade || !student || !date || !status) {
    throw new HttpError.BadRequest("All fields are required");
  }

  if (decoded.id !== student) {
    throw new HttpError.Forbidden("You can only mark attendance for yourself");
  }

  const attendance = await Attendance.create({
    class: grade,
    student,
    date,
    status,
  });

  console.log("Created attendance:", attendance);

  res.status(201).json({
    message: "Attendance marked successfully",
    data: attendance,
  });
}

export default withApiWrapper(markAttendance);
