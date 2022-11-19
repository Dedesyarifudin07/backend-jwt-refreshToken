const joi = require('joi');

const registerValidation = (data) => {
    const schema = joi.object(
    {
        name:joi.string()
            .required().min(7),
        email:joi.string()
        .email().required(),
        password:joi.string()
        .min(7)
        .required()
    })
    return schema.validate(data);
}


module.exports = registerValidation;
