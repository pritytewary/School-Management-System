import { verifyUser } from "../../../../lib/jwt";
import withApiWrapper from "../../../../lib/with-api-wrapper";
import Notice from "../../../../models/Notice";
import HttpError from "http-errors";

async function listNotices(req, res) {
  const decoded = verifyUser(req.cookies.token);
  if (decoded.role !== "Admin") {
    throw new HttpError.Unauthorized("Only admin can list notices");
  }

  const notices = await Notice.find({});

  res.status(200).json({
    message: "Notices fetched successfully",
    data: notices,
  });
}

export default withApiWrapper(listNotices);
