import mongoose, { Schema } from "mongoose";

const attendanceSchema = new Schema(
  {
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true,
    },
  },
  { timestamps: true }
);

const Attendance =
  mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);
export default Attendance;
