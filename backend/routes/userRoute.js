const express = require("express");
const { register, login,logout, followAndUnfollowUser, updatedPassword ,updateProfile, myProfile, getUserProfile, getAllUsers, forgotPassword, resetPassword} = require("../controllers/userController");
const {isAuthenticated} = require("../middlewares/auth");
const { deleteMyProfile } = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/update-password").put(isAuthenticated,updatedPassword);

router.route("/update-profile").put(isAuthenticated,updateProfile);

router.route("/follow-unfollow/:id").get(isAuthenticated,followAndUnfollowUser);

router.route("/delete/me").delete(isAuthenticated,deleteMyProfile);

router.route("/me").get(isAuthenticated,myProfile);

router.route("/user/:id").get(isAuthenticated,getUserProfile);

router.route("/users").get(isAuthenticated,getAllUsers);

router.route("/forget/password").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

module.exports = router;

