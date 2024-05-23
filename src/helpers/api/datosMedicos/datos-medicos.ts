import api from "../../libs/axios";
import { toast } from "sonner";

// PETICIONES DE LOS DATOS MEDICOS

// Obtener todos los datos medicos
export const getDatosMedicos = async () => {
  try {
    const datosMedicos = await api.get("/datos-medicos");
    return datosMedicos.data;
  } catch (error) {
    console.error("Error al obtener los datos medicos: ", error);
  }
};

// Obtener dato medico
export const getDatoMedico = async (id: string) => {
  try {
    const datoMedico = await api.get(`/datos-medicos/${id}`);
    return datoMedico.data;
  } catch (error) {
    console.error("Error al obtener el dato medico: ", error);
  }
};

// Crear dato medico
export const createDatoMedico = async (req: unknown) => {
  try {
    const datoMedico = await api.post(`/datos-medicos`, req);

    toast.success(
      `Dato médico: ${datoMedico.data.data.nombre}, registrado correctamente`,
    );
    return datoMedico.data;
  } catch (error: any) {
    if (error.response.data?.errors) {
      if (error.response.data.errors?.nombre)
        toast.warning(error.response.data.errors.nombre[0]);
    } else {
      toast.error("Error al crear el dato médico");
    }
  }
};

// Actualizar dato medico
export const updateDatoMedico = async (id: string, req: unknown) => {
  try {
    const dataDatoMedico = await api.get(`/datos-medicos/${id}`);
    const [datosMedicos] = [dataDatoMedico.data.data].map((datoMedico) => ({
      id: datoMedico.id,
      nombre: datoMedico.nombre,
    }));

    // Crear objeto con solo los datos que cambiaron
    const cambios = {};
    Object.keys(req).forEach((key) => {
      if (req[key] != datosMedicos[key]) {
        cambios[key] = req[key];
      }
    });

    // Verificar si hay cambios
    if (Object.keys(cambios).length === 0) {
      toast.info("No se realizaron cambios");
      return;
    }

    const datoMedico = await api.patch(`/datos-medicos/${id}`, cambios);

    toast.success(
      `Dato médico: ${datoMedico.data.data.nombre}, actualizado correctamente`,
    );
    return datoMedico.data;
  } catch (error: any) {
    if (error.response.data?.errors) {
      if (error.response.data.errors?.nombre)
        toast.warning(error.response.data.errors.nombre[0]);
    } else {
      toast.error("Error al actualizar el dato médico");
    }
  }
};

// Eliminar dato medico
export const deleteDatoMedico = async (id: string) => {
  try {
    const datoMedico = await api.delete(`/datos-medicos/${id}`);

    toast.success(datoMedico.data.message);
    return datoMedico.data;
  } catch (error: any) {
    if (error.response?.data?.error)
      toast.warning(
        "No se puede eliminar este dato médico, contiene información importante",
      );
    else toast.error("Error al eliminar el dato médico");
  }
};
