"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const usuario_1 = require("../entities/usuario");
const categoria_1 = require("../entities/categoria");
const pelicula_1 = require("../entities/pelicula");
console.log('AppDataSource', {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        usuario_1.Usuario, categoria_1.Categoria, pelicula_1.Pelicula
    ]
});
exports.default = AppDataSource;
//# sourceMappingURL=datasource.js.map