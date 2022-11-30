const akun = require('../models/akun');

const getController = async (req,res) => {
    try {
        const getAkun = await akun.find({});
        res.json({getAkun})
    } catch (error) {
        return res.json({msg:'failed to get data user',error})
    }
}

module.exports = getController;