import axios from "../libs/axios";

// Peticiones de autenticacion
export const loginRequest = async (usuario: string, password: string) => {
  return axios.post("/auth/login", {
    usuario,
    password,
  });
};

export const logoutRequest = async () => {
  return axios.get("/auth/logout");
};

// Peticion para tabla de usuarios
export const profileRequest = async () => {
  return axios.get("/usuarios");
};
