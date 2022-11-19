const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader){
        return res.status(404).json({msg:'token not found'});
    }
    try {
       const verifie =  jwt.verify(authHeader,process.env.SECRET_KEY)
        req.akun = verifie;
        next();
    } catch (error) {
        return res.status(403).json({error:error,msg:'acces denied' })
    }
    
    }
   
module.exports = verifyToken;