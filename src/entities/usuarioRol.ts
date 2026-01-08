import {Entity,ManyToOne,JoinColumn,PrimaryColumn} from "typeorm";
import { Usuario } from "./usuario";
import { Rol } from "./rol";

@Entity("usuario_roles")
export class UsuarioRol {

  @PrimaryColumn({ name: "id_usuario" })
  idUsuario: number;

  @PrimaryColumn({ name: "id_rol" })
  idRol: number;

  @ManyToOne(() => Usuario, (u) => u.roles)
  @JoinColumn({ name: "id_usuario" })
  usuario: Usuario;

  @ManyToOne(() => Rol, (r) => r.usuarios)
  @JoinColumn({ name: "id_rol" })
  rol: Rol;
}
