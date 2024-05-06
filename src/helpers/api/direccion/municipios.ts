import api from "../../libs/axios";

// PETICIONES DE LOS MUNICIPIOS

// Obtener todos los municipios
export const getMunicipios = async () => {
  try {
    const municipios = await api.get("/municipios");
    return municipios.data;
  } catch (error) {
    console.error("Error al obtener los municipios: ", error);
  }
};

// Obtener municipio
export const getMunicipio = async (id: string) => {
  try {
    const municipio = await api.get(`/municipios/${id}`);
    return municipio.data;
  } catch (error) {
    console.error("Error al obtener el municipio: ", error);
  }
};

// Crear municipio
export const createMunicipio = async (req: unknown) => {
  try {
    const municipio = await api.post(`/municipios`, req);
    return municipio.data;
  } catch (error) {
    console.error("Error al crear el municipio: ", error);
  }
};

// Actualizar municipio
export const updateMunicipio = async (id: string, req: unknown) => {
  try {
    const municipio = await api.patch(`/municipios/${id}`, req);
    return municipio.data;
  } catch (error) {
    console.error("Error al actualizar el municipio: ", error);
  }
};

// Eliminar municipio
export const deleteMunicipio = async (id: string) => {
  try {
    const municipio = await api.delete(`/municipios/${id}`);
    return municipio.data;
  } catch (error) {
    console.error("Error al eliminar el municipio: ", error);
  }
};
