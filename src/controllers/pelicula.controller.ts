import { Request, Response } from "express";
import { BaseResponse } from "../shared/base-response";
import * as peliculaService from "../services/pelicula.service";

/* ===========================
   LISTAR TODAS (ACTIVAS)
=========================== */
export const listarPeliculaVigente = async (req: Request, res: Response) => {
  try {
    const peliculas = await peliculaService.listarPeliculaVigente();
    return res.json(BaseResponse.success(peliculas));
  } catch (error: any) {
    console.error("listarPeliculaVigente:error", error);
    return res.status(500).json(
      BaseResponse.error("Error al listar películas")
    );
  }
};

/* ===========================
   LISTAR POR TIPO
=========================== */
export const listarPeliculasPorTipo = async (req: Request, res: Response) => {
  const { tipo } = req.params;

  try {
    const peliculas = await peliculaService.listarPeliculasPorTipo(tipo);
    return res.json(BaseResponse.success(peliculas));
  } catch (error: any) {
    console.error("listarPeliculasPorTipo:error", error);
    return res.status(500).json(
      BaseResponse.error("Error al listar películas por tipo")
    );
  }
};

/* ===========================
   CREAR PELÍCULA
=========================== */
export const crearPelicula = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    // Si viene imagen (multer)
    if (req.file) {
      data.imagen_url = `/uploads/${req.file.filename}`;
    }

    const pelicula = await peliculaService.crearPelicula(data);
    res.json(BaseResponse.success(pelicula, "Película creada"));
  } catch (error: any) {
    console.error("crearPelicula:error", error);
    res.status(500).json(BaseResponse.error("Error al crear película"));
  }
};

export const actualizarPelicula = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data: any = {
      titulo: req.body.titulo,
      id_categoria: Number(req.body.id_categoria),
      descripcion: req.body.descripcion,
      video_url: req.body.video_url
    };

    if (req.file) {
      data.imagen_url = `/uploads/${req.file.filename}`;
    }

    await peliculaService.actualizarPelicula(Number(id), data);
    res.json(BaseResponse.success(true, "Película actualizada"));
  } catch (error: any) {
    console.error("actualizarPelicula:error", error);
    res.status(500).json(BaseResponse.error(error.message));
  }
};

export const eliminarPelicula = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await peliculaService.eliminarPelicula(Number(id));
    res.json(BaseResponse.success(true, "Película eliminada"));
  } catch (error: any) {
    res.status(500).json(BaseResponse.error("Error al eliminar película"));
  }
};

export const cambiarEstadoPelicula = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await peliculaService.cambiarEstadoPelicula(Number(id));
    res.json(BaseResponse.success(true, "Estado actualizado"));
  } catch (error: any) {
    res.status(500).json(BaseResponse.error("Error al cambiar estado"));
  }
};
/* ===========================
   LISTAR TODAS (BACKOFFICE)
=========================== */
export const listarPeliculas = async (req: Request, res: Response) => {
  try {
    const peliculas = await peliculaService.listarPeliculas();
    return res.json(BaseResponse.success(peliculas));
  } catch (error: any) {
    console.error("listarPeliculas:error", error);
    return res
      .status(500)
      .json(BaseResponse.error("Error al listar películas"));
  }
};