import { verifyUser } from "../../../../lib/jwt";
import withApiWrapper from "../../../../lib/with-api-wrapper";
import User from "../../../../models/User";
import HttpError from "http-errors";

async function teacherList(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Admin") {
    throw new HttpError.Unauthorized("Only admin can create subject");
  }

  const tecahers = await User.find(
    {
      role: "Teacher",
    },
    {
      _id: 1,
      firstName: 1,
      lastName: 1,
      username: 1,
      email: 1,
      address: 1,
      password: 1,
    },
    {
      sort: {
        createdAt: -1,
      },
    }
  );

  res.status(201).json({
    message: "Teacher listed successfully",
    data: tecahers,
  });
}

export default withApiWrapper(teacherList);
