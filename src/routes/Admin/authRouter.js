const express = require('express');
const routes = express.Router();
const authController = require('../../controllers/Admin/authController')
const { createUserRules, userSignInRule } = require('../../utils/validationRuleUtil');
const { isAuthenticated } = require('../../middlewares/is-auth');

// sign up
routes.post("/signup",createUserRules,authController.postSignUp);
routes.post("/signin",userSignInRule,authController.postSignIn);
routes.get("/getAllUsers",isAuthenticated,authController.getAllUsers)



module.exports = routes;

