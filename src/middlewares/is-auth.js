const jwt = require('jsonwebtoken')
const { statusCode } = require("../utils/statusCodeUtil")

exports.isAuthenticated= async (req,res,next)=>{
    const accessToken = req.session.accessToken;
    const expireDate = req.session.cookie.expires;

    if((expireDate instanceof Date && expireDate < new Date()))
    {
        res.status(statusCode.UNAUTHORIZED).send("Unauthorise access");
        return;
    }
    if(accessToken)
    {
        jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECREET,(err,accesInfo)=>{
            if(err || !accesInfo.isUserLoggenIn){
                res.status(statusCode.UNAUTHORIZED).send("Unauthorise access");
            }
            else{
                req.accesInfo = accesInfo;
                next();
            }
        })
    }
    else{
        res.status(statusCode.UNAUTHORIZED).send("Unauthorise access");
    }

}