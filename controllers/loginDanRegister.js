
const akun = require('../models/akun');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const validate = require('../config/validation');

const register = async (req,res) => {
    //destructuring variable
    const {name,email,password} = req.body;

    //validate
    const {error} = validate(req.body);
    if(error){
      return  res.json(error.message);
    }

    //cek email
    const exist = await akun.findOne({name,email});
    if(exist){
        return res.json({msg:'email or password sudah ada',status:401})
    }
    //hash password 
    const hash = bcrypt.hashSync(password, 10);
  const newAkun = new akun(
    {
        name,
        email,
        password:hash,
        createAt: new Date().getDate()
    }
  )
  //save 
try {
    const newAkun1 = await newAkun.save()
    res.json({newAkun1,msg:"akun berhasil dibuat"});
} catch (error) {
    return res.json({msg:'gagal membuat akun',error})
}}


const login = async (req,res) => {
    //destructuring variable
    const {name,email,password} = req.body;
    try {
        //cari akun berdasarkan email dan password
        const cekAKun = await akun.findOne({email});
        if(!cekAKun){
            return res.json({msg:'email tidak terdaftar',status:404})
        }
    
        //compare password
        const validPw = await bcrypt.compare(password,cekAKun.password);
        if(!validPw){
            return res.json({
                status:404,
                msgPwd:'password SALAH'
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
            sameSite:true,
            maxAge:24*60*60*1000
        }).json({token ,refreshToken, succes:"login succes"})
    } catch (error) {
        return res.status(404).json({msg:'email atau password tidak ditemukan',status:404, error:error})
    }


}

const refreshToken =  async(req,res) => {
    try{
        //parsing cookie
        const refreshToken = req.cookies.refreshToken;
        //cek cookie
        if(!refreshToken) return res.status(401);
        //cari cookie berdasarkan dengan ada yang di database
        const dbAKun = await akun.findOne({refreshToken:refreshToken});
        //cek
        if(!dbAKun) return res.status(403);
        //verifi
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN , (err,decode) =>{
            if(err) return res.status(403);
            const accesToken = jwt.sign({_id:dbAKun._id,name:dbAKun.name, email:dbAKun.email},process.env.SECRET_KEY,
                {
                    expiresIn:'20s'
                }
            )
            //tampilkan akun berdasarkan name,email,dan password
            return res.status(200).json({accesToken,_id:dbAKun._id ,email:decode.email});
           })
    }catch(error){
        res.status(404).json({msg:error})
    }
} 

module.exports ={login,register,refreshToken};