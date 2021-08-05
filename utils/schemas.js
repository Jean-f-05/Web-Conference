const Joi = require('joi');

module.exports.atendeeSchema =   

    Joi.object({
    name:Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
});

module.exports.messageSchema = 
    Joi.object({
        username:Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        phone: Joi.number().required(),
        message: Joi.string().required()
    });


    module.exports.speakerSchema = 
    Joi.object({

        name: Joi.string()
        .min(3)
        .max(30)
        .required(),

        job: Joi.string()
        .min(3)
        .max(30)
        .required(),
        
        socialNetworks: 
            Joi.object({
                twitter: Joi.string().allow(null, ''),
                facebook:Joi.string().allow(null, ''),
                linkedin:Joi.string().allow(null, '')
            }),
        
        details:Joi.string()
        .min(3)
        .max(60)
        .required(), 
    });