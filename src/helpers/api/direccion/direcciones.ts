import api from "../../libs/axios";

// PETICIONES DE LAS DIRECCIONES

// Obtener todas las direcciones
export const getDirecciones = async () => {
  try {
    const direcciones = await api.get("/direcciones");
    return direcciones.data;
  } catch (error) {
    console.error("Error al obtener las direcciones: ", error);
  }
};

// Obtener direccion
export const getDireccion = async (id: string) => {
  try {
    const direccion = await api.get(`/direcciones/${id}`);
    return direccion.data;
  } catch (error) {
    console.error("Error al obtener la direccion: ", error);
  }
};

// Crear direccion
export const createDireccion = async (req: unknown) => {
  try {
    const direccion = await api.post(`/direcciones`, req);
    return direccion.data;
  } catch (error) {
    console.error("Error al crear la direccion: ", error);
  }
};

// Actualizar direccion
export const updateDireccion = async (id: string, req: unknown) => {
  try {
    const direccion = await api.patch(`/direcciones/${id}`, req);
    return direccion.data;
  } catch (error) {
    console.error("Error al actualizar la direccion: ", error);
  }
};

// Eliminar direccion
export const deleteDireccion = async (id: string) => {
  try {
    const direccion = await api.delete(`/direcciones/${id}`);
    return direccion.data;
  } catch (error) {
    console.error("Error al eliminar la direccion: ", error);
  }
};
