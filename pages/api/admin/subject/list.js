import { verifyUser } from "../../../../lib/jwt";
import withApiWrapper from "../../../../lib/with-api-wrapper";
import Subject from "../../../../models/Subject";
import HttpError from "http-errors";

async function listSubjects(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Admin") {
    throw new HttpError.Unauthorized("Only admin can create subject");
  }

  const subjects = await Subject.find({}, undefined, {
    populate: [
      {
        path: "teachers",
        select: ["_id", "firstName", "lastName", "username"],
      },
    ],
  });

  res.status(201).json({
    message: "Subjects fetched successfully",
    data: subjects,
  });
}

export default withApiWrapper(listSubjects);
