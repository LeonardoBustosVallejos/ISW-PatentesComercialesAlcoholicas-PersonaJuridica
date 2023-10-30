"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");
// Importa el controlador de usuarios
const formularioController = require("../controllers/formulario.controller.js");

// Importa el middleware de autorización
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

// Importa el middleware de autenticación
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

// Instancia del enrutador
const router = express.Router();
router.use(authenticationMiddleware);

//Si algo lo realiza el admin, se debe agregar el middleware de autorizacion: authorizationMiddleware.isAdmin
//Si algo lo realiza el validador, se debe agregar el middleware de autorizacion: authorizationMiddleware.isValidator
router.get("/",  formularioController.getFormularios);
router.post("/", formularioController.createFormulario);
router.get("/:id", formularioController.getFormularioById);
router.put("/:id", authorizationMiddleware.isValidator ,formularioController.updateFormularioById);
router.delete("/:id", formularioController.deleteFormularioById);

//REQUISITO FUNCIONAL FRANCISCO
router.get("/consulta/:email", formularioController.getEstadoFormularioByEmail);
router.get("/consulta/:email/obs", formularioController.getObsFormularioByEmail);
router.get("/consulta/:email/obs/:id", formularioController.getFormularioByEmailyID);

// Exporta el enrutador
module.exports = router;