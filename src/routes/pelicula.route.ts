import { Router } from "express";
import { upload } from "../middlewares/upload";

import {
  listarPeliculaVigente,
  listarPeliculas,
  listarPeliculasPorTipo,
  crearPelicula,
  actualizarPelicula,
  cambiarEstadoPelicula,
  eliminarPelicula,  
} from "../controllers/pelicula.controller";

const router: Router = Router();

router.get("/", listarPeliculaVigente);
router.get("/admin", listarPeliculas);
router.get("/tipo/:tipo", listarPeliculasPorTipo);

router.post("/", upload.single("imagen"), crearPelicula);
router.put("/:id", upload.single("imagen"), actualizarPelicula);

router.put("/:id/estado", cambiarEstadoPelicula);
router.delete("/:id", eliminarPelicula);

export default router;
