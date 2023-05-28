// Informational responses (100 – 199)
// Successful responses (200 – 299)
// Redirection messages (300 – 399)
// Client error responses (400 – 499)
// Server error responses (500 – 599)

exports.statusCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT:409,
    UNPROCESSABLE_CONTENT : 422,
    INTERNAL_SERVER_ERROR: 500
    };

exports.getBadRequestMsg =(errorMsg)=> {
    return {errorMsg: errorMsg}
}

exports.getInternalServerMsg = (errorMsg)=>{
    return {errorMsg: errorMsg}
}

exports.getNotFoundMsg = (errorMsg)=>{
    return {errorMsg: errorMsg}
}

exports.getOkMsg = (successMsg)=>{
    return {successMsg:successMsg}
}

exports.getUnauthorizedMsg = (errorMsg)=>{
    return {errorMsg: errorMsg}
}