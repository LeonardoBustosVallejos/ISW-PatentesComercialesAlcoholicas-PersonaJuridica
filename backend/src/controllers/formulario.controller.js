"use strict";

//Importamos las respuestas
const { respondSuccess, respondError } = require("../utils/resHandler");
//Importamos el servicio de formulario
const FormularioService = require("../services/formulario.service");
//Importamos el schema de formulario
const { formularioBodySchema, formularioIdSchema, formularioEmailSchema, formularioUpdateSchema } = require("../schema/formulario.schema");
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
const fs = require("fs");
const path = require('path');

// Modify the createFormulario function to handle both types of forms
async function createFormulario(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = formularioBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se subieron archivos.");
    }

    const uploadedFiles = req.files;
    const currentDate = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    const ext_permitidas = [".png", ".jpg", ".jpeg", ".pdf"];

    if (body.categoria === "De Alcoholes") {//SI es dee alcoholes

      const nombresArchivos = Object.values(uploadedFiles).map((file) => {
        const ext = path.extname(file.name);
        if (!ext_permitidas.includes(ext)) {
          throw new Error(
            `NO se permiten extensiones de tipo: ${ext}\n SOLO se permiten de tipo: ${ext_permitidas}`
          );
        }
        const filePath = `${__dirname}/../uploads/${body.email} ${currentDate}/${file.name}`;
        // Save the file to disk
        fs.mkdirSync(`${__dirname}/../uploads/${body.email} ${currentDate}`, { recursive: true });
        fs.writeFileSync(filePath, file.data);
        return file.name;
      });
  
      // Save the names of all uploaded files to the database
      body.Residencia = nombresArchivos[0];
      body.Constitucion = nombresArchivos[1];
      body.Carnet = nombresArchivos[2];
      body.Propiedad = nombresArchivos[3];
      body.extrafield = nombresArchivos[4];
        if(body.extrafield === undefined){
          return res.status(400).send("No se subio el archivo de Autoridad Sanitaria.");
        }
    }
    else{
      const nombresArchivos = Object.values(uploadedFiles).map((file) => {
        const ext = path.extname(file.name);
        if (!ext_permitidas.includes(ext)) {
          throw new Error(
            `NO se permiten extensiones de tipo: ${ext}\n SOLO se permiten de tipo: ${ext_permitidas}`
          );
        }
        const filePath = `${__dirname}/../uploads/${body.email} ${currentDate}/${file.name}`;
        // Save the file to disk
        fs.mkdirSync(`${__dirname}/../uploads/${body.email} ${currentDate}`, { recursive: true });
        fs.writeFileSync(filePath, file.data);
        return file.name;
      });
  
      // Save the names of all uploaded files to the database
      body.Residencia = nombresArchivos[0];
      body.Constitucion = nombresArchivos[1];
      body.Carnet = nombresArchivos[2];
      body.Propiedad = nombresArchivos[3];
      
    }
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
    console.log(params);
    console.log(body);
    const { error: paramsError } = formularioIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = formularioUpdateSchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [formulario, formularioError] = await FormularioService.updateFormulario(
      params.id,
      body
    );
    console.log(formulario);
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
async function getEstadoFormularioByEmail(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = formularioEmailSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [formulario, formularioError] = await FormularioService.getEstadoFormulario(params.email);
    if (formularioError) return respondError(req, res, 404, formularioError);

    respondSuccess(req, res, 200, formulario);
  } catch (error) {
    handleError(error, "formulario.controller -> getFormularioByEmail");
    respondError(req, res, 500, "No se obtuvo el formulario");
  }
}

async function getObsFormularioByEmail(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = formularioEmailSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [formulario, formularioError] = await FormularioService.getObsFormulario(params.email);
    if (formularioError) return respondError(req, res, 404, formularioError);

    respondSuccess(req, res, 200, formulario);
  } catch (error) {
    handleError(error, "formulario.controller -> getFormularioByEmail");
    respondError(req, res, 500, "No se obtuvo el formulario");
  }
}

async function getFormularioByEmailyID(req, res) {
  try {
    const { email, id } = req.params;

    const { error: emailError } = formularioEmailSchema.validate({ email });
    if (emailError) return respondError(req, res, 400, emailError.message);

    const { error: bodyError } = formularioIdSchema.validate({ id });
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [formulario, formularioError] = await FormularioService.getObsFormularioByID(email, id);
    if (formularioError) return respondError(req, res, 404, formularioError);

    respondSuccess(req, res, 200, formulario);
  } catch (error) {
    handleError(error, "formulario.controller -> getFormularioByEmailyID");
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
  getEstadoFormularioByEmail,
  getObsFormularioByEmail,
  getFormularioByEmailyID,
};