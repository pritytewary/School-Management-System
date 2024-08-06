import { verifyUser } from "../../../../../lib/jwt";
import withApiWrapper from "../../../../../lib/with-api-wrapper";
import Class from "../../../../../models/Class";
import HttpError from "http-errors";

async function updateClass(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Admin") {
    throw new HttpError.Unauthorized("Only admin can create class");
  }

  const classId = req.query.classId;
  const { name, subjectIds } = req.body;

  const updateClass = await Class.findOneAndUpdate(
    {
      _id: classId,
    },
    {
      $set: {
        name,
        subjects: subjectIds,
      },
    },
    {
      new: true,
    }
  );

  if (!updateClass) {
    throw new HttpError.NotFound("Class not found");
  }

  res.status(201).json({
    message: "Class fetched successfully",
    data: updateClass,
  });
}

export default withApiWrapper(updateClass);
