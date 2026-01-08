import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import * as usuarioService from "../services/usuario.service";
import { BaseResponse } from "../shared/base-response";
import AppDataSource from "../config/datasource";
import { AuthRequest } from "../interfaces/request.interface";


export const login = async (req: Request, res: Response) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res
        .status(400)
        .json(BaseResponse.error("Correo y password obligatorios"));
    }

    const usuario = await usuarioService.verificarUsuario({ correo, password });

    if (!usuario) {
      return res
        .status(401)
        .json(BaseResponse.error("Credenciales incorrectas"));
    }

    const token = jwt.sign(
      {
        idUsuario: usuario.idUsuario,
        correo: usuario.correo,
        roles: usuario.roles
      },
      process.env.JWT_SECRET || "onvera_secret",
      { expiresIn: "8h" }
    );

    return res.json(
      BaseResponse.success({
        usuario,
        token
      })
    );
  } catch (error: any) {
    console.error("login:error", error);
    res.status(500).json(BaseResponse.error("Error al iniciar sesión"));
  }
};


//LISTAR USUARIOS (BACKOFFICE)

export const listarUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await usuarioService.listarUsuarios();
        res.json(BaseResponse.success(usuarios));
    } catch (error: any) {
        console.error("listarUsuarios:error", error);
        res.status(500).json(BaseResponse.error(error.message));
    }
};


export const actualizarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await usuarioService.actualizarUsuario(Number(id), req.body);
    res.json(BaseResponse.success(true, "Usuario actualizado"));
  } catch (error:any) {
    res.status(500).json(BaseResponse.error(error.message));
  }
};

export const cambiarEstadoUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await usuarioService.cambiarEstadoUsuario(Number(id));
    res.json(BaseResponse.success(true, "Estado actualizado"));
  } catch (error: any) {
    res.status(500).json(BaseResponse.error(error.message));
  }
};

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await usuarioService.crearUsuario(req.body);
    res.json(BaseResponse.success(usuario, "Usuario registrado"));
  } catch (error: any) {
    res.status(500).json(BaseResponse.error(error.message));
  }
};

export const cambiarPassword = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json(BaseResponse.error("No autorizado"));
    }

    const idUsuario = req.user.idUsuario;
    const { passwordActual, passwordNueva } = req.body;

    const result = await AppDataSource.query(
      `SELECT password FROM usuarios WHERE id_usuario = $1`,
      [idUsuario]
    );

    if (result.length === 0) {
      return res.status(404).json(BaseResponse.error("Usuario no encontrado"));
    }

    const dbPassword = result[0].password;
    let ok = false;

    // 🟦 Detectar si la contraseña está hasheada con bcrypt
    if (dbPassword.startsWith("$2")) {
      ok = await bcrypt.compare(passwordActual, dbPassword);
    } else {
      // Contraseña guardada en TEXTO PLANO → comparar directo
      ok = passwordActual === dbPassword;

      // Si coincide → migrar a bcrypt automáticamente
      if (ok) {
        const newHash = await bcrypt.hash(dbPassword, 10);
        await AppDataSource.query(
          `UPDATE usuarios SET password = $1 WHERE id_usuario = $2`,
          [newHash, idUsuario]
        );
        console.log("Password migrado automáticamente a BCRYPT 🔐");
      }
    }

    if (!ok) {
      return res.status(400).json(BaseResponse.error("Contraseña actual incorrecta"));
    }

    // Guardar la nueva contraseña hasheada
    const hash = await bcrypt.hash(passwordNueva, 10);
    await AppDataSource.query(
      `UPDATE usuarios SET password = $1 WHERE id_usuario = $2`,
      [hash, idUsuario]
    );

    return res.json(BaseResponse.success(true, "Contraseña actualizada correctamente"));

  } catch (error) {
    console.error("ERROR cambiarPassword:", error);
    return res.status(500).json(BaseResponse.error("Error al cambiar la contraseña"));
  }
};

//registrar Usuario
export const registrarUsuario = async (req: Request, res: Response) => {
  try {
    const { nombres, apellidos, correo, password, celular } = req.body;

    if (!nombres || !apellidos || !correo || !password) {
      return res
        .status(400)
        .json(BaseResponse.error("Datos obligatorios incompletos"));
    }

    await usuarioService.registrarUsuario({
      nombres,apellidos,correo,password,celular
    });

    res.json(
      BaseResponse.success(true, "Usuario registrado correctamente")
    );

  } catch (error: any) {
    console.error("registrarUsuario:error", error);

    if (error.message === "Correo ya registrado") {
      return res
        .status(400)
        .json(BaseResponse.error(error.message));
    }

    res.status(500).json(
      BaseResponse.error("Error al registrar usuario")
    );
  }
};