"user strict";

//Importar Joi y Joi.objectId
const Joi = require("joi");

//REVISAR SI LAS VALIDACIONES SON CORRECTAS
//URGENTE
/**
 * Esquema de validación para el formulario
 */

const formularioBodySchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio.",
        "string.base": "El nombre debe ser de tipo string.",
    }),
    categoria: Joi.string().required().messages({
        "string.empty": "La categoria no puede estar vacía.",
        "any.required": "La categoria es obligatoria.",
        "string.base": "La categoria debe ser de tipo string.",
    }),
    estado: Joi.string().required().messages({
        "string.empty": "El estado no puede estar vacío.",
        "any.required": "El estado es obligatorio.",
        "string.base": "El estado debe ser de tipo string.",
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