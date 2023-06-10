const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemName : {
        type : String,
        required : true
    },
    price :{
        type : Number,
        required : true,
        min:1
    },
    quantity :{
        type : Number,
        required : false,
        min:0
    },
    date :{
        type:Date,
        required : true
    },
    createdBy :{
        type:String,
        require:true
    },
    updatedBy :{
        type:String,
        require:false
    }

})

module.exports = mongoose.model('Item',itemSchema);