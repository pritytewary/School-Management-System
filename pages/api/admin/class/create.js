import { verifyUser } from "../../../../lib/jwt";
import withApiWrapper from "../../../../lib/with-api-wrapper";
import Class from "../../../../models/Class";
import HttpError from "http-errors";

async function createClass(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Admin") {
    throw new HttpError.Unauthorized("Only admin can create subject");
  }

  const { name, subjectIds } = req.body;

  const createdClass = await Class.create({
    name,
    subjects: subjectIds,
  });

  res.status(201).json({
    message: "Class created successfully",
    data: createdClass,
  });
}

export default withApiWrapper(createClass);
