"use strict";
//importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");


//Buscar forma de guardar imagenes en la base de datos
const formularioSchema = new mongoose.Schema(
    {
    //Enlazamos el formulario con la categoria
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categoria",
        required: true,
    },
    estado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Estado",
        default: "6536f6275233b5fe498b531f", //Estado por defecto: Pendiente
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now,
        required: true,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    email: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    observaciones: {//Solo es requerido por el Usuario Validador
        type: String,
        required: false,
    },
    //Cambiar tipo o buscar como enviar imagenes a la base de datos
    //https://stackoverflow.com/questions/31592726/how-to-store-images-in-mongodb-with-node-js-express
    Residencia: {
        type: String,
        required: false
    },
    Constitucion: {
        type: String,
        required: false,
    },
    Carnet: {
        type: String,
        required: false,
    },
    Propiedad: {
        type: String,
        required: false,
    }
    },
    {
        //Evita que se cree un campo __v en la base de datos
        versionKey: false,
    },
)

//Crea el modelo de datos 'Formulario' a partir del esquema 'formularioSchema'
const Formulario = mongoose.model("Formulario", formularioSchema);

//Exporta el modelo de datos 'Formulario'
module.exports = Formulario;
