"user strict";

//Importar Joi y Joi.objectId
const Joi = require("joi");
//Importamos las categorias y los estados
const CATEGORIA = require("../constants/categoria.constants");
const ESTADO = require("../constants/estado.constants");

//REVISAR SI LAS VALIDACIONES SON CORRECTAS
//URGENTE
/**
 * Esquema de validación para el formulario
 */

const formularioBodySchema = Joi.object({
    categoria: Joi.array().items(Joi.string().valid(...CATEGORIA)).required().messages({
        "array.base": "La categoria debe ser de tipo array.",
        "any.required": "La categoria es obligatoria.",
        "string.base": "La categoria debe ser de tipo string.",
        "any.only": "La categoria proporcionada no es válida.",
    }),
    estado: Joi.array().items(Joi.string().valid(...ESTADO)).required().messages({
        "array.base": "El estado debe ser de tipo array.",
        "any.required": "El estado es obligatorio.",
        "string.base": "El estado debe ser de tipo string.",
        "any.only": "El estado proporcionado no es válido.",
    }),
    fecha: Joi.date().required().messages({
        "string.empty": "La fecha no puede estar vacía.",
        "any.required": "La fecha es obligatoria.",
        "string.base": "La fecha debe ser de tipo string.",
    }),
    usuario: Joi.string().required().messages({
        "string.empty": "El usuario no puede estar vacío.",
        "any.required": "El usuario es obligatorio.",
        "string.base": "El usuario debe ser de tipo string.",
    }),
    observaciones: Joi.string().required().messages({
        "string.empty": "Las observaciones no pueden estar vacías.",
        "any.required": "Las observaciones son obligatorias.",
        "string.base": "Las observaciones deben ser de tipo string.",
    }),
    Cert_Residencia: Joi.string().required().messages({
        "string.empty": "El certificado de residencia no puede estar vacío.",
        "any.required": "El certificado de residencia es obligatorio.",
        "string.base": "El certificado de residencia debe ser de tipo string.",
    }),
    Cert_Consitucion: Joi.string().required().messages({
        "string.empty": "El certificado de constitución no puede estar vacío.",
        "any.required": "El certificado de constitución es obligatorio.",
        "string.base": "El certificado de constitución debe ser de tipo string.",
    }),
    Carnet: Joi.string().required().messages({
        "string.empty": "El carnet no puede estar vacío.",
        "any.required": "El carnet es obligatorio.",
        "string.base": "El carnet debe ser de tipo string.",
    }),
    Cert_Propiedad: Joi.string().required().messages({
        "string.empty": "El certificado de propiedad no puede estar vacío.",
        "any.required": "El certificado de propiedad es obligatorio.",
        "string.base": "El certificado de propiedad debe ser de tipo string.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de formulario.
 * @constant {Object}
 */

const formularioIdSchema = Joi.object({
    id: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
        .messages({
            "string.empty": "El id no puede estar vacío.",
            "any.required": "El id es obligatorio.",
            "string.base": "El id debe ser de tipo string.",
            "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
        }),
});

module.exports = { formularioBodySchema, formularioIdSchema };