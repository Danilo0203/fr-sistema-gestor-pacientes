import api from "../../libs/axios";

// PETICIONES DE LOS ESTADOS CIVILES

// Obtener todos los estados civiles
export const getEstadosCiviles = async () => {
  try {
    const estadosCiviles = await api.get("/estado-civil");
    return estadosCiviles.data;
  } catch (error) {
    console.error("Error al obtener los estados civiles: ", error);
  }
};

// Obtener estado civil
export const getEstadoCivil = async (id: string) => {
  try {
    const estadoCivil = await api.get(`/estado-civil/${id}`);
    return estadoCivil.data;
  } catch (error) {
    console.error("Error al obtener el estado civil: ", error);
  }
};

// Crear estado civil
export const createEstadoCivil = async (req: unknown) => {
  try {
    const estadoCivil = await api.post(`/estado-civil`, req);
    return estadoCivil.data;
  } catch (error) {
    console.error("Error al crear el estado civil: ", error);
  }
};

// Actualizar estado civil
export const updateEstadoCivil = async (id: string, req: unknown) => {
  try {
    const estadoCivil = await api.patch(`/estado-civil/${id}`, req);
    return estadoCivil.data;
  } catch (error) {
    console.error("Error al actualizar el estado civil: ", error);
  }
};

// Eliminar estado civil
export const deleteEstadoCivil = async (id: string) => {
  try {
    const estadoCivil = await api.delete(`/estado-civil/${id}`);
    return estadoCivil.data;
  } catch (error) {
    console.error("Error al eliminar el estado civil: ", error);
  }
};
