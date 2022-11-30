const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    //request header authorazation
    const authHeader = req.headers['authorization'];
    //bearer token
    const token = authHeader && authHeader.split(' ')[1];
    if (!token){
        return res.status(404).json({msg:'token not found'});
    }
    try {
       jwt.verify(token,process.env.SECRET_KEY, (err,decode)=> {
        if(err) return res.status(403);
        req.decode = decode.email;
        next();
       })
    } catch (error) {
        return res.status(403).json({error:error,msg:'acces denied' })
    }
    
    }
   
module.exports = verifyToken;