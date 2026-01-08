import { Response } from "express";
import AppDataSource from "../config/datasource";
import { BaseResponse } from "../shared/base-response";
import { AuthRequest } from "../interfaces/request.interface";

export const obtenerMiPerfil = async (req: AuthRequest, res: Response) => {
  try {
    const idUsuario = req.user.idUsuario;

    const perfil = await AppDataSource.query(`SELECT u.nombres,u.apellidos,u.correo,u.celular, p.foto_url
      FROM usuarios u
      LEFT JOIN perfiles p ON u.id_usuario = p.id_usuario
      WHERE u.id_usuario = $1`,
      [idUsuario]);

    if (perfil.length === 0) {
      return res
        .status(404)
        .json(BaseResponse.error("Perfil no encontrado"));
    }

    res.json(BaseResponse.success(perfil[0]));
  } catch (error) {
    console.error("obtenerMiPerfil:error", error);
    res.status(500).json(
      BaseResponse.error("Error al obtener perfil")
    );
  }
};
