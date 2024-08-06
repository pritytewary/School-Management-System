import mongoose, { Schema } from "mongoose";

const noticeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,

      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Notice = mongoose.models.Notice || mongoose.model("Notice", noticeSchema);
export default Notice;
