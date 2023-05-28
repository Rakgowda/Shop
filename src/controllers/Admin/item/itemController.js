const itemSchema = require("../../../models/Admin/Item/itemSchema");
const {validationResult } = require("express-validator");
const { statusCode, getOkMsg, getInternalServerMsg } = require("../../../utils/statusCodeUtil");
const { validationErroResponse } = require("../../../utils/errorHandlerUtils");

exports.createItem = (req,res,next)=>{

    const {itemName,price,quantity} = req.body;
    const result = validationResult(req);
    if(!result.isEmpty())
    {
        console.log(result);
        return validationErroResponse(result,res);
    }

    const item = new itemSchema({itemName,price,quantity});
    item.date = Date.now();
    item.createdBy = req.accesInfo.user.username;
    // item.quantity = quantity;
    try {
        const saveItem = item.save();
        if(saveItem)
        {
            res.status(statusCode.OK).send(getOkMsg("Item save successfully."));
        }
    } catch (error) {
        console.error('Error while hashing password:', error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(getInternalServerMsg('Internal server error.'))
    }


}