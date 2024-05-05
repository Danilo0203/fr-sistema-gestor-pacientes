import api from "../../libs/axios";

// PETICIONES DE LOS GENEROS

// Obtener todos los generos
export const getGeneros = async () => {
  try {
    const generos = await api.get("/generos");
    return generos.data;
  } catch (error) {
    console.error("Error al obtener los generos: ", error);
  }
};

// Obtener genero
export const getGenero = async (id: string) => {
  try {
    const genero = await api.get(`/generos/${id}`);
    return genero.data;
  } catch (error) {
    console.error("Error al obtener el genero: ", error);
  }
};

// Crear genero
export const createGenero = async (req: unknown) => {
  try {
    const genero = await api.post(`/generos`, req);
    return genero.data;
  } catch (error) {
    console.error("Error al crear el genero: ", error);
  }
};

// Actualizar genero
export const updateGenero = async (id: string, req: unknown) => {
  try {
    const genero = await api.patch(`/generos/${id}`, req);
    return genero.data;
  } catch (error) {
    console.error("Error al actualizar el genero: ", error);
  }
};

// Eliminar genero
export const deleteGenero = async (id: string) => {
  try {
    const genero = await api.delete(`/generos/${id}`);
    return genero.data;
  } catch (error) {
    console.error("Error al eliminar el genero: ", error);
  }
};
