import { model, Schema } from "mongoose";

const messageModel = new Schema({
  _id: { type: Schema.Types.ObjectId },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  content: String,
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

const messages = new model("Message", messageModel);

export default messages;
