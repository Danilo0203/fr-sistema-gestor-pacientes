import api from "../../libs/axios";
import { toast } from "sonner";

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

    toast.success(
      `Género: ${genero.data.data.nombre}, registrado correctamente`,
    );
    return genero.data;
  } catch (error: any) {
    if (error.response.data?.errors) {
      if (error.response.data.errors?.nombre)
        toast.warning(error.response.data.errors.nombre[0]);
    } else {
      toast.error("Error al crear el genero");
    }
  }
};

// Actualizar genero
export const updateGenero = async (id: string, req: unknown) => {
  try {
    const dataGenero = await api.get(`/generos/${id}`);
    const [generos] = [dataGenero.data.data].map((genero) => ({
      id: genero.id,
      nombre: genero.nombre,
    }));

    // Crear objeto con solo los datos que cambiaron
    const cambios = {};
    Object.keys(req).forEach((key) => {
      if (req[key] != generos[key]) {
        cambios[key] = req[key];
      }
    });

    // Verificar si hay cambios
    if (Object.keys(cambios).length === 0) {
      toast.info("No se realizaron cambios");
      return;
    }

    const genero = await api.patch(`/generos/${id}`, cambios);

    toast.success(
      `Género: ${genero.data.data.nombre}, actualizado correctamente`,
    );
    return genero.data;
  } catch (error: any) {
    if (error.response.data?.errors) {
      if (error.response.data.errors?.nombre)
        toast.warning(error.response.data.errors.nombre[0]);
    } else {
      toast.error("Error al actualizar el genero");
    }
  }
};

// Eliminar genero
export const deleteGenero = async (id: string) => {
  try {
    const genero = await api.delete(`/generos/${id}`);

    toast.success(genero.data.message);
    return genero.data;
  } catch (error: any) {
    if (error.response?.data?.error)
      toast.warning(
        "No se puede eliminar el género, verifique que no tenga pacientes asociados",
      );
    else toast.error("Error al eliminar el género");
  }
};
