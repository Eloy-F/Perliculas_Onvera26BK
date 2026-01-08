import { Request } from "express";

export interface AuthRequest extends Request {
  user: {
    idUsuario: number;
    correo: string;
    roles: string[];
  };
}