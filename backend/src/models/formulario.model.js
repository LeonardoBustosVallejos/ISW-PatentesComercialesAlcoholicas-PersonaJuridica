"use strict";
//importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");
const {ESTADO} = require("../constants/estado.constants")
const Estado = require("./estado.model");


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
        type: String,
        ref: "Estado",
        default: "Pendiente", //Estado por defecto: Pendiente
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

    Residencia: {
        type: String,
        required: true
    },
    Constitucion: {
        type: String,
        required: true,
    },
    Carnet: {
        type: String,
        required: true,
    },
    Propiedad: {
        type: String,
        required: true,
    },//requerido SOLO para cuando es "De Alcoholes"
    extrafield: {
        type: String,
        required: false
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
