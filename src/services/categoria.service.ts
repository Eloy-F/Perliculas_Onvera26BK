import AppDataSource from "../config/datasource";
import { Categoria } from "../entities/categoria";

const repository = AppDataSource.getRepository(Categoria);

/* ===========================
   LISTAR (SOLO ACTIVAS)
=========================== */
export const listarCategoriaVigente = async () => {
  return await repository.find({
    where: { estado: "A" },
    order: { idCategoria: "ASC" }
  });
};

/* ===========================
   LISTAR TODAS (BACKOFFICE)
=========================== */
export const listarCategorias = async () => {
  return await repository.find({
    order: { idCategoria: "ASC" }
  });
};

/* ===========================
   CREAR
=========================== */
export const crearCategoria = async (data: any) => {
  const categoria = repository.create({
    nombre: data.nombre,
    descripcion: data.descripcion,
    tipo: data.tipo,
    estado: "A"
  });

  return await repository.save(categoria);
};

/* ===========================
   ACTUALIZAR
=========================== */
export const actualizarCategoria = async (id: number, data: any) => {
  await repository.update(id, {
    nombre: data.nombre,
    descripcion: data.descripcion,
    tipo: data.tipo
  });
};

/* ===========================
   ELIMINAR (FÍSICO)
=========================== */
export const eliminarCategoria = async (id: number) => {
  await repository.delete(id);
};

/* ===========================
   OPCIONAL: ELIMINAR LÓGICO
=========================== */
export const desactivarCategoria = async (id: number) => {
  await repository.update(id, { estado: "I" });
};
