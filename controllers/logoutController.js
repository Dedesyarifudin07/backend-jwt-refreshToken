const akun = require('../models/akun');

const logutController = async (req,res) => {
    refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status(204)

    const user = await akun.find({refreshToken:refreshToken})

    if(user == null){
        return res.status(204)
    }

    await akun.update(
        {refreshToken : null}, 
        {_id : user._id}
        )
    
    res.clearCookie('refreshToken');
    return res.status(200).json(
        {
            msg:'berhasil logout'
        }
    )
        

}

module.exports = logutController;