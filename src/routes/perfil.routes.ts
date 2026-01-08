import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  obtenerMiPerfil} from "../controllers/perfil.controller";

const router = Router();

//PERFIL
router.get("/personal", authMiddleware, obtenerMiPerfil);


export default router;