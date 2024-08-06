import { verifyUser } from "../../../../lib/jwt";
import withApiWrapper from "../../../../lib/with-api-wrapper";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import HttpError from "http-errors";

async function createUser(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Admin") {
    throw new HttpError.Unauthorized("Only admin can create user");
  }

  const {
    firstName,
    lastName,

    username,
    password,
    role,
    address,
    email,
    grade,
  } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new HttpError.BadRequest("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    firstName,
    lastName,
    username,
    address,
    email,
    password: hashedPassword,
    role,
  };

  if (role === "Student") {
    userData.grade = grade;
  }

  const user = await User.create(userData);

  res.status(201).json({
    message: "User created successfully",
    data: user,
  });
}

export default withApiWrapper(createUser);
