import api from "../../libs/axios";

// PETICIONES DE LAS RECETAS MEDICAS

// Obtener todas las recetas medicas
export const getRecetasMedicas = async () => {
  try {
    const recetasMedicas = await api.get("/recetas-medicas");
    return recetasMedicas.data;
  } catch (error) {
    console.error("Error al obtener las recetas medicas: ", error);
  }
};

// Obtener receta medica
export const getRecetaMedica = async (id: string) => {
  try {
    const recetaMedica = await api.get(`/recetas-medicas/${id}`);
    return recetaMedica.data;
  } catch (error) {
    console.error("Error al obtener la receta medica: ", error);
  }
};

// Crear receta medica
export const createRecetaMedica = async (req: unknown) => {
  try {
    const recetaMedica = await api.post(`/recetas-medicas`, req);
    return recetaMedica.data;
  } catch (error) {
    console.error("Error al crear la receta medica: ", error);
  }
};

// Actualizar receta medica
export const updateRecetaMedica = async (id: string, req: unknown) => {
  try {
    const recetaMedica = await api.patch(`/recetas-medicas/${id}`, req);
    return recetaMedica.data;
  } catch (error) {
    console.error("Error al actualizar la receta medica: ", error);
  }
};

// Eliminar receta medica
export const deleteRecetaMedica = async (id: string) => {
  try {
    const recetaMedica = await api.delete(`/recetas-medicas/${id}`);
    return recetaMedica.data;
  } catch (error) {
    console.error("Error al eliminar la receta medica: ", error);
  }
};
