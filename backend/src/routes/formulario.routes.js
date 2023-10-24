"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");
// Importa el controlador de usuarios
const formularioController = require("../controllers/formulario.controller.js");

// Importa el middleware de autorización
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
// Instancia del enrutador
const router = express.Router();

//Si algo lo realiza el admin, se debe agregar el middleware de autorizacion: authorizationMiddleware.isAdmin
//Si algo lo realiza el validador, se debe agregar el middleware de autorizacion: authorizationMiddleware.isValidator
router.get("/",  formularioController.getFormularios);
router.post("/", formularioController.createFormulario);
router.get("/:id", formularioController.getFormularioById);
router.put("/:id", formularioController.updateFormularioById);
router.delete("/:id", formularioController.deleteFormularioById);
router.get("/u/:id", formularioController.getEstadoFormularioByName);

module.exports = router;