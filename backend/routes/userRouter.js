import express from "express";
import {
  createUser,
  logoutUser,
  getUser,
  updateUser,
  updateUserByAdmin,
  deleteUserByAdmin,
  getAllUsers,
  deleteUser,
} from "../controller/userController.js";
import { upload } from "../middleware/imageMiddleware.js";
import passport from "passport";
import { isAuthenticated, isAdmin } from "../middleware/userAuth.js";

const userRouter = express.Router();

userRouter.route("/").post(createUser);

userRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: info?.message || "User not found" });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      // Send only safe user info
      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          image: user.image,
          email: user.email,
          isAdmin: user.isAdmin,
          phoneNo: user.phoneNo,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    });
  })(req, res, next);
});

userRouter.route("/logout").post(logoutUser);

userRouter.route("/userInfo").get(isAuthenticated, getUser);

userRouter.route("/admin/allusers").get(isAuthenticated, isAdmin, getAllUsers);

// userRouter
//   .route("/user/:id")
//   .put(isAuthenticated, updateUser)
//   .delete(isAuthenticated, deleteUser);

userRouter
  .route("/user/:id")
  .put(isAuthenticated, upload.single("img"), updateUser)
  .delete(isAuthenticated, deleteUser);
userRouter
  .route("/user/admin/:id")
  .get(isAuthenticated, isAdmin, getUser)
  .put(isAuthenticated, isAdmin, updateUserByAdmin)
  .delete(isAuthenticated, isAdmin, deleteUserByAdmin);

export default userRouter;
