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
    Cert_Residencia: {
        type: String,
        required: true,
    },
    Cert_Consitucion: {
        type: String,
        required: true,
    },
    Carnet: {
        type: String,
        required: true,
    },
    Cert_Propiedad: {
        type: String,
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
