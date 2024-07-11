import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    coursesId: [{ type: mongoose.Schema.Types.ObjectId, ref: "courses" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("categorys", categorySchema);
