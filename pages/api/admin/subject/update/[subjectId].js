import { verifyUser } from "../../../../../lib/jwt";
import withApiWrapper from "../../../../../lib/with-api-wrapper";
import Subject from "../../../../../models/Subject";
import HttpError from "http-errors";

async function updateSubject(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Admin") {
    throw new HttpError.Unauthorized("Only admin can create subject");
  }

  const subjectId = req.query.subjectId;
  console.log(subjectId);

  const { name, teacherIds } = req.body;

  const subject = await Subject.findOneAndUpdate(
    {
      _id: subjectId,
    },
    {
      $set: {
        name,
        teachers: teacherIds,
      },
    },
    {
      new: true,
    }
  );

  if (!subject) {
    throw new HttpError.NotFound("Subject not found");
  }
  res.status(201).json({
    message: "Subject updated successfully",
    data: subject,
  });
}

export default withApiWrapper(updateSubject);
