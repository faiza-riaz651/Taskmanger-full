import { users } from "../models/userModel.js";
import { hashPassword, confirmPassword } from "../utils/password.js";
import passport from "passport";
const createUser = async (req, res, next) => {
  try {
    const { name, email, password, phoneNo } = req.body;
    // json obj become data--->obj nmaed data nd its key,val pairs can be accessed by .
    if (!name) return res.status(400).json({ error: "Please enter Name" });
    if (!email) return res.status(400).json({ error: "Please enter Emial" });
    if (!password)
      return res.status(400).json({ error: "Please enter Password" });
    if (!phoneNo)
      return res.status(400).json({ error: "Please enter phoneNo" });

    const hashedPass = await hashPassword(password);

    const user = await users.create({
      name,
      email,
      password: hashedPass,
      phoneNo,
      isAdmin: req.body?.isAdmin,
    });

    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      // res.redirect("/");
      return res.status(201).json({ data: user });
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    // console.log(req.user);
    // res.redirect("/");
  });
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await users.find({});
    if (!allUsers) {
      res.status(200).json({ message: "No Users In DB" });
    }
    return res.status(200).send(allUsers);
  } catch (error) {}
};

const getUser = (req, res, next) => {
  console.log(req.user);
  return res.status(200).json(req.user);
};

const updateUserByAdmin = async (req, res, next) => {
  try {
    const { name, email, phoneNo } = req.body;
    const { id } = req.params;

    const user = await users.findByIdAndUpdate(id, {
      name: name,
      email: email,
      phoneNo: phoneNo,
    });

    if (!user) {
      return res.status(404).json({ error: "Use Not Found!" });
    }
    return res.status(200).json({ user: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteUserByAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await users.findByIdAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({ error: "User Not Found!" });
    }
    return res.status(200).json({ message: `User By UserId:${id} Deleted` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, email, phoneNo } = req.body;
    const image = req.file.filename;
    console.log(req.body);
    console.log("imgae is", image);

    const id = req?.params?.id;
    console.log(`pritning id of req ${id}`);
    const user = await users.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        email: email,
        phoneNo: phoneNo,
        image: image,
      },
      { new: true },
    );
    if (!user) {
      res.status(404).json({ error: "User Not Found!" });
    }
    req.user.name = req.body?.name || req.user.name;
    req.user.phoneNo = req.body?.phoneNo || req.user.phoneNo;
    req.user.email = req.body?.email || req.user.email;
    req.user.image = req.file?.filename || req.file.filename;
    console.log(req.user);
    return res.status(200).send(req.user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// const updateUser = async (req, res, next) => {
//   try {
//     console.log(req.body);
//     console.log(req.file);
//   } catch (error) {
//     console.log(error.message);
//   }
// };
const deleteUser = async (req, res, next) => {
  try {
    const id = req?.params?.id;
    const userToDelete = await users.findOneAndDelete({ _id: id });
    if (!userToDelete) {
      return res.status(404).json({ error: "User Not Found!" });
    }
    // await userToDelete.deleteOne();
    req.user = null;
    // console.log(req.user);
    req.logout((err) => {
      if (err) return next(err);
    });

    return res.status(200).json({ message: `User  is deleted` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export {
  createUser,
  logoutUser,
  getUser,
  updateUserByAdmin,
  deleteUserByAdmin,
  getAllUsers,
  updateUser,
  deleteUser,
};
