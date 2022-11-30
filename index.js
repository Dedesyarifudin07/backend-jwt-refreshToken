const express = require('express');
const app = express();
const akunControolers =require('./Route/akunControollers');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

//membuat endpoint
app.get('/',(req,res) => {
    res.send("hallo");
})
app.use(cors({  credentials: true ,origin:'http://localhost:5173'}));
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cookieParser());
app.use('/akun',akunControolers);

//connect ke database
require('./utils/db');

app.listen(process.env.PORT,() => {
    console.log(`port ini berjalan di || http://localhost:${process.env.PORT}`);
});