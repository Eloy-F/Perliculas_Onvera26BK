"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario.controller");
const router = (0, express_1.Router)();
//GET / --- > listarPersonas
//POST / ---> insertarPersona
//GET /{idPersona} ---> Obtener persona
//PUT /{idPersona} ---> Editar Persona
router.post('/verificar', usuario_controller_1.verificarUsuario);
console.log("Router de usuario cargado");
exports.default = router;
//# sourceMappingURL=usuario.route.js.map