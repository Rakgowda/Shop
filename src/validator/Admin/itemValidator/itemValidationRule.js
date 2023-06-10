const {check,body} = require("express-validator");
const { throwNewError, errorMsg } = require("../../../utils/errorHandlerUtils");
const { statusCode } = require("../../../utils/statusCodeUtil");
const { isEmpty, getUserFromToken, isValidObjectId } = require("../../../utils/dataUtils");
const itemSchema = require("../../../models/Admin/Item/itemSchema");
const { ObjectId } = require('mongoose').Types;

exports.createItemRule = [
    body("itemName").custom(async(value,{res}) => {
        console.log("🚀 ~ file: itemValidationRule.js:10 ~ body ~ value:", value)
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
        console.log("🚀 ~ file: itemValidationRule.js:24 ~ body ~ value:", value)
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

exports.updateItemRule = [
    body("itemName").custom(async(value,{req})=>{
        if(isEmpty(value)){
            throwNewError("Item field shouldn't be empty");
        }
        const item = await itemSchema.findOne({"itemName":value});
        if(item && item._id != req.body.id)
        {
            throwNewError("Item name should be unique.");
        }
        return true;
    }),
    body("price").isNumeric().withMessage(errorMsg("Price field should be numeric")).custom(async(value,{res})=>{
        if(value <= 0)
        {
            throwNewError("Price field should be greater then 0.")
        }
        return true;
    }),
    body("quantity").isNumeric().withMessage(errorMsg("Quantity field should be numeric")).custom(async(value,{res})=>{
        if(value <= 0)
        {
            throwNewError("Quantity field should be greater then 0.")
        }
        return true;
    }),
    body("id").custom(async(value,{req})=>{
        if(isEmpty(value)){
            throwNewError("Id shouldn't be empty.");
        }
        if(!isValidObjectId(value))
        {
            throwNewError("Invalid ObjectId");
        }
        const item =  await itemSchema.findById(value);
        if(!item)
        {
            throwNewError("Item doesn't exsits.");
        }
        req.item = item;
        return true;
    })
]

exports.getItemByIdRule = [
    check("id").custom(async(value,{req})=>{
        if(isEmpty(value)){
            throwNewError("Id shouldn't be empty");
        }
        if(!isValidObjectId(value))
        {
            throwNewError("Invalid ObjectId");
        }
        const item =  await itemSchema.findById(value);
        if(!item)
        {
            throwNewError("Item doesn't exsits.");
        }
        return true;
    })
]