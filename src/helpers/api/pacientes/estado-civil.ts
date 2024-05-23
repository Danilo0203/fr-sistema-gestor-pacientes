import api from "../../libs/axios";
import { toast } from "sonner";

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

    toast.success(
      `Estado civil: ${estadoCivil.data.data.nombre}, registrado correctamente`,
    );
    return estadoCivil.data;
  } catch (error: any) {
    if (error.response.data?.errors) {
      if (error.response.data.errors?.nombre)
        toast.warning(error.response.data.errors.nombre[0]);
    } else {
      toast.error("Error al crear el estado civil");
    }
  }
};

// Actualizar estado civil
export const updateEstadoCivil = async (id: string, req: unknown) => {
  try {
    const dataEstadoCivil = await api.get(`/estado-civil/${id}`);
    const [estadosCiviles] = [dataEstadoCivil.data.data].map((estadoCivil) => ({
      id: estadoCivil.id,
      nombre: estadoCivil.nombre,
    }));

    // Crear objeto con solo los datos que cambiaron
    const cambios = {};
    Object.keys(req).forEach((key) => {
      if (req[key] != estadosCiviles[key]) {
        cambios[key] = req[key];
      }
    });

    // Verificar si hay cambios
    if (Object.keys(cambios).length === 0) {
      toast.info("No se realizaron cambios");
      return;
    }

    const estadoCivil = await api.patch(`/estado-civil/${id}`, cambios);

    toast.success(
      `Estado civil: ${estadoCivil.data.data.nombre}, actualizado correctamente`,
    );
    return estadoCivil.data;
  } catch (error: any) {
    if (error.response.data?.errors) {
      if (error.response.data.errors?.nombre)
        toast.warning(error.response.data.errors.nombre[0]);
    } else {
      toast.error("Error al actualizar el estado civil");
    }
  }
};

// Eliminar estado civil
export const deleteEstadoCivil = async (id: string) => {
  try {
    const estadoCivil = await api.delete(`/estado-civil/${id}`);

    toast.success(estadoCivil.data.message);
    return estadoCivil.data;
  } catch (error: any) {
    if (error.response?.data?.error)
      toast.warning(
        "No se puede eliminar el estado civil, verifique que no tenga pacientes asociados",
      );
    else toast.error("Error al eliminar el estado civil");
  }
};
