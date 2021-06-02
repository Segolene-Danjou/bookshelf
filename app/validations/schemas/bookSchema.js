const Joi = require('joi');

const insertSchema = Joi.object({
    reference: Joi.string().required().min(2),
    title: Joi.string().required().min(2),
    locale: Joi.string().required().length(5),
    year: Joi.number().min(4),
    page_count: Joi.number().required().min(1),
    chapter_count: Joi.number().required().min(1),
    front_cover: Joi.string().required().min(5),
    cover: Joi.string().required().min(2),
    publisher_id: Joi.number().required().min(2),
}).required();

const updateSchema = Joi.object({
    reference: Joi.string().min(2),
    title: Joi.string().min(2),
    locale: Joi.string().length(5),
    year: Joi.number().min(4),
    page_count: Joi.number().min(1),
    chapter_count: Joi.number().min(1),
    front_cover: Joi.string().min(5),
    cover: Joi.string().min(2),
    publisher_id: Joi.number().min(2),
}).required();
console.log("bookschema");
module.exports = { insertSchema, updateSchema };