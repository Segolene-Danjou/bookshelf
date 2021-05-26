const Joi = require('joi');

const insertGenre = Joi.object({
    genre: Joi.string().required().min(2)
}).required();

const updateGenre = Joi.object({
    genre: Joi.string().min(2)
}).required();

module.exports = { insertGenre, updateGenre };