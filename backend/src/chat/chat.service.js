import MessageModel from "./models/chat.message.model";
import ChatModel from "./models/chat.model";

const saveMessage = async (data) => {
  try {
    if (!Object.keys(data).length) throw new Error("No Sender exist!");
    const { sender, receiver, content } = data;
    const user_chat = await ChatModel.findOne({
      $or: [
        { $and: [{ user_one: sender }, { user_two: receiver }] },
        { $and: [{ user_one: receiver }, { user_two: sender }] },
      ],
    });

    const new_message = { sender, receiver, content };
    //if chat does not exist create new chat
    if (!user_chat) {
      const new_chat = new ChatModel({ user_one: sender, user_two: receiver });
      new_chat.messages.push(new_message);
      await new_chat.save();
    } else {
      user_chat.messages.push(new_message);
      await user_chat.save();
    }
    return { error: false };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

const getChatsByUser = async (id) => {
  try {
    // const userMessages = await ChatModel.findOne({
    //   $or: [{ user_one: id }, { user_two: id }],
    // });
    const userMessages = await ChatModel.aggregate([
      {
        $match: {
          $or: [{ user_one: id }, { user_two: id }],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_one",
          foreignField: "_id",
          as: "userOneDetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_two",
          foreignField: "_id",
          as: "userTwoDetails",
        },
      },
    ]);
    return { error: false, data: userMessages };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export default { saveMessage, getChatsByUser };
