import api from "../../libs/axios";
import { toast } from "sonner";

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

    toast.success(
      `Departamento: ${departamento.data.data.nombre}, registrado correctamente`,
    );
    return departamento.data;
  } catch (error: any) {
    if (error.response.data?.errors) {
      if (error.response.data.errors?.nombre)
        toast.warning(error.response.data.errors.nombre[0]);
    } else {
      toast.error("Error al crear el departamento");
    }
  }
};

// Actualizar departamento
export const updateDepartamento = async (id: string, req: unknown) => {
  try {
    const dataDepartamentos = await api.get(`/departamentos/${id}`);
    const [departamentos] = [dataDepartamentos.data.data].map(
      (departamento) => ({
        id: departamento.id,
        nombre: departamento.nombre,
      }),
    );

    // Crear objeto con solo los datos que cambiaron
    const cambios = {};
    Object.keys(req).forEach((key) => {
      if (req[key] != departamentos[key]) {
        cambios[key] = req[key];
      }
    });

    // Verificar si hay cambios
    if (Object.keys(cambios).length === 0) {
      toast.info("No se realizaron cambios");
      return;
    }

    const departamento = await api.patch(`/departamentos/${id}`, cambios);

    toast.success(
      `Departamento: ${departamento.data.data.nombre}, actualizado correctamente`,
    );
    return departamento.data;
  } catch (error: any) {
    if (error.response.data?.errors) {
      if (error.response.data.errors?.nombre)
        toast.warning(error.response.data.errors.nombre[0]);
    } else {
      toast.error("Error al actualizar el departamento");
    }
  }
};

// Eliminar departamento
export const deleteDepartamento = async (id: string) => {
  try {
    const departamento = await api.delete(`/departamentos/${id}`);

    toast.success(departamento.data.message);
    return departamento.data;
  } catch (error: any) {
    if (error.response?.data?.error)
      toast.warning(
        "No se puede eliminar el departamento, tiene registros asociados",
      );
    else toast.error("Error al eliminar el departamento");
  }
};
