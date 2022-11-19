const akun = require('../models/akun');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async  (req,res) => {
    //destructuring variable
    const {name,email,password} = req.body;
    try {
        //cari akun berdasarkan email dan password
        const cekAKun = await akun.findOne({name,email});
        if(!cekAKun){
            return res.json({msg:'name or email tidak ada',status:404})
        }
    
        //compare password
        const validPw = bcrypt.compare(password,cekAKun.password)  ;
        if(!validPw){
            return res.json({
                status:404,
                msg:'password SALAH'
            })
        }
        //berikan token
        const token = jwt.sign({_id:cekAKun._id,name:cekAKun.name,email:cekAKun.email},process.env.SECRET_KEY,
            {
                expiresIn:'40s'
            });
            //refrsh token
        const refreshToken = jwt.sign({_id:cekAKun._id,name:cekAKun.name,email:cekAKun.email},process.env.REFRESH_TOKEN,{
            expiresIn:'1d'
        })
        
        //update isi refreh token yang ada di database dengan secret refresh token
        await akun.updateOne({_id:cekAKun._id},{
            refreshToken:refreshToken
        })
        
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            maxAge:24*60*60*1000
        })
        res.json({token})
    } catch (error) {
        return res.json({msg:'email atau password tidak ditemukan',status:404})
    }


}

module.exports = login;