const { statusCode, getUnauthorizedMsg } = require("../utils/statusCodeUtil");

exports.isAdminAccess = async (req,res,next)=>{
    const accesInfo = req.accesInfo;
    const {role} = accesInfo.user;
    if(role && role == "admin")
    {
        next();
    }
    else{
        res.status(statusCode.UNAUTHORIZED).send(getUnauthorizedMsg("Unauthorise access"));
    }

}