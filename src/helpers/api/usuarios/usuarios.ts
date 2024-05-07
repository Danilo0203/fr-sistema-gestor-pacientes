import api from "../../libs/axios";

// PETICIONES DE USUARIOS

// Obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const usuarios = await api.get("/usuarios");

    const usuariosData = usuarios.data.data.map((usuarios: any) => {
      return {
        id: usuarios.id,
        usuario: usuarios.usuario,
        nombre: usuarios.nombre,
        email: usuarios.email,
        rol: usuarios.rol.nombre,
      };
    });
    return usuariosData;
  } catch (error) {
    console.error("Error al obtener los usuarios: ", error);
  }
};

// Obtener usuario
export const getUsuario = async (id: string) => {
  try {
    const usuario = await api.get(`/usuarios/${id}`);

    return usuario.data.data;
  } catch (error) {
    console.error("Error al obtener el usuario: ", error);
  }
};

// Actualizar usuario
export const updateUsuario = async (id: string, req: unknown) => {
  try {
    const usuario = await api.patch(`/usuarios/${id}`, req);
    return usuario.data;
  } catch (error) {
    console.error("Error al actualizar el usuario: ", error);
  }
};

// Eliminar usuario
export const deleteUsuario = async (id: string) => {
  try {
    const usuario = await api.delete(`/usuarios/${id}`);
    return usuario.data;
  } catch (error) {
    console.error("Error al eliminar el usuario: ", error);
  }
};
