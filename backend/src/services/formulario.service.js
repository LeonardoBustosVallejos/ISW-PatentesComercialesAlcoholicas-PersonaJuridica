"user strict";

//Importamos el modelo de formulario
const Formulario = require("../models/formulario.model.js");
//Importamos el modelo de categoria
const Categoria = require("../models/categoria.model.js");
//Importamos el modelo de estado
const Estado = require("../models/estado.model.js");
const { handleError } = require("../utils/errorHandler");


//Crear CRUD para el formulario
//getFormularios
async function getFormularios() {
  try {
    const formularios = await Formulario.find()
      .exec();
    if (!formularios) return [null, "No hay formularios"];

    return [formularios, null];
  } catch (error) {
    handleError(error, "formulario.service -> getFormularios");
  }
}

//createFormulario
async function createFormulario(formulario) {
  try {
    const {categoria, estado, fecha, usuario, observaciones, Cert_Residencia, Cert_Constitucion, Carnet, Cert_Propiedad } = formulario;
    //Tenemos que ver que tenga una categoria existente
    const categoriaFound = await Categoria.findOne({ name: formulario.categoria });
    if (!categoriaFound) return [null, "La categoria no existe"];
    //Tenemos que ver que tenga un estado existente
    const estadoFound = await Estado.findOne({ name: formulario.estado });
    if (!estadoFound) return [null, "El estado no existe"];

    const newFormulario = new Formulario({
      categoria,
      estado,
      fecha,
      usuario,
      observaciones,
      Cert_Residencia,
      Cert_Constitucion,
      Carnet,
      Cert_Propiedad,
    });
    await newFormulario.save();

    return [newFormulario, null];
  } catch (error) {
    handleError(error, "formulario.service -> createFormulario");
  }
}

/**
* Obtiene un formulario por su id de la base de datos
* @param {string} Id del formulario
* @returns {Promise} Promesa con el objeto de formulario
*/

async function getFormularioById(id) {
    try {
        const formularios = await Formulario.findById({ _id: id })
    .exec();

  if (!formularios) return [null, "El formulario no existe"];

  return [formularios, null];
    }
    catch (error) {
        handleError(error, "formulario.service -> getFormularioById");
    }
}

/**
 * Actualiza un formulario por su id de la base de datos
 * @param {string} Id del formulario
 * @param {Object} formulario Objeto de formulario
 * @returns {Promise} Promesa con el objeto de formulario actualizado
 */

async function updateFormulario(id, formulario) {
    try {
        const formularioFound = await Formulario.findById(id);
        if (!formularioFound) return [null, "El formulario no existe"];

        //Atributos que vamos a actualizar: El estado y las observaciones
        const { estado, observaciones } = formulario;
        //Tenemos que ver que tenga un estado existente
        const estadoFound = await Estado.findOne({ name: formulario.estado });
        if (!estadoFound) return [null, "El estado no existe"];

        const newFormulario = new Formulario({
            estado,
            observaciones,
        });
        await newFormulario.save();

        return [newFormulario, null];
    } catch (error) {
        handleError(error, "formulario.service -> updateFormulario");
    }
}

/**
 * Elimina un formulario por su id de la base de datos
 * @param {string} Id del formulario
 * @returns {Promise} Promesa con el objeto de formulario eliminado
 */

async function deleteFormulario(id) {
    try {
        return await Formulario.findByIdAndDelete(id);
    } catch (error) {
        handleError(error, "user.service -> deleteUser");
    }
}

module.exports = {
    getFormularios,
    createFormulario,
    getFormularioById,
    updateFormulario,
    deleteFormulario,
};