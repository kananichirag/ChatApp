const User = require("../model/User");

const GetAllUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const users = await User.find({ _id: { $ne: userId } }).    elect("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { GetAllUser };
