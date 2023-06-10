const express = require('express');
const { createItemRule, updateItemRule, getItemByIdRule} = require('../../../validator/Admin/itemValidator/itemValidationRule');
const { createItem, updateItem, getAllItem, getItemById } = require('../../../controllers/Admin/item/itemController');
const { isAuthenticated } = require('../../../middlewares/is-auth');
const { isAdminAccess } = require('../../../middlewares/is-admin');

const router = express.Router();


router.post("/createItem",isAuthenticated,isAdminAccess,createItemRule,createItem);
router.post("/updateItem",isAuthenticated,isAdminAccess,updateItemRule,updateItem);
router.get("/getAllItem",isAuthenticated,isAdminAccess,getAllItem);
router.get("/getItemById/:id",isAuthenticated,isAdminAccess,getItemByIdRule,getItemById);
router.delete("/deleteItemById/:id",isAuthenticated,isAdminAccess,getItemByIdRule,getItemById);

module.exports = router;