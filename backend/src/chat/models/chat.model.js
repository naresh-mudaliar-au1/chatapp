import { model, Schema } from "mongoose";
import { messageModel } from "./chat.message.model";

const chatModel = new Schema({
  _id: { type: Schema.Types.ObjectId },
  user_one: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  user_two: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  room_id: { type: String },
  messages: [messageModel],
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});
const chat = new model("chat", chatModel);

export default chat;
