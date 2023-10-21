"use strict";

const mongoose = require("mongoose");


//Buscar forma de guardar imagenes en la base de datos
const formularioSchema = new mongoose.Schema(
    {
    name: {
        type:   String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    usuario: {
        type: String,
        required: true,
    },
    observaciones: {
        type: String,
        required: true,
    },
    //Cambiar tipo o buscar como enviar imagenes a la base de datos
    //https://stackoverflow.com/questions/31592726/how-to-store-images-in-mongodb-with-node-js-express
    //Buffer es un tipo de dato que almacena datos binarios
    Cert_Residencia: {
        type: Buffer,
        required: true,
    },
    Cert_Consitucion: {
        type: Buffer,
        required: true,
    },
    Carnet: {
        type: Buffer,
        required: true,
    },
    Cert_Propiedad: {
        type: Buffer,
        required: true,
    },
    },
    {
        //Evita que se cree un campo __v en la base de datos
        versionKey: false,
    },
    )

const Formulario = mongoose.model("Formulario", formularioSchema);

module.exports = Formulario;
