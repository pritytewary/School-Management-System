import { verifyUser } from "../../../../../lib/jwt";
import withApiWrapper from "../../../../../lib/with-api-wrapper";
import Class from "../../../../../models/Class";
import HttpError from "http-errors";
import User from "../../../../../models/User";

async function getClass(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Admin") {
    throw new HttpError.Unauthorized("Only admin can create class");
  }

  const classId = req.query.classId;

  const getClass = await Class.findOne(
    {
      _id: classId,
    },
    undefined,
    {
      populate: [
        {
          path: "subjects",
          select: ["name", "teachers", , "_id"],
          populate: [
            {
              path: "teachers",
              select: ["firstName", "lastName", "_id", "username"],
            },
          ],
        },
      ],
    }
  );

  if (!getClass) {
    throw new HttpError.NotFound("Class not found");
  }

  const students = await User.find(
    {
      class: getClass._id,
      role: "Student",
    },
    {
      firstName: 1,
      lastName: 1,
      _id: 1,
      username: 1,
    }
  );

  res.status(201).json({
    message: "Class fetched successfully",
    data: {
      ...getClass.toJSON(),
      students: students.map((s) => s.toJSON()),
    },
  });
}

export default withApiWrapper(getClass);
