"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pelicula_controller_1 = require("../controllers/pelicula.controller");
const router = (0, express_1.Router)();
//GET /---> listarPersonas
//POST /---> insertarPersonas
//GET /{idPersona} --->Obterner persona
//PUT /{idPersona} --->editar persona
router.get('/', pelicula_controller_1.listarPeliculaVigente); //llamamos la lista del controller
exports.default = router;
//# sourceMappingURL=pelicula.route.js.map