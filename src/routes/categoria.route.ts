import { Router } from "express";
import {
  listarCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
} from "../controllers/categoria.controller";

const router: Router = Router();

// LISTAR
router.get("/", listarCategorias);

// CREAR
router.post("/", crearCategoria);

// ACTUALIZAR
router.put("/:id", actualizarCategoria);

// ELIMINAR
router.delete("/:id", eliminarCategoria);

export default router;
