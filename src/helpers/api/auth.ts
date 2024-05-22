import api from "../libs/axios";
import { toast } from "sonner";

// PETICIONES DE AUTENTICACIÓN

// Login
export const login = async (usuario: string, password: string) => {
  const data = {
    usuario,
    password,
  };
  try {
    const login = await api.post("/auth/login", data);
    return login.data;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      const e = error as Error;
      if (e.message === "Network Error") {
        toast.error("Error de conexión con el servidor");
      }
    }
  }
};

// Logout
export const logout = async () => {
  try {
    const logout = await api.get("/auth/logout");
    return logout;
  } catch (error) {
    console.error("Error al cerrar sesión: ", error);
  }
};

// Register
export const registerUser = async (req: unknown) => {
  try {
    const register = await api.post("/auth/register", req);

    toast.success(
      `Usuario: ${register.data.data.nombre}, registrado correctamente`,
    );
    return register.data;
  } catch (error: any) {
    if (error.response.data?.errors) {
      if (error.response.data.errors?.nombre)
        toast.warning(error.response.data.errors.nombre[0]);

      if (error.response.data.errors?.usuario)
        toast.warning(error.response.data.errors.usuario[0]);

      if (error.response.data.errors?.email)
        toast.warning(error.response.data.errors.email[0]);

      if (error.response.data.errors?.password)
        toast.warning(error.response.data.errors.password[0]);

      if (error.response.data.errors?.rol_id)
        toast.warning(error.response.data.errors.rol_id[0]);
    } else {
      toast.error("Error al registrar usuario");
    }
  }
};
