import { Request, Response } from "express";
import { BaseResponse } from "../shared/base-response";
import * as listarCategoriaService from '../services/categoria.service';

/* ===========================
   LISTAR TODAS
=========================== */
export const listarCategorias = async (req: Request, res: Response) => {
  try {
    const categorias = await listarCategoriaService.listarCategoriaVigente();
    res.json(BaseResponse.success(categorias));
  } catch (error: any) {
    console.error("listarCategorias:error", error);
    res.status(500).json(BaseResponse.error("Error al listar categorías"));
  }
};

/* ===========================
   CREAR
=========================== */
export const crearCategoria = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    if (!data.nombre || !data.tipo) {
      return res
        .status(400)
        .json(BaseResponse.error("Nombre y tipo son obligatorios"));
    }

    await listarCategoriaService.crearCategoria(data);
    res.json(BaseResponse.success(true, "Categoría creada"));
  } catch (error: any) {
    console.error("crearCategoria:error", error);
    res.status(500).json(BaseResponse.error("Error al crear categoría"));
  }
};

/* ===========================
   ACTUALIZAR
=========================== */
export const actualizarCategoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await listarCategoriaService.actualizarCategoria(Number(id), req.body);
    res.json(BaseResponse.success(true, "Categoría actualizada"));
  } catch (error: any) {
    console.error("actualizarCategoria:error", error);
    res.status(500).json(BaseResponse.error("Error al actualizar categoría"));
  }
};

/* ===========================
   ELIMINAR
=========================== */
export const eliminarCategoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await listarCategoriaService.eliminarCategoria(Number(id));
    res.json(BaseResponse.success(true, "Categoría eliminada"));
  } catch (error: any) {
    console.error("eliminarCategoria:error", error);
    res.status(500).json(BaseResponse.error("Error al eliminar categoría"));
  }
};
