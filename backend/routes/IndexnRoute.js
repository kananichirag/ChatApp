const express = require("express");
const IndexRoutes = express.Router();
const Authroutes = require("./AuthRoutes");
const MessageRoutes = require("./MessageRoutes");
const UserRoutes = require("./UserRoutes");

IndexRoutes.use("/auth", Authroutes);
IndexRoutes.use("/msg", MessageRoutes);
IndexRoutes.use("/user", UserRoutes);

module.exports = IndexRoutes;
