const userSchema = require("../../models/Admin/userSchema");
const bcrypt = require("bcryptjs");
// const crypto = require("crypto");
const { statusCode, getBadRequestMsg, getInternalServerMsg, getOkMsg, getNotFoundMsg } = require("../../utils/statusCodeUtil");
const {validationResult } = require("express-validator");
const { validationErroResponse } = require("../../utils/errorHandlerUtils");
const jwt = require('jsonwebtoken')

// signup method
exports.postSignUp = async(req,res,next)=>{
    const {username,password,email} = req.body;
    console.log("🚀 ~ file: authController.js:12 ~ exports.postSignUp=async ~ username:", username)
    const result = validationResult(req);
    if(!result.isEmpty())
    {
        console.log(result);
        return validationErroResponse(result,res);
    }
    try {
        const hashPassword = await bcrypt.hash(password,12);
        const user = new userSchema({username:username,password:hashPassword,email:email});
        await user.save();
        res.status(statusCode.CREATED).send(getOkMsg("User signed up."))
    } catch (error) {
        console.error('Error while hashing password:', error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(getInternalServerMsg('Internal server error.'))
    }

}

// sign in
exports.postSignIn = async(req,res,next)=>{
    const {username,password} = req.body;
    console.log("🚀 ~ file: authController.js:12 ~ exports.postSignUp=async ~ username:", username)
    const result = validationResult(req);
    if(!result.isEmpty())
    {
        console.log(result);
        return validationErroResponse(result,res);
    }
    try {
        const user = await userSchema.findOne({username:username});
        console.log(user);
        const doMatch = await bcrypt.compare(password,user.password);
        if(doMatch){
            const accessToken = jwt.sign({user:user,isUserLoggenIn:true},process.env.ACCESS_TOKEN_SECREET);
            req.session.accessToken = accessToken;
            req.session.isUserLoggedIn = true;
            res.status(statusCode.OK).send(getOkMsg("User signed up."));
        }
        else{
            res.status(statusCode.NOT_FOUND).send(getNotFoundMsg("Username and password not matching"))
        }

    } catch (error) {
        console.error('Error while hashing password:', error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(getInternalServerMsg('Internal server error.'))
    }

}

exports.getAllUsers = async(req,res,next)=>{
    try {
        const user = await userSchema.find({});
        res.status(statusCode.OK).send(getOkMsg({user}));
    } catch (error) {
        console.error('Error while hashing password:', error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(getInternalServerMsg('Internal server error.'))
    }

}
