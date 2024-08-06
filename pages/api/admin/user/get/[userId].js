import { verifyUser } from "../../../../../lib/jwt";
import withApiWrapper from "../../../../../lib/with-api-wrapper";
import User from "../../../../../models/User";
import HttpError from "http-errors";

async function getStudentTeacherData(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Student" && decoded.role !== "Teacher") {
    throw new HttpError.Unauthorized(
      "Only students and teachers can access this data"
    );
  }

  const userId = decoded.id;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new HttpError.NotFound("User not found");
  }

  res.status(200).json({
    message: "User retrieved successfully",
    data: user,
  });
}

export default withApiWrapper(getStudentTeacherData);
