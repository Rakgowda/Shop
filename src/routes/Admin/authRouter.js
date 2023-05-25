const express = require('express');
const routes = express.Router();
const authController = require('../../controllers/Admin/authController')
const { createUserRules, userSignInRule, updateUserInfoRule, forgotPasswordRule, updatePasswordRule } = require('../../utils/validationRuleUtil');
const { isAuthenticated } = require('../../middlewares/is-auth');

// sign up
routes.post("/signup",createUserRules,authController.postSignUp);
routes.post("/signin",userSignInRule,authController.postSignIn);
routes.put("/udateUserInfo",isAuthenticated,updateUserInfoRule,authController.udateUserInfo)
routes.get("/getAllUsers",isAuthenticated,authController.getAllUsers);
routes.get("/logout",isAuthenticated,authController.postLogOut)
routes.post("/forgotpassword",forgotPasswordRule,authController.forgotPassword);
routes.get("/reset/:resetToken",authController.reset);
routes.post("/updatePassword",updatePasswordRule,authController.updatePassword);

module.exports = routes;

