const express = require("express");
const MessageRoute = express.Router();
const MessageController = require("../controller/MessageController");
const ProtectRoute = require("../middleware/ProtectRoute");

MessageRoute.post("/send/:id", ProtectRoute, MessageController.SendMessage);
MessageRoute.get("/:id", ProtectRoute, MessageController.GetMessage);

module.exports = MessageRoute;
