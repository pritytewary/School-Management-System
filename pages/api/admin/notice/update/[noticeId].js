import { verifyUser } from "../../../../../lib/jwt";
import withApiWrapper from "../../../../../lib/with-api-wrapper";
import Notice from "../../../../../models/Notice";
import HttpError from "http-errors";

async function updateNotice(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Admin") {
    throw new HttpError.Unauthorized("Only admin can update notice");
  }

  const { id, name, description, date } = req.body;

  if (!id || !name || !description || !date) {
    throw new HttpError.BadRequest("All fields are required");
  }

  const notice = await Notice.findOneAndUpdate(
    { _id: id },
    { name, description, date },
    { new: true }
  );

  if (!notice) {
    throw new HttpError.NotFound("Notice not found");
  }

  res.status(200).json({
    message: "Notice updated successfully",
    data: notice,
  });
}

export default withApiWrapper(updateNotice);
