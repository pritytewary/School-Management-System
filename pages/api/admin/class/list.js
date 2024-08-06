import { verifyUser } from "../../../../lib/jwt";
import withApiWrapper from "../../../../lib/with-api-wrapper";
import Class from "../../../../models/Class";
import HttpError from "http-errors";

async function listClass(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Admin") {
    throw new HttpError.Unauthorized("Only admin can create subject");
  }

  const classes = await Class.find({}, undefined, {
    populate: [
      {
        path: "subjects",
        select: ["name", "_id"],
      },
    ],
  });

  res.status(201).json({
    message: "Classes fetched successfully",
    data: classes,
  });
}

export default withApiWrapper(listClass);
