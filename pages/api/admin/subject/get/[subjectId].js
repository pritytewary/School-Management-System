import { verifyUser } from "../../../../../lib/jwt";
import withApiWrapper from "../../../../../lib/with-api-wrapper";
import Subject from "../../../../../models/Subject";
import HttpError from "http-errors";

async function getSubject(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Admin") {
    throw new HttpError.Unauthorized("Only admin can get subject");
  }

  const subjectId = req.query.subjectId;

  const subject = await Subject.findOne(
    {
      _id: subjectId,
    },
    undefined,
    {
      populate: [
        {
          path: "teachers",
          select: ["_id", "firstName", "lastName", "username"],
        },
      ],
    }
  );

  if (!subject) {
    throw new HttpError.NotFound("Subject not found");
  }

  res.status(201).json({
    message: "Subject fetched successfully",
    data: subject,
  });
}

export default withApiWrapper(getSubject);
