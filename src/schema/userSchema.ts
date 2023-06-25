import Joi from 'joi';

export const signUpSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    cpf: Joi.string().length(11).required(),
});

export const signInSchema = Joi.object({
    cpf: Joi.string().length(11).required(),
    password: Joi.string().min(6).required(),
});