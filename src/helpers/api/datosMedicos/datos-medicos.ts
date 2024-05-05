import api from "../../libs/axios";

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
    return datoMedico.data;
  } catch (error) {
    console.error("Error al crear el dato medico: ", error);
  }
};

// Actualizar dato medico
export const updateDatoMedico = async (id: string, req: unknown) => {
  try {
    const datoMedico = await api.patch(`/datos-medicos/${id}`, req);
    return datoMedico.data;
  } catch (error) {
    console.error("Error al actualizar el dato medico: ", error);
  }
};

// Eliminar dato medico
export const deleteDatoMedico = async (id: string) => {
  try {
    const datoMedico = await api.delete(`/datos-medicos/${id}`);
    return datoMedico.data;
  } catch (error) {
    console.error("Error al eliminar el dato medico: ", error);
  }
};
