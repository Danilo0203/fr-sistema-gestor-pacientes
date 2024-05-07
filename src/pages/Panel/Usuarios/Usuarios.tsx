import { getUsuarios } from "helpers/api/usuarios/usuarios";
import { Outlet } from "react-router-dom";

export const Usuarios = () => {
  getUsuarios();
  return (
    <div className="flex flex-grow flex-col gap-5 p-4">
      <h2 className="text-2xl text-azulFuerte">
        Tabla <b>Usuarios</b>
      </h2>
      <Outlet />
    </div>
  );
};
