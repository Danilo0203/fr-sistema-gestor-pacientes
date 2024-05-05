import api from "../../libs/axios";

// PETICIONES DE LOS PACIENTES

// Obtener todos los pacientes
export const getPacientes = async () => {
  try {
    const pacientes = await api.get("/pacientes");
    return pacientes.data;
  } catch (error) {
    console.error("Error al obtener los pacientes: ", error);
  }
};

// Obtener paciente
export const getPaciente = async (id: string) => {
  try {
    const paciente = await api.get(`/pacientes/${id}`);
    return paciente.data;
  } catch (error) {
    console.error("Error al obtener el paciente: ", error);
  }
};

// Crear paciente
export const createPaciente = async (req: unknown) => {
  try {
    const paciente = await api.post(`/pacientes`, req);
    return paciente.data;
  } catch (error) {
    console.error("Error al crear el paciente: ", error);
  }
};

// Actualizar paciente
export const updatePaciente = async (id: string, req: unknown) => {
  try {
    const paciente = await api.patch(`/pacientes/${id}`, req);
    return paciente.data;
  } catch (error) {
    console.error("Error al actualizar el paciente: ", error);
  }
};

// Eliminar paciente
export const deletePaciente = async (id: string) => {
  try {
    const paciente = await api.delete(`/pacientes/${id}`);
    return paciente.data;
  } catch (error) {
    console.error("Error al eliminar el paciente: ", error);
  }
};

// Cita del paciente
export const getCitasPaciente = async (id: string) => {
  try {
    const citasPaciente = await api.get(`/cita/paciente/${id}`);
    return citasPaciente.data;
  } catch (error) {
    console.error("Error al cambiar la cita del paciente: ", error);
  }
};
