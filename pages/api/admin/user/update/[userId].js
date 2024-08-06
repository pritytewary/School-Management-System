import { verifyUser } from "../../../../../lib/jwt";
import withApiWrapper from "../../../../../lib/with-api-wrapper";
import User from "../../../../../models/User";
import HttpError from "http-errors";

async function updateUser(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Admin") {
    throw new HttpError.Unauthorized("Only admin can update user");
  }

  const userId = req.query.userId;

  const { firstName, lastName, classId, email, password, address } = req.body;

  const user = await User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      $set: {
        firstName,
        lastName,
        class: classId,
        email,
        password,
        address,
      },
    },
    {
      new: true,
    }
  );

  if (!user) {
    throw new HttpError.NotFound("User not found");
  }

  res.status(201).json({
    message: "User updated successfully",
    data: user,
  });
}

export default withApiWrapper(updateUser);
