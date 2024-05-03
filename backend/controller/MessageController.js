const Message = require("../model/Message");
const Conversition = require("../model/Conversition");

const SendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversition = await Conversition.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversition) {
      conversition = await Conversition.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversition.messages.push(newMessage._id);
    }

    if (newMessage) {
      await Promise.all([conversition.save(), newMessage.save()]);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const GetMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversition = await Conversition.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversition) return res.status(200).json([]);

    const messages = conversition.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in GetMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  SendMessage,
  GetMessage,
};
