"use strict";
//importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");
//importa las categorias
const ROLES = require("../constants/roles.constants");

//Crea el esquema de la coleccion 'categorias'
const categoriaSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        },
    },
    {
        versionKey: false,
    },
)

//Crea el modelo de datos 'Categoria' a partir del esquema 'categoriaSchema'
const Categoria = mongoose.model("Categoria", categoriaSchema);

//Exporta el modelo de datos 'Categoria'
module.exports = Categoria;