import api from "../../libs/axios";

// PETICIONES DE LAS PROFESIONES

// Obtener todas las profesiones
export const getProfesiones = async () => {
  try {
    const profesiones = await api.get("/profesiones");
    return profesiones.data;
  } catch (error) {
    console.error("Error al obtener las profesiones: ", error);
  }
};

// Obtener profesion
export const getProfesion = async (id: string) => {
  try {
    const profesion = await api.get(`/profesiones/${id}`);
    return profesion.data;
  } catch (error) {
    console.error("Error al obtener la profesion: ", error);
  }
};

// Crear profesion
export const createProfesion = async (req: unknown) => {
  try {
    const profesion = await api.post(`/profesiones`, req);
    return profesion.data;
  } catch (error) {
    console.error("Error al crear la profesion: ", error);
  }
};

// Actualizar profesion
export const updateProfesion = async (id: string, req: unknown) => {
  try {
    const profesion = await api.patch(`/profesiones/${id}`, req);
    return profesion.data;
  } catch (error) {
    console.error("Error al actualizar la profesion: ", error);
  }
};

// Eliminar profesion
export const deleteProfesion = async (id: string) => {
  try {
    const profesion = await api.delete(`/profesiones/${id}`);
    return profesion.data;
  } catch (error) {
    console.error("Error al eliminar la profesion: ", error);
  }
};
