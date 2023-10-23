"use strict";

//Importamos las respuestas
const { respondSuccess, respondError } = require("../utils/resHandler");
//Importamos el servicio de formulario
const FormularioService = require("../services/formulario.service");
//Importamos el schema de formulario
const { formularioBodySchema, formularioIdSchema } = require("../schema/formulario.schema");
//Importamos el manejo de errores
const { handleError } = require("../utils/errorHandler");

//Obtener todos los formularios
async function getFormularios(req, res) {
  try {
    const [formularios, errorFormularios] = await FormularioService.getFormularios();
    if (errorFormularios) return respondError(req, res, 404, errorFormularios);

    formularios.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, formularios);
  } catch (error) {
    handleError(error, "formulario.controller -> getFormularios");
    respondError(req, res, 400, error.message);
  }
}

//Crear un formulario
async function createFormulario(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = formularioBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [formulario, formularioError] = await FormularioService.createFormulario(body);
    if (formularioError) return respondError(req, res, 404, formularioError);

    respondSuccess(req, res, 201, formulario);
  } catch (error) {
    handleError(error, "formulario.controller -> createFormulario");
    respondError(req, res, 500, "No se creo el formulario");
  }
}

//Obtener un formulario por su id
async function getFormularioById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = formularioIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [formulario, formularioError] = await FormularioService.getFormularioById(params.id);
    if (formularioError) return respondError(req, res, 404, formularioError);

    respondSuccess(req, res, 200, formulario);
  } catch (error) {
    handleError(error, "formulario.controller -> getFormularioById");
    respondError(req, res, 500, "No se obtuvo el formulario");
  }
}

//Actualizar un formulario por su id
async function updateFormularioById(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = formularioIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = formularioBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [formulario, formularioError] = await FormularioService.updateFormularioById(
      params.id,
      body
    );
    if (formularioError) return respondError(req, res, 404, formularioError);

    respondSuccess(req, res, 200, formulario);
  } catch (error) {
    handleError(error, "formulario.controller -> updateFormularioById");
    respondError(req, res, 500, "No se actualizo el formulario");
  }
}

//Eliminar un formulario por su id
async function deleteFormularioById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = formularioIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [formulario, formularioError] = await FormularioService.deleteFormularioById(params.id);
    if (formularioError) return respondError(req, res, 404, formularioError);

    respondSuccess(req, res, 200, formulario);
  } catch (error) {
    handleError(error, "formulario.controller -> deleteFormularioById");
    respondError(req, res, 500, "No se elimino el formulario");
  }
}

//Obtener el estado de un formulario por su id
async function getEstadoFormularioByName(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = formularioBodySchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [formulario, formularioError] = await FormularioService.getEstadoFormulario(params.id);
    if (formularioError) return respondError(req, res, 404, formularioError);

    respondSuccess(req, res, 200, formulario);
  } catch (error) {
    handleError(error, "formulario.controller -> getFormularioById");
    respondError(req, res, 500, "No se obtuvo el formulario");
  }
}

//Exportamos los modulos
module.exports = {
  getFormularios,
  createFormulario,
  getFormularioById,
  updateFormularioById,
  deleteFormularioById,
  getEstadoFormularioByName,
};