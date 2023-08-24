import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Link", LinkSchema);
