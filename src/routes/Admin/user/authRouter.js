const express = require('express');
const routes = express.Router();
const authController = require('../../../controllers/Admin/user/authController')
const { createUserRules, userSignInRule, updateUserInfoRule, forgotPasswordRule, updatePasswordRule } = require('../../../validator/Admin/userValidator/userValidationRule');
const { isAuthenticated } = require('../../../middlewares/is-auth');
const { isAdminAccess } = require('../../../middlewares/is-admin');

// sign up
routes.post("/createUser",isAuthenticated,isAdminAccess,createUserRules,authController.postreateUser);
routes.post("/signin",userSignInRule,authController.postSignIn);
routes.put("/udateUserInfo",isAuthenticated,isAdminAccess,updateUserInfoRule,authController.udateUserInfo)
routes.get("/getAllUsers",isAuthenticated,isAdminAccess,authController.getAllUsers);
routes.get("/logout",isAuthenticated,authController.postLogOut)
routes.post("/forgotpassword",forgotPasswordRule,authController.forgotPassword);
routes.get("/reset/:resetToken",authController.reset);
routes.post("/updatePassword",updatePasswordRule,authController.updatePassword);

module.exports = routes;

