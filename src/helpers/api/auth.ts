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
    console.error("Error al iniciar sesión: ", error);
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
export const register = async (req: unknown) => {
  try {
    const register = await api.post("/auth/register", req);
    return register.data;
  } catch (error) {
    console.error("Error al registrar usuario: ", error);
  }
};
