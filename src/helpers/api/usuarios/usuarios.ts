import { toast } from "sonner";
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
    const [usuarioData] = [usuarioDatos.data.data].map((usuarios: any) => {
      return {
        id: usuarios.id,
        usuario: usuarios.usuario,
        nombre: usuarios.nombre,
        email: usuarios.email,
        rol_id: usuarios.rol.id,
      };
    });

    // Crear objeto con solo los datos que cambiaron si password es null no se envia
    const cambios = {};
    Object.keys(req).forEach((key) => {
      if (req[key] != usuarioData[key] && req[key] !== "") {
        cambios[key] = req[key];
      }
    });

    // Verificar si hay cambios antes de hacer la llamada a la API
    if (Object.keys(cambios).length === 0) {
      toast.info("No se realizaron cambios");
      return;
    }

    const usuario = await api.patch(`/usuarios/${id}`, cambios);

    toast.success(
      `Usuario: ${usuario.data.data.usuario}, actualizado correctamente`,
    );
    return usuario.data;
  } catch (error: any) {
    if (error.response.data?.errors) {
      if (error.response.data.errors?.usuario)
        toast.warning(error.response.data.errors.usuario[0]);

      if (error.response.data.errors?.nombre)
        toast.warning(error.response.data.errors.nombre[0]);

      if (error.response.data.errors?.email)
        toast.warning(error.response.data.errors.email[0]);

      if (error.response.data.errors?.password)
        toast.warning(error.response.data.errors.password[0]);

      if (error.response.data.errors?.rol_id)
        toast.warning(error.response.data.errors.rol_id[0]);
    } else {
      toast.error("Error al actualizar el usuario");
    }
  }
};

// Eliminar usuario
export const deleteUsuario = async (id: string) => {
  try {
    const usuario = await api.delete(`/usuarios/${id}`);
    toast.success(usuario.data.message);
    return usuario.data;
  } catch (error: any) {
    if (error.response?.data?.error)
      toast.warning(
        "No se puede eliminar el usuario, tiene registros asociados",
      );
    else toast.error("Error al eliminar el usuario");
  }
};
