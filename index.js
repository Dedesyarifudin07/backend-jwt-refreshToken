const express = require('express');
const app = express();
require('dotenv').config();
const akunControolers =require('./Route/akunControollers');
const cookieParser = require('cookie-parser');
app.use(express.urlencoded({extended:true}));
app.use(express.json())

//membuat endpoint
app.get('/',(req,res) => {
    res.send("hallo");
})

app.use(cookieParser());
app.use('/akun',akunControolers);

//connect ke database
require('./utils/db');

app.listen(process.env.PORT,() => {
    console.log(`port ini berjalan di || http://localhost:${process.env.PORT}`);
});