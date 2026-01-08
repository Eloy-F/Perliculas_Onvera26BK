import AppDataSource from "../config/datasource";
import { Usuario } from "../entities/usuario";
import bcrypt from "bcryptjs";
import { AuthUsuario } from "../interfaces/auth.interface";

const repository = AppDataSource.getRepository(Usuario);
type UsuarioRolRow = {
  id_usuario: number;
  nombres: string;
  apellidos: string;
  correo: string;
  password: string;
  estado: string;
  rol: string | null;
};

export const verificarUsuario = async (
  data: { correo: string; password: string }
): Promise<AuthUsuario | null> => {

  const result = await AppDataSource.query<UsuarioRolRow[]>(`
    SELECT u.id_usuario,u.nombres,u.apellidos,u.correo, u.password,u.estado,r.nombre AS rol
    FROM usuarios u
    LEFT JOIN usuario_roles ur ON u.id_usuario = ur.id_usuario
    LEFT JOIN roles r ON ur.id_rol = r.id_rol
    WHERE u.correo = $1 AND u.estado = 'A'
  `, [data.correo]);

  if (result.length === 0) return null;

  const passwordOk = await bcrypt.compare(
    data.password,
    result[0].password
  );

  if (!passwordOk) return null;

  return {
    idUsuario: result[0].id_usuario,
    nombres: result[0].nombres,
    apellidos: result[0].apellidos,
    correo: result[0].correo,
    estado: result[0].estado,
    roles: [...new Set(
      result
        .filter(r => r.rol !== null)
        .map(r => r.rol!)
    )]
  };
};

export const listarUsuarios = async () => {
    return await AppDataSource.query(`SELECT id_usuario, nombres, apellidos, correo, estado
    FROM usuarios`);
};

//actualizar estado
export const actualizarUsuario = async (id: number, data: any) => {
  await AppDataSource.query(`UPDATE usuarios SET
      nombres = $1,apellidos = $2,correo = $3, celular = $4
    WHERE id_usuario = $5`, 
    [
    data.nombres,
    data.apellidos,
    data.correo,
    data.celular,
    id
  ]);
};

//cambiar estado
export const cambiarEstadoUsuario = async (id: number) => {
    await AppDataSource.query(`UPDATE usuarios SET estado = CASE  
    WHEN estado = 'A' THEN 'I'
      ELSE 'A'
    END WHERE id_usuario = $1`,
        [id]
    );
};

export const crearUsuario = async (data: Partial<Usuario>) => {
  const hashPassword = await bcrypt.hash(data.password, 10);

  const usuario = repository.create({
    nombres: data.nombres,
    apellidos: data.apellidos,
    correo: data.correo,
    password: hashPassword,
    celular: data.celular,
    estado: "A"
  });

  return await repository.save(usuario);
};


////registro de usuario 
export const registrarUsuario = async (data: {
  nombres: string;
  apellidos: string;
  correo: string;
  password: string;
  celular?: string;
}) => {

  // Validar correo duplicado
  const existe = await AppDataSource.query(
    `SELECT 1 FROM usuarios WHERE correo = $1`,
    [data.correo]
  );

  if (existe.length > 0) {
    throw new Error("Correo ya registrado");
  }

  // Crear usuario (reutiliza tu lógica)
  const usuario = await crearUsuario(data);

  // Crear perfil
  await AppDataSource.query(
    `INSERT INTO perfiles
     (id_usuario, nombre, tipo, estado)
     VALUES ($1, $2, 'NORMAL', 'A')`,
    [usuario.idUsuario, usuario.nombres]
  );

  // Asignar rol USER (si existe)
  const rol = await AppDataSource.query(
    `SELECT id_rol FROM roles WHERE nombre = 'USER'`
  );

  if (rol.length > 0) {
    await AppDataSource.query(
      `INSERT INTO usuario_roles (id_usuario, id_rol)
       VALUES ($1, $2)`,
      [usuario.idUsuario, rol[0].id_rol]
    );
  }

  return true;
};