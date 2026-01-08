import { Router } from "express";
import {
  login,listarUsuarios,actualizarUsuario,
  cambiarEstadoUsuario,crearUsuario,cambiarPassword,registrarUsuario
} from "../controllers/usuario.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router: Router = Router();

// AUTH
router.post("/login", login); // LOGIN (SIN TOKEN)

// USUARIOS (PROTEGIDOS)
router.get("/", authMiddleware, listarUsuarios);
router.post("/", authMiddleware, crearUsuario);
router.put("/:id", authMiddleware, actualizarUsuario);
router.put("/:id/estado", authMiddleware, cambiarEstadoUsuario);

console.log("Router de usuario cargado");

router.put("/password", authMiddleware, cambiarPassword);

router.post("/registro", registrarUsuario);

export default router;









/*import { Router } from "express";
import {login,
  verificarUsuario,
  listarUsuarios,
  actualizarUsuario,
  cambiarEstadoUsuario,
  crearUsuario
} from "../controllers/usuario.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router: Router = Router();

// 🔐 AUTH
router.post("/login", login);                         // LOGIN
router.get("/verificar", authMiddleware, verificarUsuario); // VERIFICAR TOKEN

// 👤 USUARIOS
router.get("/", listarUsuarios);
router.post("/", crearUsuario);
router.put("/:id", actualizarUsuario);
router.put("/:id/estado", cambiarEstadoUsuario);

console.log("Router de usuario cargado");

export default router;*/
