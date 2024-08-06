import { verifyUser } from "../../../../lib/jwt";
import withApiWrapper from "../../../../lib/with-api-wrapper";
import Notice from "../../../../models/Notice";
import HttpError from "http-errors";

async function createNotice(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Admin") {
    throw new HttpError.Unauthorized("Only admin can create Exam");
  }

  const { name, description, date } = req.body;
  if (!name || !description || !date) {
    throw new HttpError.BadRequest("All fields are required");
  }

  const notice = await Notice.create({
    name,
    description,
    date,
  });

  res.status(201).json({
    message: "Notice created successfully",
    data: notice,
  });
}

export default withApiWrapper(createNotice);
