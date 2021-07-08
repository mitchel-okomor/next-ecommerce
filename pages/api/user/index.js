import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import { auth } from "../../../middleware/auth";

import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await uploadInfo(req, res);
      break;
    case "GET":
      await getUsers(req, res);
      break;
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(401).json({ err: "Unauthorized" });
    const users = await Users.find().select("-password");
    res.json({ users });
  } catch (err) {
    return res.status(500).json({ err: err.msg });
  }
};

const uploadInfo = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { name, avatar } = req.body;

    const newUser = await Users.findByIdAndUpdate(
      { _id: result.id },
      { name, avatar }
    ).select("-password");
    res.json({
      msg: "Update Success!",
      user: {
        name,
        avatar,
        email: newUser.email,
        role: newUser.role,
        root: newUser.root,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
