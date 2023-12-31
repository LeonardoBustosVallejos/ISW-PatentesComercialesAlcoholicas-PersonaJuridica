"use strict";
// Importa el modelo de datos 'Role'
const Role = require("../models/role.model.js");
const User = require("../models/user.model.js");
const Categoria = require("../models/categoria.model.js");
const Estado = require("../models/estado.model.js");

/**
 * Crea los roles por defecto en la base de datos.
 * @async
 * @function createRoles
 * @returns {Promise<void>}
 */
async function createRoles() {
  try {
    // Busca todos los roles en la base de datos
    const count = await Role.estimatedDocumentCount();
    // Si no hay roles en la base de datos los crea
    if (count > 0) return;

    await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "admin" }).save(),
      //Nuevo Rol (Tambien hay que añadirlo en el archivo constants/roles.constants.js)
      new Role({ name: "validator" }).save(),
    ]);
    console.log("* => Roles creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

async function createCategories() {
  try {
    // Busca todos los roles en la base de datos
    const count = await Categoria.estimatedDocumentCount();
    // Si no hay roles en la base de datos los crea
    if (count > 0) return;

    await Promise.all([
      new Categoria({ nombre: "Comercial" }).save(),
      new Categoria({ nombre: "De Alcoholes" }).save(),
    ]);
    console.log("* => Roles creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

async function createEstados() {
  try {
    // Busca todos los roles en la base de datos
    const count = await Estado.estimatedDocumentCount();
    // Si no hay roles en la base de datos los crea
    if (count > 0) return;

    await Promise.all([
      new Estado({ nombre: "Pendiente" }).save(),
      new Estado({ nombre: "Aprobado" }).save(),
      new Estado({ nombre: "Rechazado" }).save(),
      new Estado({ nombre: "En Revision" }).save(),
    ]);
    console.log("* => Categorias creadas exitosamente");
  } catch (error) {
    console.error(error);
  }
}

/**
 * Crea los usuarios por defecto en la base de datos.
 * @async
 * @function createUsers
 * @returns {Promise<void>}
 */
async function createUsers() {
  try {
    const count = await User.estimatedDocumentCount();
    if (count > 0) return;

    // Busca los roles 'admin' y 'user' en la base de datos
    const admin = await Role.findOne({ name: "admin" });
    const user = await Role.findOne({ name: "user" });

    // Si no encuentra los roles 'admin' y 'user' en la base de datos
    await Promise.all([
      // Crea los usuarios 'admin' y 'user' en la base de datos
      new User({
        username: "user",
        email: "user@email.com",
        password: await User.encryptPassword("user123"),
        roles: user._id,
      }).save(),
      new User({
        username: "admin",
        email: "admin@email.com",
        password: await User.encryptPassword("admin123"),
        roles: admin._id,
      }).save(),
    ]);
    console.log("* => Users creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createRoles,
  createUsers,
  createCategories,
  createEstados,
};
