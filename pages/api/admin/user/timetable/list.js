import { verifyUser } from "../../../../../lib/jwt";
import withApiWrapper from "../../../../../lib/with-api-wrapper";

import HttpError from "http-errors";
import Timetable from "../../../../../models/TimeTable";

async function listTimeTable(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (
    decoded.role !== "Teacher" &&
    decoded.role !== "Student" &&
    decoded.role !== "Admin"
  ) {
    throw new HttpError.Unauthorized(
      "Only authorized users can view the timetable"
    );
  }
  const getTimetable = await Timetable.find({}, undefined, {
    populate: [
      { path: "class", select: ["_id", "name"] },
      { path: "subject", select: ["_id", "name"] },
      { path: "teacher", select: ["_id", "username"] },
    ],
  });

  res.status(201).json({
    message: "Students fetched successfully",
    data: getTimetable,
  });
}

export default withApiWrapper(listTimeTable);
