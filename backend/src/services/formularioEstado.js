//Importamos el modelo de formulario
const Formulario = require("../models/formulario.model.js");
//Importamos el modelo de categoria
const Categoria = require("../models/categoria.model.js");
//Importamos el modelo de estado
const Estado = require("../models/estado.model.js");
//Importamos el modelo de usuario
const Usuario = require("../models/user.model.js");
const { handleError } = require("../utils/errorHandler");

// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

//Obtener todos los formularios por id
exports.obtenerFormulario = async (req, res) => {
    try {
        //Obtiene el id del formulario
        const id = req.params.id;
        //Obtiene el formulario
        const formulario = await Formulario.findById(id);
        //Envia el formulario
        res.json(formulario);
    } catch (error) {
        handleError(res, error.message);
    }
};

//is validator para actualizar el estado del formulario
exports.actualizarEstado = async (req, res) => {
    try {
        //Obtiene el id del formulario
        const id = req.params.id;
        //Obtiene el estado del formulario
        const estado = req.body.estado;
        //Obtiene el formulario
        const formulario = await Formulario.findById(id);
        //Obtiene el estado
        const estadoFormulario = await Estado.findOne({ nombre: estado });
        //Actualiza el estado del formulario
        formulario.estado = estadoFormulario.nombre;
        //Guarda el formulario
        await formulario.save();
        //Envia el formulario
        res.json(formulario);
    } catch (error) {
        handleError(res, error.message);
    }
};

//is validator para dejar un comentario por el cambio de estado del formulario
exports.comentarEstado = async (req, res) => {
    try {
        //Obtiene el id del formulario
        const id = req.params.id;
        //Obtiene el comentario del formulario
        const comentario = req.body.comentario;
        //Obtiene el formulario
        const formulario = await Formulario.findById(id);
        //Actualiza el comentario del formulario
        formulario.comentario = comentario;
        //Guarda el formulario
        await formulario.save();
        //Envia el formulario
        res.json(formulario);
    } catch (error) {
        handleError(res, error.message);
    }
};
