import api from "../../libs/axios";
import { toast } from "sonner";

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

    toast.success(
      `Dirección: ${direccion.data.data.nombre}, registrada correctamente`,
    );
    return direccion.data;
  } catch (error: any) {
    if (error.response.data?.errors) {
      if (error.response.data.errors?.nombre)
        toast.warning(error.response.data.errors.nombre[0]);

      if (error.response.data.errors?.municipio_id)
        toast.warning(error.response.data.errors.municipio_id[0]);
    } else {
      toast.error("Error al crear la dirección");
    }
  }
};

// Actualizar direccion
export const updateDireccion = async (id: string, req: unknown) => {
  try {
    const dataDirecciones = await api.get(`/direcciones/${id}`);
    const [direcciones] = [dataDirecciones.data.data].map((direccion) => ({
      id: direccion.id,
      nombre: direccion.nombre,
      municipio_id: direccion.municipio.id,
    }));

    // Crear objeto con solo los datos que cambiaron
    const cambios = {};
    Object.keys(req).forEach((key) => {
      if (req[key] != direcciones[key]) {
        cambios[key] = req[key];
      }
    });

    // Verificar si hay cambios
    if (Object.keys(cambios).length === 0) {
      toast.info("No se realizaron cambios");
      return;
    }

    const direccion = await api.patch(`/direcciones/${id}`, cambios);
    toast.success(
      `Dirección: ${direccion.data.data.nombre}, actualizada correctamente`,
    );
    return direccion.data.data;
  } catch (error: any) {
    if (error.response.data?.errors) {
      if (error.response.data.errors?.nombre)
        toast.warning(error.response.data.errors.nombre[0]);

      if (error.response.data.errors?.municipio_id)
        toast.warning(error.response.data.errors.municipio_id[0]);
    } else {
      toast.error("Error al actualizar la dirección");
    }
  }
};

// Eliminar direccion
export const deleteDireccion = async (id: string) => {
  try {
    const direccion = await api.delete(`/direcciones/${id}`);

    toast.success(direccion.data.message);
    return direccion.data;
  } catch (error: any) {
    if (error.response?.data?.error)
      toast.warning(
        "No se puede eliminar la dirección, verifique que no tenga pacientes asociados",
      );
    else toast.error("Error al eliminar la dirección");
  }
};
