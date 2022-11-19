const mongoose = require('mongoose');

const akun = mongoose.model('Akun',
{
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String
    },
    createAt:{
        type:Date,
        createAT:new Date().getDate()
    }
})

module.exports = akun;