import { verifyUser } from "../../../../lib/jwt";
import withApiWrapper from "../../../../lib/with-api-wrapper";
import User from "../../../../models/User";
import HttpError from "http-errors";

async function studentList(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Admin") {
    throw new HttpError.Unauthorized("Only admin can see Student List");
  }

  const students = await User.find(
    {
      role: "Student",
    },
    {
      _id: 1,
      firstName: 1,
      lastName: 1,
      username: 1,
      grade: 1,
      email: 1,
      password: 1,
    },
    {
      sort: {
        createdAt: -1,
      },
      populate: [
        {
          path: "grade",
          select: ["_id", "name"],
        },
      ],
    }
  );

  res.status(201).json({
    message: "Student listed successfully",
    data: students,
  });
}

export default withApiWrapper(studentList);
