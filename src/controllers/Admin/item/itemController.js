const itemSchema = require("../../../models/Admin/Item/itemSchema");
const {validationResult } = require("express-validator");
const { statusCode, getOkMsg, getInternalServerMsg } = require("../../../utils/statusCodeUtil");
const { validationErroResponse } = require("../../../utils/errorHandlerUtils");
const { getUserName } = require("../../../utils/dataUtils");

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
    item.createdBy = getUserName(req);
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

exports.updateItem = async (req,res,next)=>{

    const {itemName,price,quantity,id} = req.body;
    const result = validationResult(req);
    if(!result.isEmpty())
    {
        console.log(result);
        return validationErroResponse(result,res);
    }
    try {
        const username = getUserName(req);
        const item = await itemSchema.findByIdAndUpdate(id,{itemName,price,quantity,updatedBy:username});
        if(item)
        {
            res.status(statusCode.OK).send(getOkMsg("Item updated successfully."));
        }
    } catch (error) {
        console.error('Error while hashing password:', error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(getInternalServerMsg('Internal server error.'))
    }


}

exports.getAllItem = async (req,res,next)=>{

    const result = validationResult(req);
    if(!result.isEmpty())
    {
        console.log(result);
        return validationErroResponse(result,res);
    }
    try {
        const item = await itemSchema.find({});
        if(item)
        {
            res.status(statusCode.OK).send(item);
        }
    } catch (error) {
        console.error('Error while hashing password:', error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(getInternalServerMsg('Internal server error.'))
    }


}

exports.getItemById = async (req,res,next)=>{

    const result = validationResult(req);
    if(!result.isEmpty())
    {
        console.log(result);
        return validationErroResponse(result,res);
    }
    try {
        const id = req.params.id;
        const item = await itemSchema.findById(id)
        if(item)
        {
            res.status(statusCode.OK).send(item);
        }
    } catch (error) {
        console.error('Error while hashing password:', error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(getInternalServerMsg('Internal server error.'))
    }

}

exports.getItemById = async (req,res,next)=>{

    const result = validationResult(req);
    if(!result.isEmpty())
    {
        console.log(result);
        return validationErroResponse(result,res);
    }
    try {
        const id = req.params.id;
        const item = await itemSchema.findByIdAndDelete(id)
        if(item)
        {
            res.status(statusCode.OK).send("Item deleted successfully");
        }
    } catch (error) {
        console.error('Error while hashing password:', error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(getInternalServerMsg('Internal server error.'))
    }

}