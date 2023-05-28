const {check,body} = require("express-validator");
const { throwNewError, errorMsg } = require("../../../utils/errorHandlerUtils");
const { statusCode } = require("../../../utils/statusCodeUtil");
const { isEmpty, getUserFromToken } = require("../../../utils/dataUtils");
const itemSchema = require("../../../models/Admin/Item/itemSchema");


exports.createItemRule = [
    body("itemName").custom(async(value,{res})=>{
        if(isEmpty(value)){
            throwNewError("Item field shouldn't be empty");
        }
        const itemResult = await itemSchema.findOne({"itemName":value})
        if(itemResult)
        {
            throwNewError("Item name already exists");
        }
        return true;
    }),
    body("price").isNumeric().withMessage(errorMsg("Price field should be numaric")).custom(async(value,{res})=>{
        console.log(value);
        if(value <= 0)
        {
            throwNewError("Price field should be greater then 0.")
        }
        return true;
    }),
    body("quantity").isNumeric().withMessage(errorMsg("Quantity field should be numaric")).custom(async(value,{res})=>{
        if(value <= 0)
        {
            throwNewError("Quantity field should be greater then 0.")
        }
        return true;
    })
]