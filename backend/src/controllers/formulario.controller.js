"use strict";

//Importamos las respuestas
const { respondSuccess, respondError } = require("../utils/resHandler");
//Importamos el servicio de formulario
const FormularioService = require("../services/formulario.service");
//Importamos el schema de formulario
const { formularioBodySchema, formularioIdSchema, formularioEmailSchema } = require("../schema/formulario.schema");
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
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    // The name of the input field (i.e. "file") is used to retrieve the uploaded file
    //ver como el nombre de la carpetaa creada tenga la fecha
    const file = req.files.residencia;
    let path = `${__dirname}/../uploads/${body.email} ${fecha}/${file.name}`;
    const file2 = req.files.constitucion;
    let path2 = `${__dirname}/../uploads/${body.email} ${fecha}/${file2.name}`;
    const file3 = req.files.carnet;
    let path3 = `${__dirname}/../uploads/${body.email} ${fecha}/${file3.name}`;
    const file4 = req.files.propiedad;
    let path4 = `${__dirname}/../uploads/${body.email} ${fecha}/${file4.name}`;
    file.mv(path, function (err) {
      if (err) {
        return res.status(500).send(err);
      }

      file2.mv(path2, function (err) {
        if (err) {
          return res.status(500).send(err);
        }

        file3.mv(path3, function (err) {
          if (err) {
            return res.status(500).send(err);
          }

          file4.mv(path4, function (err) {
            if (err){
              return res.status(500).send(err);
            }
          });

        });
      });
    });
    // Se guardan los nombres de los rchivos en mongoDB
    body.Residencia = file.name;
    body.Constitucion = file.name;
    body.Carnet = file.name;
    body.Propiedad = file.name;

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



//Exportamos los modulos
module.exports = {
  getFormularios,
  createFormulario,
  getFormularioById,
  updateFormularioById,
  deleteFormularioById,
  getEstadoFormularioByEmail,
  getObsFormularioByEmail,
};