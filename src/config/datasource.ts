import { DataSource } from "typeorm";
import { Usuario } from "../entities/usuario";
import { Categoria } from "../entities/categoria";
import { Pelicula } from "../entities/pelicula";
import { Rol } from "../entities/rol";
import { UsuarioRol } from "../entities/usuarioRol";

console.log('AppDataSource', {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    Usuario,
    Rol,          // NECESARIO
    UsuarioRol,   // NECESARIO
    Categoria,
    Pelicula
  ],
  synchronize: false,
  logging: false
});

export default AppDataSource;

