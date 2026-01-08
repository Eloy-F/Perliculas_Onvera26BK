import {Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('peliculas')
export class Pelicula{
    @PrimaryGeneratedColumn({name: 'id_pelicula'})
    idPelicula: number; 
    @Column({ name: "titulo" })
    titulo: string;
    @Column({ name: "id_categoria"})
    idCategoria: number;
    @Column({ name: "imagen_url"})
    imagenUrl: string;
    @Column({ name: "descripcion" })
    descripcion: string;
    @Column({ name: "fecha_creacion", type: "date", nullable: true })
    fechaCreacion: Date;
    @Column({ name: "estado"})
    estado: string;
   @Column({ name: "video_url", nullable: true })
    videoUrl: string;
}
