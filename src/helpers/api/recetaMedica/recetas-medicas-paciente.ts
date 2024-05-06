import api from "../../libs/axios";

// PETICIONES DE LAS RECETAS MEDICAS DE LOS PACIENTES

// Obtener todas las recetas medicas de los pacientes
export const getRecetasMedicasPaciente = async () => {
  try {
    const recetasMedicasPaciente = await api.get("/recetas-medicas-paciente");
    return recetasMedicasPaciente.data;
  } catch (error) {
    console.error("Error al obtener las recetas medicas del paciente: ", error);
  }
};

// Obtener receta medica del paciente
export const getRecetaMedicaPaciente = async (id: string) => {
  try {
    const recetaMedicaPaciente = await api.get(
      `/recetas-medicas-paciente/${id}`,
    );
    return recetaMedicaPaciente.data;
  } catch (error) {
    console.error("Error al obtener la receta medica del paciente: ", error);
  }
};

// Crear receta medica del paciente
export const createRecetaMedicaPaciente = async (req: unknown) => {
  try {
    const recetaMedicaPaciente = await api.post(
      `/recetas-medicas-paciente`,
      req,
    );
    return recetaMedicaPaciente.data;
  } catch (error) {
    console.error("Error al crear la receta medica del paciente: ", error);
  }
};

// Actualizar receta medica del paciente
export const updateRecetaMedicaPaciente = async (id: string, req: unknown) => {
  try {
    const recetaMedicaPaciente = await api.patch(
      `/recetas-medicas-paciente/${id}`,
      req,
    );
    return recetaMedicaPaciente.data;
  } catch (error) {
    console.error("Error al actualizar la receta medica del paciente: ", error);
  }
};

// Eliminar receta medica del paciente
export const deleteRecetaMedicaPaciente = async (id: string) => {
  try {
    const recetaMedicaPaciente = await api.delete(
      `/recetas-medicas-paciente/${id}`,
    );
    return recetaMedicaPaciente.data;
  } catch (error) {
    console.error("Error al eliminar la receta medica del paciente: ", error);
  }
};
