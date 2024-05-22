import api from "../../libs/axios";
import { toast } from "sonner";

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

    toast.success(
      `Profesión: ${profesion.data.data.nombre}, registrado correctamente`,
    );
    return profesion.data;
  } catch (error: any) {
    if (error.response.data?.errors) {
      if (error.response.data.errors?.nombre)
        toast.warning(error.response.data.errors.nombre[0]);
    } else {
      toast.error("Error al crear la profesión");
    }
  }
};

// Actualizar profesion
export const updateProfesion = async (id: string, req: unknown) => {
  try {
    const profesion = await api.patch(`/profesiones/${id}`, req);

    toast.success(
      `Profesión: ${profesion.data.data.nombre}, actualizado correctamente`,
    );
    return profesion.data;
  } catch (error: any) {
    if (error.response.data?.errors) {
      if (error.response.data.errors?.nombre)
        toast.warning(error.response.data.errors.nombre[0]);
    } else {
      toast.error("Error al actualizar la profesión");
    }
  }
};

// Eliminar profesion
export const deleteProfesion = async (id: string) => {
  try {
    const profesion = await api.delete(`/profesiones/${id}`);

    toast.success(
      `Profesión: ${profesion.data.data.nombre}, eliminado correctamente`,
    );
    return profesion.data;
  } catch (error: any) {
    if (error.response.data?.error)
      toast.warning(
        "No se puede eliminar la profesión, verifique que no tenga pacientes asociados",
      );
    else toast.error("Error al eliminar la profesión");
  }
};
