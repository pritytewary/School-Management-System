import withApiWrapper from "../../../lib/with-api-wrapper";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import HttpError from "http-errors";
import { serialize } from "cookie";
import { sign } from "../../../lib/jwt";

async function loginApi(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    throw new HttpError.NotFound("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new HttpError.BadRequest("Invalid credentials");
  }
  const TTL = 60 * 60 * 1;
  const token = sign(
    {
      type: "auth",
      id: user._id,
      username: user.username,
      role: user.role,
    },
    TTL
  );
  res.setHeader(
    "Set-Cookie",
    serialize("token", token, {
      maxAge: TTL * 1000,
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
  );
  res.status(200).json({ message: "Login successfully", token });
}

export default withApiWrapper(loginApi);
