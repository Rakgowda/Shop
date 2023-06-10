const userSchema = require("../../../models/Admin/user/userSchema");
const bcrypt = require("bcryptjs");
// const crypto = require("crypto");
const { statusCode, getBadRequestMsg, getInternalServerMsg, getOkMsg, getNotFoundMsg, getUnauthorizedMsg } = require("../../../utils/statusCodeUtil");
const {validationResult } = require("express-validator");
const { validationErroResponse } = require("../../../utils/errorHandlerUtils");
const jwt = require('jsonwebtoken');
const { getRandomBytes, getUserName } = require("../../../utils/dataUtils");
const { mailTransporter } = require("../../../config/mail/mailConfig");

// signup method
exports.postreateUser = async(req,res,next)=>{
    const {username,password,email} = req.body;
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
        res.status(statusCode.CREATED).send(getOkMsg("User created succussfully."))
    } catch (error) {
        console.error('Error while hashing password:', error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(getInternalServerMsg('Internal server error.'))
    }

}

// sign in
exports.postSignIn = async(req,res,next)=>{
    const {username,password} = req.body;
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
            res.status(statusCode.OK).send(getOkMsg("User signed in."));
        }
        else{
            res.status(statusCode.NOT_FOUND).send(getNotFoundMsg("Username and password not matching"))
        }

    } catch (error) {
        console.error('Error while hashing password:', error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(getInternalServerMsg('Internal server error.'))
    }

}

// updating user
exports.udateUserInfo = async(req,res,next)=>{
    const {username,password,email,role} = req.body;
    const result = validationResult(req);
    if(!result.isEmpty())
    {
        return validationErroResponse(result,res);
    }
    try {
        const hashPassword = await bcrypt.hash(password,12);
        const user = await userSchema.updateOne({username:username},{$set:{email,password:hashPassword,role}});
        if(user){
            if(getUserName(req) == user.username)
            {
                const accessToken = jwt.sign({user:user,isUserLoggenIn:true},process.env.ACCESS_TOKEN_SECREET);
                req.session.accessToken = accessToken;
            }
            res.status(statusCode.OK).send(getOkMsg("User Update successfully."));
        }

    } catch (error) {
        console.error('Error while hashing password:', error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(getInternalServerMsg('Internal server error.'))
    }

}

exports.getAllUsers = async(req,res,next)=>{
    try {
          console.log("🚀 ~ file: authController.js:64 ~ exports.udateUserInfo=async ~ req.user:", req.accesInfo)
        const user = await userSchema.find({});
        res.status(statusCode.OK).send(getOkMsg({user}));
    } catch (error) {
        console.error('Error while hashing password:', error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(getInternalServerMsg('Internal server error.'))
    }

}

exports.postLogOut = (req,res,next)=>{
    console.log(req.session);
        req.session.destroy((err)=>{
            console.log(err);
            res.send(getOkMsg("user logged out."))

        });
}

exports.forgotPassword = async(req,res,next)=>{
    const {email} = req.body;
    const result = validationResult(req);
    if(!result.isEmpty())
    {
        return validationErroResponse(result,res);
    }
        let resetToken = getRandomBytes(64);
        console.log("🚀 ~ file: authController.js:119 ~ exports.forgotPassword=async ~ resetToken:", resetToken)
        if(resetToken =="")
        {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(getInternalServerMsg("Error while generating link"))
        }
        const user = await userSchema.findOne({email:email});
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000;
        try {
            const userSave = await user.save();
            if(userSave)
            {
                let mailDetails = {
                    from: 'learnrak2016@gmail.com',
                    to: email,
                    subject: 'Reset password',
                    // text: 'Node.js testing mail for GeeksforGeeks',
                    html: "<b>Please click here reset the password <a href='http://localhost:3000/reset/" + resetToken +"'>Reset Pawword</a></b>", 
                  }
                //   let mailsent = await mailTransporter.sendMail(mailDetails)
                  if(mailsent)
                  {
                    res.send(getOkMsg("Password reset link is sent to email, please check your email."))
                  }
            }
        } catch (error) {
            console.log("🚀 ~ file: authController.js:133 ~ exports.forgotPassword=async ~ error:", error)
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(getInternalServerMsg('Internal server error.'))
        }


}

exports.reset = async (req,res,next)=>{
    const resetToken = req.params.resetToken;
    const user = await userSchema.findOne({ resetToken: resetToken, resetTokenExpiration :{$gt: Date.now()} });
    if(user)
    {
      res.send(getOkMsg("Valid token."));
    }
    else{
        res.status(statusCode.UNAUTHORIZED).send(getUnauthorizedMsg("Invalid token"));
    }
  
  }

  exports.updatePassword = async (req,res,next)=>{
    const {password,resetToken} = req.body;
    const result = validationResult(req);
    if(!result.isEmpty())
    {
        return validationErroResponse(result,res);
    }
    const user = await userSchema.findOne({ resetToken: resetToken, resetTokenExpiration :{$gt: Date.now()} });
  
    if(user)
    {
        const hashPassword = await bcrypt.hash(password,12);
        user.password = hashPassword;
        user.resetToken ="";
        user.resetTokenExpiration= null;
        const saveUser = await user.save()
        if(saveUser)
        {
          res.send(getOkMsg("Password updated successfully."));
        }
    }
    else{
        res.status(statusCode.UNAUTHORIZED).send(getUnauthorizedMsg("Invalid token"));
    }
  
  }
