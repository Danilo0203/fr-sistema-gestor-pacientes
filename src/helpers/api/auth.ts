import { toast } from "sonner";
import api from "../libs/axios";

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
  } catch (error) {
    if (error.message === "Network Error") {
      toast.error("Error de conexión con el servidor");
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
    return register.data;
  } catch (error) {
    console.error("Error al registrar usuario: ", error);
  }
};
