import api from "../../libs/axios";
import { toast } from "sonner";

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

    toast.success(
      `Paciente: ${paciente.data.data.nombre}, registrado correctamente`,
    );
    return paciente.data;
  } catch (error: any) {
    if (error.response.data?.errors) {
      if (error.response.data.errors?.nombre)
        toast.warning(error.response.data.errors.nombre[0]);

      if (error.response.data.errors?.apellido)
        toast.warning(error.response.data.errors.apellido[0]);

      if (error.response.data.errors?.fecha_nacimiento)
        toast.warning(error.response.data.errors.fecha_nacimiento[0]);

      if (error.response.data.errors?.genero_id)
        toast.warning(error.response.data.errors.genero_id[0]);

      if (error.response.data.errors?.estado_civil_id)
        toast.warning(error.response.data.errors.estado_civil_id[0]);

      if (error.response.data.errors?.profesion_id)
        toast.warning(error.response.data.errors.profesion_id[0]);

      if (error.response.data.errors?.direccion_id)
        toast.warning(error.response.data.errors.direccion_id[0]);
    } else {
      toast.error("Error al crear el paciente");
    }
  }
};

// Actualizar paciente
export const updatePaciente = async (id: string, req: unknown) => {
  try {
    const dataPaciente = await api.get(`/pacientes/${id}`);
    const [pacientes] = [dataPaciente.data.data].map((paciente) => ({
      id: paciente.id,
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      fecha_nacimiento: paciente.fecha_nacimiento,
      genero_id: paciente.genero.id,
      estado_civil_id: paciente.estado_civil.id,
      profesion_id: paciente.profesion.id,
      direccion_id: paciente.direccion.id,
    }));

    // Crear objeto con solo los datos que cambiaron
    const cambios = {};
    Object.keys(req).forEach((key) => {
      if (req[key] != pacientes[key]) {
        cambios[key] = req[key];
      }
    });

    // Verificar si hay cambios
    if (Object.keys(cambios).length === 0) {
      toast.info("No se realizaron cambios");
      return;
    }

    const paciente = await api.patch(`/pacientes/${id}`, cambios);

    toast.success(
      `Paciente: ${paciente.data.data.nombre}, actualizado correctamente`,
    );
    return paciente.data;
  } catch (error: any) {
    if (error.response.data?.errors) {
      if (error.response.data.errors?.nombre)
        toast.warning(error.response.data.errors.nombre[0]);

      if (error.response.data.errors?.apellido)
        toast.warning(error.response.data.errors.apellido[0]);

      if (error.response.data.errors?.fecha_nacimiento)
        toast.warning(error.response.data.errors.fecha_nacimiento[0]);

      if (error.response.data.errors?.genero_id)
        toast.warning(error.response.data.errors.genero_id[0]);

      if (error.response.data.errors?.estado_civil_id)
        toast.warning(error.response.data.errors.estado_civil_id[0]);

      if (error.response.data.errors?.profesion_id)
        toast.warning(error.response.data.errors.profesion_id[0]);

      if (error.response.data.errors?.direccion_id)
        toast.warning(error.response.data.errors.direccion_id[0]);
    } else {
      toast.error("Error al actualizar el paciente");
    }
  }
};

// Eliminar paciente
export const deletePaciente = async (id: string) => {
  try {
    const paciente = await api.delete(`/pacientes/${id}`);

    toast.success(paciente.data.message);
    return paciente.data;
  } catch (error: any) {
    if (error.response?.data?.error)
      toast.warning(
        "No se puede eliminar el paciente, verifique que no tenga registros asociados",
      );
    else toast.error("Error al eliminar el paciente");
  }
};

// Cita del paciente
export const getCitasPaciente = async (id: string) => {
  try {
    const citasPaciente = await api.get(`/cita/paciente/${id}`);

    toast.success("Cita del paciente actualizada correctamente");
    return citasPaciente.data;
  } catch (error: any) {
    if (error.response.data?.error)
      toast.warning("No se puede cambiar la cita del paciente");
    else toast.error("Error al cambiar la cita del paciente");
  }
};
