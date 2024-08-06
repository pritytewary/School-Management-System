import withApiWrapper from "../../../lib/with-api-wrapper";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import { createHttpError } from "../../../lib/error-handler";

async function adminSignupApi(req, res) {
  const adminSignUpToken = req.headers.signuptoken;

  if (adminSignUpToken !== process.env.ADMIN_SIGNUP_TOKEN) {
    throw createHttpError(401, "Unauthorized: Invalid admin signup token");
  }

  const { firstName, lastName, username, password, address, email, role } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !username ||
    !password ||
    !email ||
    role !== "Admin"
  ) {
    throw createHttpError(
      400,
      "All required fields must be provided and role must be Admin"
    );
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw createHttpError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    username,
    password: hashedPassword,
    role: "Admin",
    address,
    grade: req.body.class,
    email,
  });

  res.status(201).json({
    message: "Admin user created successfully",
    data: user,
  });
}

export default withApiWrapper(adminSignupApi);
