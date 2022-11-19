const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology :true,
})

let db = mongoose.connection;

db.on('error',console.error.bind(console,'connect to database failed'));
db.once('open',() => {
    console.log('database connect');
});

// const akun = require('../models/akun');

// const akun1 = new akun({
//     name:"dede syarifudin",
//     email:"dasdasd@asdasd.com",
//     password:"adadasdasd"
// })

// akun1.save().then((akun) => console.log(akun));
// console.log(akun)