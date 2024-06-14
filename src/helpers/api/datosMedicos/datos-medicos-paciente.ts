import api from "../../libs/axios";

// PETICIONES DE LOS DATOS MEDICOS

// Obtener todos los datos medicos del paciente
export const getDatosMedicosPaciente = async () => {
  try {
    const datosMedicos = await api.get("/datos-medicos-paciente");
    return datosMedicos.data;
  } catch (error) {
    console.error("Error al obtener los datos medicos del paciente: ", error);
  }
};

// Obtener dato medico del paciente
export const getDatoMedicoPaciente = async (id: string) => {
  try {
    const datoMedico = await api.get(`/datos-medicos-paciente/${id}`);
    return datoMedico.data;
  } catch (error) {
    console.error("Error al obtener el dato medico del paciente: ", error);
  }
};

// Crear dato medico del paciente
export const createDatoMedicoPaciente = async (req: unknown) => {
  try {
    const datoMedico = await api.post(`/datos-medicos-paciente`, req);
    return datoMedico.data;
  } catch (error) {
    console.error("Error al crear el dato medico del paciente: ", error);
  }
};

// Actualizar dato medico del paciente
export const updateDatoMedicoPaciente = async (id: number, req: unknown) => {
  try {
    const datoMedico = await api.patch(`/datos-medicos-paciente/${id}`, req);
    return datoMedico.data;
  } catch (error) {
    console.error("Error al actualizar el dato medico del paciente: ", error);
  }
};

// Eliminar dato medico del paciente
export const deleteDatoMedicoPaciente = async (id: string) => {
  try {
    const datoMedico = await api.delete(`/datos-medicos-paciente/${id}`);
    return datoMedico.data;
  } catch (error) {
    console.error("Error al eliminar el dato medico del paciente: ", error);
  }
};
