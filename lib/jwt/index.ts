import jwt from "jsonwebtoken";
import HttpError from "http-errors";

export function sign(payload = {}, ttl = 3600) {
  return jwt.sign(
    {
      ...payload,
      nbf: Math.floor(new Date().getTime() / 1000),
      exp: Math.floor(new Date().getTime() / 1000) + ttl,
    },
    process.env.JWT_SECRET as string
  );
}

export function verify(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    throw new HttpError.Unauthorized("Token is invalid");
  }
}

export function verifyUser(token: string): AuthPayload {
  try {
    const decoded = verify(token) as AuthPayload;
    if (decoded.type !== "auth")
      throw new HttpError.Unauthorized("Token is invalid");

    return decoded;
  } catch (error) {
    throw new HttpError.Unauthorized("Login is expired, please login again");
  }
}

export type LoginPayload = {
  type: "login";
  id: string;
  role: "Admin" | "Student" | "Teacher";
};

export type AuthPayload = {
  type: "auth";
  id: string;
  email: string;
  role: string; // Add the role to the AuthPayload
};
