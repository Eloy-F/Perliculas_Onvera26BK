import AppDataSource from "../config/datasource";
import { Pelicula } from "../entities/pelicula";

const repository = AppDataSource.getRepository(Pelicula);

/* ===========================
   LISTAR
=========================== */

// Todas las películas (backoffice)
export const listarPeliculas = async () => {
  return await AppDataSource.query(`
    SELECT p.id_pelicula,
           p.titulo,p.id_categoria,c.nombre AS categoria,
           p.imagen_url,p.descripcion,p.video_url,p.estado
    FROM peliculas p
    JOIN categorias c ON p.id_categoria = c.id_categoria
    ORDER BY p.id_pelicula
  `);
};

// Películas activas (app móvil)
export const listarPeliculaVigente = async () => {
  return await AppDataSource.query(`
    SELECT * FROM peliculas WHERE estado = 'A'
    ORDER BY id_pelicula`);
};

// Por tipo (ADULTOS / NIÑOS)
export const listarPeliculasPorTipo = async (tipo: string) => {
  return await AppDataSource.query(`
    SELECT p.* FROM peliculas p
    JOIN categorias c ON p.id_categoria = c.id_categoria
    WHERE c.tipo = $1 AND p.estado = 'A'`, 
    [tipo]);
};

/* ===========================
   CREAR
=========================== */

export const crearPelicula = async (data: any) => {
  const pelicula = repository.create({
    titulo: data.titulo,
    idCategoria: data.id_categoria,
    imagenUrl: data.imagen_url,
    descripcion: data.descripcion,
    videoUrl: data.video_url,
    estado: "A"
  });

  return await repository.save(pelicula);
};

/* ===========================
   ACTUALIZAR
=========================== */

export const actualizarPelicula = async (id: number, data: any) => {
  await AppDataSource.query(
    `UPDATE peliculas SET
      titulo = $1,id_categoria = $2,imagen_url = COALESCE($3, imagen_url),
      descripcion = $4,video_url = $5
    WHERE id_pelicula = $6`,
    [
      data.titulo,
      Number(data.id_categoria), // conversión importante
      data.imagen_url || null,
      data.descripcion,
      data.video_url,
      id
    ]
  );
};


/* ===========================
   CAMBIAR ESTADO
=========================== */

export const cambiarEstadoPelicula = async (id: number) => {
  await AppDataSource.query(`
    UPDATE peliculas SET estado = CASE
      WHEN estado = 'A' THEN 'I'
      ELSE 'A' END WHERE id_pelicula = $1`, 
      [id]);
};

/* ===========================
   ELIMINAR
=========================== */

export const eliminarPelicula = async (id: number) => {
  await AppDataSource.query(`
    DELETE FROM peliculas WHERE id_pelicula = $1`, 
    [id]);
};
