const express = require("express");
const AuthRoute = express.Router();
const AuthController = require("../controller/AuthContoller");

AuthRoute.post("/signup", AuthController.SignUp);
AuthRoute.post("/signin", AuthController.SignIn);
AuthRoute.post("/logout", AuthController.LogOut);

module.exports = AuthRoute;
