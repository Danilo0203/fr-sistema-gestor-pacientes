import api from "../../libs/axios";
import { toast } from "sonner";

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

    toast.success(
      `Municipio: ${municipio.data.data.nombre}, registrado correctamente`,
    );
    return municipio.data;
  } catch (error: any) {
    if (error.response.data?.errors) {
      if (error.response.data.errors?.nombre)
        toast.warning(error.response.data.errors.nombre[0]);

      if (error.response.data.errors?.departamento_id)
        toast.warning(error.response.data.errors.departamento_id[0]);
    } else {
      toast.error("Error al crear el municipio");
    }
  }
};

// Actualizar municipio
export const updateMunicipio = async (id: string, req: unknown) => {
  try {
    const municipio = await api.patch(`/municipios/${id}`, req);

    toast.success(
      `Municipio: ${municipio.data.data.nombre}, actualizado correctamente`,
    );
    return municipio.data;
  } catch (error: any) {
    if (error.response.data?.errors) {
      if (error.response.data.errors?.nombre)
        toast.warning(error.response.data.errors.nombre[0]);

      if (error.response.data.errors?.departamento_id)
        toast.warning(error.response.data.errors.departamento_id[0]);
    } else {
      toast.error("Error al actualizar el municipio");
    }
  }
};

// Eliminar municipio
export const deleteMunicipio = async (id: string) => {
  try {
    const municipio = await api.delete(`/municipios/${id}`);

    toast.success(
      `Municipio: ${municipio.data.data.nombre}, eliminado correctamente`,
    );
    return municipio.data;
  } catch (error: any) {
    if (error.response.data?.error)
      toast.warning(
        "No se puede eliminar el municipio, verifique que no tenga direcciones asociadas",
      );
    else toast.error("Error al eliminar el municipio");
  }
};
