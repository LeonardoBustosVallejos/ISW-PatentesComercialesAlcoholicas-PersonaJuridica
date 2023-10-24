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
    const {categoria, estado, fecha, usuario, email, observaciones, Residencia, Constitucion, Carnet, Propiedad } = formulario;

    //Tenemos que ver que tenga una categoria existente
    const categoriaFound = await Categoria.find({ nombre: {$in: categoria} });
    if (categoriaFound.length === 0) return [null, "La categoria no existe"];
    const myCategoria = categoriaFound.map((categoria) => categoria._id);
    
    //tenemos que ver que tenga un estado existente
    const estadoFound = await Estado.find({ nombre: {$in: estado}});
    if (estadoFound.length === 0) return [null, "El estado no existe"];
    const myEstado = estadoFound.map((estado) => estado._id);

    const newFormulario = new Formulario({
      categoria: myCategoria,
      estado: myEstado,
      fecha,
      usuario,
      email,
      observaciones,
      Residencia,
      Constitucion,
      Carnet,
      Propiedad,
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

//Obtener el estado del formulario con el nombre del usuario
/**
 * 
 * @param {string} usuario 
 * @returns 
 */
//URGENTE: HAY QUE VER COMO HACERLO, REQUISITO FUNCIONAL FRANCISCO
async function getEstadoFormulario(usuario) {
  try {
    const formulario = await Formulario.find({usuario: usuario}).exec();

    if (!formulario) return [null, "El formulario no existe"];

    return [formulario, null];
  } catch (error) {
    handleError(error, "formulario.service -> getEstadoFormulario");
  }
}

module.exports = {
    getFormularios,
    createFormulario,
    getFormularioById,
    updateFormulario,
    deleteFormulario,
    getEstadoFormulario,
};