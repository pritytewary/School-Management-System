import { verifyUser } from "../../../../lib/jwt";
import withApiWrapper from "../../../../lib/with-api-wrapper";
import Timetable from "../../../../models/TimeTable";
import HttpError from "http-errors";

async function createTimeTable(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Admin") {
    throw new HttpError.Unauthorized("Only Admin can create timetable");
  }

  const { grade, subject, teacher, day, startTime, endTime } = req.body;

  if (!grade || !subject || !teacher || !day || !startTime || !endTime) {
    throw new HttpError.BadRequest("All fields are required");
  }

  const timetable = await Timetable.create({
    class: grade,
    subject,
    teacher,
    day,
    startTime,
    endTime,
  });

  console.log("Created timetable:", timetable);

  res.status(201).json({
    message: "Timetable created successfully",
    data: timetable,
  });
}

export default withApiWrapper(createTimeTable);
