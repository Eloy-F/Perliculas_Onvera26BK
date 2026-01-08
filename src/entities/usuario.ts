import {Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { UsuarioRol } from "./usuarioRol";

@Entity('usuarios')
export class Usuario{
    @PrimaryGeneratedColumn({name: 'id_usuario'})
    idUsuario: number; 
    @Column({ name: "nombres" })
    nombres: string;
    @Column({ name: "apellidos"})
    apellidos: string;
    @Column({ name: "correo", unique: true })
    correo: string;
    @Column({ name: "password" })
    password: string;
     @Column({ name: "celular" })
    celular: string;
    @Column({ name: "fecha_nacimiento" })
    fechaNacimiento: Date;
    @Column({ name: "estado"})
    estado: string;

  //RELACIÓN CON ROLES
  @OneToMany(() => UsuarioRol, (ur) => ur.usuario)
  roles: UsuarioRol[];

}

