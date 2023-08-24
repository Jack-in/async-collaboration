import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
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
    },
    imgUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    linkId: {
      type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Video", VideoSchema);
