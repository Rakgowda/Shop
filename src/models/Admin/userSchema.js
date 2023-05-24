const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    confirmedpassword :{
        type : String,
        required : false
    },
    email :{
        type:String,
        required : false
    },
    resetToken : String,
    resetTokenExpiration : Date || null,
})

module.exports = mongoose.model('User',userSchema);