"use strict";
//importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");
//importa los estados
const ESTADO = require("../constants/estado.constants.js");

//Crea el esquema de la coleccion 'estado'
const estadoSchema = new mongoose.Schema(
    {
        //Nombre de los estados
        nombre: {
            type: String,
            enum: Object.values(ESTADO),
            required: true,
        },
    },
    {
        //Evita que se cree un campo __v en la base de datos
        versionKey: false,
    },
);

//Crea el modelo de datos 'Estado' a partir del esquema 'EstadoSchema'
const Estado = mongoose.model("Estado", estadoSchema);

//Exporta el modelo de datos 'Estado'
module.exports = Estado;