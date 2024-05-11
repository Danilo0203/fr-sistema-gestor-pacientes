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

    return usuario.data;
  } catch (error) {
    console.error("Error al obtener el usuario: ", error);
  }
};

// Actualizar usuario
export const updateUsuario = async (id, req) => {
  try {
      const usuarioDatos = await api.get(`/usuarios/${id}`);
      const usuarioData = usuarioDatos.data.data;  // Asumiendo que los datos vienen en esta estructura

      // Crear objeto con solo los datos que cambiaron
      const cambios = {};
      Object.keys(req).forEach(key => {
          if (req[key] !== usuarioData[key]) {
              cambios[key] = req[key];
          }
      });

      // Verificar si hay cambios antes de hacer la llamada a la API
      if (Object.keys(cambios).length > 0) {
          const usuarioActualizado = await api.patch(`/usuarios/${id}`, cambios);
          return usuarioActualizado.data.data;
      } else {
          return usuarioData;  // o manejar según sea necesario
      }
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
