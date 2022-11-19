const validate = require('../config/validation');
const akun = require('../models/akun');
const bcrypt = require('bcrypt');


const registerController = async (req,res) => {
    //destructuring variable
    const {name,email,password} = req.body;

    //validate
    const {error} = validate(req.body);
    if(error){
      return  res.json(error.message);
    }

    //cek email
    const exist = await akun.findOne({email});
    if(exist){
        return res.json({msg:'email sudah ada',status:401})
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
    res.json(newAkun1);
} catch (error) {
    return res.json({msg:'gagal membuat akun',error})
}
}

module.exports = registerController;