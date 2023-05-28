const express = require('express');
const { createItemRule } = require('../../../validator/Admin/itemValidator/itemValidationRule');
const { createItem } = require('../../../controllers/Admin/item/itemController');
const { isAuthenticated } = require('../../../middlewares/is-auth');
const { isAdminAccess } = require('../../../middlewares/is-admin');

const router = express.Router();


router.post("/createItem",isAuthenticated,isAdminAccess,createItemRule,createItem)


module.exports = router;