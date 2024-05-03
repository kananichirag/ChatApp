const mongoose = require("mongoose");

const conversitionSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const ConversitionModal = new mongoose.model(
  "Conversition",
  conversitionSchema
);

module.exports = ConversitionModal;
