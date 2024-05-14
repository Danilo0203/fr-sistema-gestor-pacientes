import { Outlet, useLocation } from "react-router-dom";

export const Pacientes = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-grow flex-col gap-5 p-4">
      <h2 className="text-2xl text-azulFuerte">
        Tabla{" "}
        <b>
          {pathname.includes("/tabla")
            ? "Pacientes"
            : pathname.includes("/profesion")
              ? "Profesiones"
              : pathname.includes("/estado-civil")
                ? "Estados Civiles"
                : "Géneros"}
        </b>
      </h2>
      <Outlet />
    </div>
  );
};
