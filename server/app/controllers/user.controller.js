const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
// Mendapatkan semua user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["user_id", "username", "email", "role", "issuspended"],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchUser = async (req, res) => {
  const { username } = req.query;

  try {
    const users = await User.findAll({
      where: {
        username: {
          [db.Sequelize.Op.like]: `%${username}%`,
        }
      },
      attributes: ["user_id", "username", "email", "role"],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.suspendUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Temukan pengguna berdasaarkan user_id
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({
        message: `User with user_id=${user_id} not found`,
      });
    }

    // Update status isSuspended
    if (user.issuspended) {
      user.issuspended = false;
      await user.save();

      return res.status(200).json({
        message: "User unsuspended successfully",
      });
    } else {
      user.issuspended = true;
      await user.save();

       return res.status(200).json({
        message: "User suspended successfully",
      });
    }
  } catch (error) {
    console.log("Error suspending user: ", error);
    res.status(500).json({ message: error.message });
  }
};