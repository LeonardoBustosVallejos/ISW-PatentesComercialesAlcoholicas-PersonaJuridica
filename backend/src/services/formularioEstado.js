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


//Obtener todos los formularios
async function getFormularios() {
    try {
      const formularios = await Formulario.find().populate("categoria").populate("estado")
      .populate({path:"usuario",select:"username"})
      .populate({path:"email",select:"email"})
      .exec();
      if (!formularios) return [null, "No hay formularios"];
  
      return [formularios, null];
    } catch (error) {
      handleError(error, "formulario.service -> getFormularios");
    }
  }



