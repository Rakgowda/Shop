const { statusCode, getBadRequestMsg } = require("./statusCodeUtil");

exports.throwNewError = (errMsg,statusCode)=>{
    throw new Error(JSON.stringify({errMsg : errMsg,statusCode:statusCode}));
}

exports.errorMsg = (errMsg,statusCode)=>{
    return JSON.stringify({errMsg:errMsg,statusCode:statusCode})
}

exports.validationErroResponse=(result,res)=>{
    console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~ file: errorHandlerUtils.js:14 ~ result:🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀", result)
    let msg = JSON.parse(result.array()[0]["msg"]);
    let errStatusCode = msg["statusCode"] || statusCode.BAD_REQUEST;
    return res.status(errStatusCode).send(getBadRequestMsg(msg["errMsg"]))
}