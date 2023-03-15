const Joi = require('@hapi/joi')

const smoothieSchema = Joi.object({
    name: Joi.string().uppercase().required(),
    image: Joi.string().required(),
    alt: Joi.string().uppercase().required(),
    price: Joi.number().required(),
    calories: Joi.number().integer().required(),
    ingredients: Joi.string().lowercase().required(),
    quantity: Joi.number().integer().required()
})

module.exports = {
    smoothieSchema
}