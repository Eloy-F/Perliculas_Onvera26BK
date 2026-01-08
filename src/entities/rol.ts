import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UsuarioRol } from "./usuarioRol";

@Entity("roles")
export class Rol {

  @PrimaryGeneratedColumn({ name: "id_rol" })
  idRol: number;

  @Column({ name: "nombre", length: 50, unique: true })
  nombre: string;

  @OneToMany(() => UsuarioRol, (ur) => ur.rol)
  usuarios: UsuarioRol[];
}
