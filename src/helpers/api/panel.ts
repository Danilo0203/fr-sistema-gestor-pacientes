import api from "../libs/axios";

// PETICIONES DEL PANEL DE CONTROL

// Obtener los datos del panel de control
export const getPanel = async () => {
  try {
    const panel = await api.get("/panel");
    return panel.data;
  } catch (error) {
    console.error("Error al obtener los datos del panel de control: ", error);
  }
};
