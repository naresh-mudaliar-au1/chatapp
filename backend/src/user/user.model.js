import { model, Schema } from "mongoose";

const userModel = new Schema({
  _id: { type: Schema.Types.ObjectId },
  username: { type: String },
  email: { type: String },
  socket_id: { type: String },
  password: { type: String, select: false },
});

const user = new model("user", userModel);

export default user;
