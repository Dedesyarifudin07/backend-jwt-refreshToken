const akun = require('../models/akun');
const jwt  = require('jsonwebtoken');


const refreshToken = async(req,res) => {
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401);
        const dbAKun = await akun.find({refreshToken:refreshToken});
        if(!dbAKun) return res.status(403);
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN , (err,decode) =>{
            if(err) return res.status(403);
            const accesToken = jwt.sign({_id:dbAKun._id,name:dbAKun.name, email:dbAKun.email},process.env.SECRET_KEY,
                {
                    expiresIn:'20s'
                }
            )
            //tampilkan akun berdasarkan name,email,dan password
            return res.json({accesToken,_id:dbAKun._id ,email:decode.email});
           })
    }catch(error){
        res.status(404).json({msg:error})
    }
}

module.exports = refreshToken;