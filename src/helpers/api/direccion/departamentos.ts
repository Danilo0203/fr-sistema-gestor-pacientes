import api from "../../libs/axios";

// PETICIONES DE LOS DEPARTAMENTOS

// Obtener todos los departamentos
export const getDepartamentos = async () => {
  try {
    const departamentos = await api.get("/departamentos");
    return departamentos.data;
  } catch (error) {
    console.error("Error al obtener los departamentos: ", error);
  }
};

// Obtener departamento
export const getDepartamento = async (id: string) => {
  try {
    const departamento = await api.get(`/departamentos/${id}`);
    return departamento.data;
  } catch (error) {
    console.error("Error al obtener el departamento: ", error);
  }
};

// Crear departamento
export const createDepartamento = async (req: unknown) => {
  try {
    const departamento = await api.post(`/departamentos`, req);
    return departamento.data;
  } catch (error) {
    console.error("Error al crear el departamento: ", error);
  }
};

// Actualizar departamento
export const updateDepartamento = async (id: string, req: unknown) => {
  try {
    const departamento = await api.patch(`/departamentos/${id}`, req);
    return departamento.data;
  } catch (error) {
    console.error("Error al actualizar el departamento: ", error);
  }
};

// Eliminar departamento
export const deleteDepartamento = async (id: string) => {
  try {
    const departamento = await api.delete(`/departamentos/${id}`);
    return departamento.data;
  } catch (error) {
    console.error("Error al eliminar el departamento: ", error);
  }
};
