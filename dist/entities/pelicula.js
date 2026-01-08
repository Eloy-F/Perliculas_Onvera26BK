"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pelicula = void 0;
const typeorm_1 = require("typeorm");
let Pelicula = class Pelicula {
};
exports.Pelicula = Pelicula;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_pelicula' }),
    __metadata("design:type", Number)
], Pelicula.prototype, "idPelicula", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "titulo" }),
    __metadata("design:type", String)
], Pelicula.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "id_categoria" }),
    __metadata("design:type", Number)
], Pelicula.prototype, "idCategoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "imagen_url" }),
    __metadata("design:type", String)
], Pelicula.prototype, "imagenUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "descripcion" }),
    __metadata("design:type", String)
], Pelicula.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "fecha_creacion", type: "date", nullable: true }),
    __metadata("design:type", Date)
], Pelicula.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "estado" }),
    __metadata("design:type", String)
], Pelicula.prototype, "estado", void 0);
exports.Pelicula = Pelicula = __decorate([
    (0, typeorm_1.Entity)('pelicula')
], Pelicula);
//# sourceMappingURL=pelicula.js.map