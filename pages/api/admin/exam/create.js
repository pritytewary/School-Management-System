import { verifyUser } from "../../../../lib/jwt";
import withApiWrapper from "../../../../lib/with-api-wrapper";
import Exam from "../../../../models/Exam";
import HttpError from "http-errors";

async function createExam(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Admin") {
    throw new HttpError.Unauthorized("Only admin can create Exam");
  }

  const { name, subject, date, totalMarks } = req.body;
  if (!name || !subject || !date || !totalMarks) {
    throw new HttpError.BadRequest("All fields are required");
  }

  const exam = await Exam.create({
    name,
    subject,
    date,
    totalMarks,
  });

  res.status(201).json({
    message: "Exam created successfully",
    data: exam,
  });
}

export default withApiWrapper(createExam);
