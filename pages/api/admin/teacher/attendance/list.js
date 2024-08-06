import Attendance from "../../../../../models/Attendance";
import { verifyUser } from "../../../../../lib/jwt";
import withApiWrapper from "../../../../../lib/with-api-wrapper";

import HttpError from "http-errors";

async function listSubjects(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Teacher") {
    throw new HttpError.Unauthorized(
      "Only teacher can view student attendance"
    );
  }

  const students = await Attendance.find({}, undefined, {
    populate: [
      {
        path: "student",
        select: ["_id", "class", "date", "username", "status"],
      },
    ],
  });

  res.status(201).json({
    message: "Students fetched successfully",
    data: students,
  });
}

export default withApiWrapper(listSubjects);
