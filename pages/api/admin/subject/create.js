import withApiWrapper from "../../../../lib/with-api-wrapper";
import Subject from "../../../../models/Subject";
import User from "../../../../models/User";
import HttpError from "http-errors";
import { verifyUser } from "../../../../lib/jwt";

async function createSubjectApi(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Admin") {
    throw new HttpError.Unauthorized("Only admin can create subjects");
  }

  const { name, teachers } = req.body;

  if (!name) {
    throw new HttpError.BadRequest("Name is required");
  }

  if (teachers && teachers.length > 0) {
    const teacherCount = await User.countDocuments({
      _id: { $in: teachers },
      role: "Teacher",
    });

    if (teacherCount !== teachers.length) {
      throw new HttpError.BadRequest("One or more teacher IDs are invalid");
    }
  }

  const newSubject = await Subject.create({
    name,
    teachers,
  });

  res.status(201).json({
    message: "Subject created successfully",
    data: newSubject,
  });
}

export default withApiWrapper(createSubjectApi);
