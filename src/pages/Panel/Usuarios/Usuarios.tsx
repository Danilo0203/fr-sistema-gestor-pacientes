import { Outlet, useLocation } from "react-router-dom";

export const Usuarios = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-grow flex-col gap-5 p-4">
      <h2 className="text-2xl text-azulFuerte">
        Tabla <b>{pathname.includes("/tabla") ? "Usuarios" : "Roles"}</b>
      </h2>
      <Outlet />
    </div>
  );
};
