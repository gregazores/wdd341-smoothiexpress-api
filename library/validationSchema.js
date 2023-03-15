const Joi = require('@hapi/joi')

const smoothieSchema = Joi.object({
    name: Joi.string().uppercase(),
    image: Joi.string(),
    alt: Joi.string().uppercase(),
    price: Joi.number(),
    calories: Joi.number().integer(),
    ingredients: Joi.string().lowercase(),
    quantity: Joi.number().integer()
})

module.exports = {
    smoothieSchema
}