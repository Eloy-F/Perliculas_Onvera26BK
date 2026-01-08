import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('categorias')
export class Categoria{
    
    @PrimaryGeneratedColumn({name: 'id_categoria'})
    idCategoria: number; 
    @Column({ name: "nombre" })
    nombre: string;   
    @Column({ name: "descripcion" })
    descripcion: string;
     @Column({ name: "estado"})
    estado: string;
    @Column({ name: "tipo"})
    tipo: string;

}