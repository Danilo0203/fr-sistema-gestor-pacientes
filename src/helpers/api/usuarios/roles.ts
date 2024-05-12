import api from "../../libs/axios";

// PETICIONES DE LOS ROLES

// Obtener todos los roles
export const getRoles = async () => {
  try {
    const roles = await api.get("/roles");
    return roles.data;
  } catch (error) {
    console.error("Error al obtener los roles: ", error);
  }
};

// Obtener rol
export const getRol = async (id: string) => {
  try {
    const rol = await api.get(`/roles/${id}`);
    return rol.data;
  } catch (error) {
    console.error("Error al obtener el rol: ", error);
  }
};

// Crear rol
export const createRol = async (req: unknown) => {
  try {
    const rol = await api.post(`/roles`, req);
    return rol.data;
  } catch (error) {
    console.error("Error al crear el rol: ", error);
  }
};

// Actualizar rol
export const updateRol = async (id, req) => {
  try {
    const rol = await api.get(`/roles/${id}`, req);
    const rolData = rol.data.data; // Asumiendo que los datos vienen en esta estructura

    // Crear objeto con solo los datos que cambiaron
    const cambios = {};
    Object.keys(req).forEach((key) => {
      if (req[key] !== rolData[key]) {
        cambios[key] = req[key];
      }
    });

    // Verificar si hay cambios antes de hacer la llamada a la API
    if (Object.keys(cambios).length > 0) {
      const rolActualizado = await api.patch(`/roles/${id}`, cambios);
      return rolActualizado.data.data;
    } else {
      return rolData; // o manejar según sea necesario
    }
  } catch (error) {
    console.error("Error al actualizar el rol: ", error);
  }
};

// Eliminar rol
export const deleteRol = async (id: string) => {
  try {
    const rol = await api.delete(`/roles/${id}`);
    return rol.data;
  } catch (error) {
    console.error("Error al eliminar el rol: ", error);
  }
};
