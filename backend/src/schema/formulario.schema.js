"user strict";

//Importar Joi y Joi.objectId
const Joi = require("joi");
//Importamos las categorias y los estados
const CATEGORIA = require("../constants/categoria.constants");
const ESTADO = require("../constants/estado.constants");

//REVISAR SI LAS VALIDACIONES SON CORRECTAS
//URGENTE

const formularioBodySchema = Joi.object({
    categoria: Joi.string().required().valid(...Object.values(CATEGORIA)).messages({
        "string.empty": "La categoria no puede estar vacía.",
        "any.required": "La categoria es obligatoria.",
        "string.base": "La categoria debe ser de tipo string.",

    }),
    usuario: Joi.string().required().messages({//nombre de la persona que solicita el formulario
        "string.empty": "El usuario no puede estar vacío.",
        "any.required": "El usuario es obligatorio.",
        "string.base": "El usuario debe ser de tipo string.",
    }),
    email: Joi.string().required().email().messages({
        "string.empty": "El email no puede estar vacío.",
        "any.required": "El email es obligatorio.",
        "string.base": "El email debe ser de tipo string.",
        "string.email": "El email proporcionado no es válido.",
    }),
    //de Residencia hacia abajo son los documentos que se deben adjuntar
    //Cambiar tipo o buscar como enviar imagenes a la base de datos
    //puede estar sujetos a cambios
    Residencia: Joi.string().messages({
        "string.empty": "El certificado de residencia no puede estar vacío.",
        "any.required": "El certificado de residencia es obligatorio.",
        "string.base": "El certificado de residencia debe ser de tipo string.",
    }),
    Constitucion: Joi.string().messages({
        "string.empty": "El certificado de constitucion no puede estar vacío.",
        "any.required": "El certificado de constitucion es obligatorio.",
        "string.base": "El certificado de constitucion debe ser de tipo string.",
    }),
    Carnet: Joi.string().messages({
        "string.empty": "El carnet no puede estar vacío.",
        "any.required": "El carnet es obligatorio.",
        "string.base": "El carnet debe ser de tipo string.",
    }),
    Propiedad: Joi.string().messages({
        "string.empty": "El certificado de propiedad no puede estar vacío.",
        "any.required": "El certificado de propiedad es obligatorio.",
        "string.base": "El certificado de propiedad debe ser de tipo string.",
    }),
    extrafield: Joi.string().messages({
        "string.empty": "El certificado de Autoridad Sanitaria no puede estar vacío.",
        "any.required": "El certificado de Autoridad Sanitaria es obligatorio.",
        "string.base": "El certificado de Autoridad Sanitaria debe ser de tipo string.",
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

const formularioEmailSchema = Joi.object({
    email: Joi.string().required().messages({
        "string.empty": "El email no puede estar vacío.",
        "any.required": "El email es obligatorio.",
        "string.base": "El email debe ser de tipo string.",
        "string.email": "El email proporcionado no es válido.",
    }),
});

const formularioUpdateSchema = Joi.object({
    estado: Joi.string().required().valid(...Object.values(ESTADO)).messages({
        "string.empty": "El estado no puede estar vacío.",
        "any.required": "El estado es obligatorio.",
        "string.base": "El estado debe ser de tipo string.",
        "string.valid": "El estado proporcionado no es válido.",
    }),
    observaciones: Joi.string().messages({
        "string.empty": "Las observaciones no pueden estar vacías.",
        "any.required": "Las observaciones son obligatorias.",
        "string.base": "Las observaciones deben ser de tipo string.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});


module.exports = { formularioBodySchema, formularioIdSchema, formularioEmailSchema, formularioUpdateSchema };