const bcryptjs = require("bcryptjs");
const User = require("../model/User");
const generateTokenAndSetCookie = require("../utils/GenrateToken");

const SignUp = async (req, res) => {
  try {
    console.log(req.body);
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, msg: "Password Don't Match.!!" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ success: false, msg: "User name Already Exists.!!" });
    }

    const HashPass = await bcryptjs.hashSync(password, 10);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: HashPass,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    console.log(newUser);
    if (newUser) {
      await newUser.save();
      res.status(200).json({
        success: true,
        msg: "User Created.!!",
        user: {
          _id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          profilePic: newUser.profilePic,
        },
      });
    } else {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid User Data.!!" });
    }
  } catch (error) {
    console.log("Error to SignUP ====>", error);
    res.status(500).json({ success: false, msg: "Internal Server Error.!!" });
  }
};

const SignIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid Username or Password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      success: true,
      msg: "Login successfully..!!",
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.log("Error to SignIn ====>", error);
    res.status(500).json({ success: false, msg: "Internal Server Error.!!" });
  }
};

const LogOut = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ success: true, msg: "Logout Successfully.!!" });
  } catch (error) {
    console.log("Error to Logout ====>", error);
    res.status(500).json({ success: false, msg: "Internal Server Error.!!" });
  }
};

module.exports = {
  SignUp,
  SignIn,
  LogOut,
};
