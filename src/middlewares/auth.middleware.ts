import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token no proporcionado"
      });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Formato de token inválido"
      });
    }

    const token = parts[1];
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "onvera_secret"
    );

    console.log("🟦 TOKEN DECODIFICADO ===>", decoded);

    // 🟩 NORMALIZAR ID
    req.user = {
      idUsuario: decoded.idUsuario || decoded.id || decoded.userId,
      correo: decoded.correo,
      roles: decoded.roles
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado"
    });
  }
};
