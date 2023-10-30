"use strict";

const { date } = require("joi");
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
        required: true,
    },
    fecha: {
        type: Date,
        defaul: Date.now,
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
    observaciones: {
        type: String,
        required: true,
    },
    Residencia: {
        type: String,
        required: true,
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
