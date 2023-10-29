"user strict";

//Importamos el modelo de formulario
const Formulario = require("../models/formulario.model.js");
//Importamos el modelo de categoria
const Categoria = require("../models/categoria.model.js");
//Importamos el modelo de estado
const Estado = require("../models/estado.model.js");
//Importamos el modelo de usuario
const Usuario = require("../models/user.model.js");
const { handleError } = require("../utils/errorHandler");


//Crear CRUD para el formulario
//getFormularios
async function getFormularios() {
  try {
    const formularios = await Formulario.find().populate("categoria").populate("estado")
    .populate({path:"usuario",select:"username"})
    .populate({path:"email",select:"email"})
    .exec();
    if (!formularios) return [null, "No hay formularios"];

    return [formularios, null];
  } catch (error) {
    handleError(error, "formulario.service -> getFormularios");
  }
}

//createFormulario
async function createFormulario(formulario, extrafield) {
  try {
    const { categoria, usuario, email, Residencia, Constitucion, Carnet, Propiedad, extrafield } = formulario;

    //Tenemos que ver que tenga una categoria existente
    const categoriaFound = await Categoria.find({ nombre: { $in: categoria } });
    if (categoriaFound.length === 0) return [null, "La categoria no existe"];
    const myCategoria = categoriaFound.map((categoria) => categoria._id);

    //El usuario tiene que estar en la base de datos
    const usuarioFound = await Usuario.find({ username: usuario });
    if (usuarioFound.length === 0) return [null, "El usuario no existe"];
    const myUsuario = usuarioFound.map((usuario) => usuario._id);

    //El email tiene que estar en la base de datos
    const emailFound = await Usuario.find({ email: email });
    if (emailFound.length === 0) return [null, "El email no existe"];
    const myEmail = emailFound.map((email) => email._id);

    //Convierto las id a string para poder compararlas
    const UID = myUsuario[0]._id.toString();
    const EID = myEmail[0]._id.toString();
    //Comparamos que la id de usuario sea igual al id del email
    if (UID !== EID) return [null, "El usuario no coincide con el email, sus ID son: " + UID + " " + EID];

    const newFormulario = new Formulario({
      categoria: myCategoria,
      usuario: myUsuario,
      email: myEmail,
      Residencia,
      Constitucion,
      Carnet,
      Propiedad,
      extrafield // Add the extra field to the newFormulario object
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
        const formularios = await Formulario.findById({ _id: id }).populate("categoria").populate("estado")
        .populate({path:"usuario",select:"username"})
        .populate({path:"email",select:"email"})
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


//Requisito funcional
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
 * @param {string} email Email del usuario
 * @returns {Promise} Promesa con el objeto de formulario
 */

async function getEstadoFormulario(email) {
  try {
     //El email tiene que estar en la base de datos
     const emailFound = await Usuario.find({ email: email });
     if (emailFound.length===0) return [null, "El email no existe"];
     const myEmail = emailFound.map((email) => email._id);

    const formulario = await Formulario.find({email: myEmail}).select('estado _id').populate('estado').exec();
    if (!formulario) return [null, "El formulario no existe"];
    //Conseguimos el estado del formulario
    const estadoConsulta = formulario[0].estado.nombre;
    
    return ["El estado de la consulta es: "+estadoConsulta, null];
  } catch (error) {
    handleError(error, "formulario.service -> getEstadoFormulario");
  }
}

async function getObsFormulario(email) {
  try {
    const emailFound = await Usuario.find({ email: email });
     if (emailFound.length===0) return [null, "El email no existe"];
     const myEmail = emailFound.map((email) => email._id);
    
    const formulario = await Formulario.find({email: myEmail}).select('observaciones').exec();
    if (!formulario) return [null, "El formulario no existe"];
    //Conseguimos la observacion del formulario
    const obsConsulta = formulario.map((obs) => obs.observaciones);

    return ["La(s) observacion(es): "+obsConsulta, null];
  } catch (error) {
    handleError(error, "formulario.service -> getObsFormulario");
  }
}

module.exports = {
    getFormularios,
    createFormulario,
    getFormularioById,
    updateFormulario,
    deleteFormulario,
    getEstadoFormulario,
    getObsFormulario,
};