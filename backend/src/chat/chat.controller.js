import chatService from "./chat.service";

const eventApi = async (req, res) => {
  try {
    const saveChat = await chatService.saveMessage(req.body);
    if (saveChat.error) throw new Error(saveChat.message);

    saveChat &&
      res.status(200).send({
        success: true,
      });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const getConversation = async (req, res) => {
  try {
    const { id } = req.body;
    const getChat = await chatService.getChatsByUser(id);
    if (getChat.error) throw new Error(getChat.message);

    res.status(200).send({
      success: true,
      data: getChat.data,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
export default { eventApi, getConversation };
