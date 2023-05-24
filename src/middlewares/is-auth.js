const jwt = require('jsonwebtoken')
const { statusCode } = require("../utils/statusCodeUtil")

exports.isAuthenticated= async (req,res,next)=>{
    console.log(req.session);
    const accessToken = req.session.accessToken;
    const expireDate = req.session.cookie.expires;
    const isUserLoggedIn = req.session.isUserLoggedIn;

    if(isUserLoggedIn ==null || expireDate == null || (expireDate instanceof Date && expireDate < new Date()))
    {
        res.status(statusCode.UNAUTHORIZED).send("Unauthorise access");
        return;
    }
    let isAuth = false;
    if(accessToken)
    {
        jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECREET,(err,user)=>{
            // console.log(user);
            if(err){
                res.status(statusCode.UNAUTHORIZED).send("Unauthorise access");
            }
            else{
                next();
            }
        })
    }
    else{
        res.status(statusCode.UNAUTHORIZED).send("Unauthorise access");
    }

}