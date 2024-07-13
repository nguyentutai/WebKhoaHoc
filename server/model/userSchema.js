import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  username: {
    type: String,
    required: true,
  },
  blogId: [{ type: mongoose.Schema.Types.ObjectId, ref: "blogs" }],
  orderId: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
