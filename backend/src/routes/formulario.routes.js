"user strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");
// Importa el controlador de usuarios
const formularioController = require("../controllers/formulario.controller.js");
// Instancia del enrutador
const router = express.Router();

//Middleware de autorizacion
//Hay cosas que solo puede hacer el admin y/o el validador
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

//Si algo lo realiza el admin, se debe agregar el middleware de autorizacion: authorizationMiddleware.isAdmin
//Si algo lo realiza el validador, se debe agregar el middleware de autorizacion: authorizationMiddleware.isValidator
router.get("/", authorizationMiddleware.isAdmin, formularioController.getFormularios);
router.post("/", formularioController.createFormulario);
router.get("/:id", formularioController.getFormularioById);
router.put("/:id", authorizationMiddleware.isValidator, formularioController.updateFormulario);
router.delete("/:id", authorizationMiddleware.isAdmin, formularioController.deleteFormulario);

module.exports = router;