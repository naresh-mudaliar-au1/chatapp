import { Schema } from "mongoose";

const messageModel = new Schema({
  id: { type: Schema.Types.ObjectId },
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

export default messageModel;
