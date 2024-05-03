const express = require("express");
const UserRoute = express.Router();
const ProtectRoute = require("../middleware/ProtectRoute");
const UserController = require("../controller/UerController");

UserRoute.get("/getuser", ProtectRoute, UserController.GetAllUser);

module.exports = UserRoute;
