import MessageModel from "./models/chat.message.model";
import ChatModel from "./models/chat.model";

const saveMessage = async (data) => {
  try {
    const { sender, receiver, content } = data;
    const newMessage = new MessageModel();
    await newMessage.save();
    return { error: false };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

const getChatsByUser = async (id) => {
  try {
    const userMessages = await ChatModel.find({
      $or: [{ user_one: id }, { user_two: id }],
    });
    return userMessages;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export default { saveMessage, getChatsByUser };
