var _ = require('lodash');
const crypto = require('crypto');
const { ObjectId } = require('mongoose').Types;

exports.isEmpty = (value)=>{
    return _.isEmpty(value)
}

exports.getUserFromToken = (accessToken)=>{
    jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECREET,(err,user)=>{
        if(err){
            return null;
        }
        else{
            return user;
        }
    })
}

exports.getRandomBytes= (bytes=32)=>{
    try {
        const randomBytes = crypto.randomBytes(bytes);
        return randomBytes.toString("hex");
    } catch (error) {
        return ""
    }

}

exports.isValidObjectId = (id) =>{
    return ObjectId.isValid(id);
  }

exports.getUserName = (req) =>{
    return req.accesInfo.user.username;
}