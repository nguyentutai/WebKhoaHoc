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
  image_url: {
    type: String,
    default:
      "https://tse2.mm.bing.net/th?id=OIP.xv5ky4lYh1TkiIZW6wwYJAAAAA&pid=Api&P=0&h=180",
  },
  username: {
    type: String,
    required: true,
  },
  blogId: [{ type: mongoose.Schema.Types.ObjectId, ref: "blogs" }],
  orderId: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
  password: {
    type: String,
  },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
