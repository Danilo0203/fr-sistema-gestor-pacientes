import { Icon } from "@iconify/react/dist/iconify.js";
import { LogoPanel } from "components/Logo/Logo";
import { NavLink } from "react-router-dom";

export const BarraNavegacion = () => {
  return (
    <div className="min-h-dvh flex-shrink bg-azulFuerte p-5">
      <div>
        <LogoPanel size={3} />
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/panel"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
              }
            >
              <Icon icon="mdi:home" width={18} /> <span>Panel</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rol"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
              }
            >
              <Icon icon="mdi:user" width={18} /> <span>Rol</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pacientes"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
              }
            >
              <Icon icon="mdi:account" width={18} /> <span>Pacientes</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profesion"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
              }
            >
              <Icon icon="mdi:briefcase" width={18} /> <span>Profesion</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/direcciones"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
              }
            >
              <Icon icon="mdi:map-marker" width={18} /> <span>Direcciones</span>
            </NavLink>
            <ul className="pl-3">
              <li>
                <NavLink
                  to="/direcciones/municipio"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
                  }
                >
                  <Icon icon="mdi:map-marker" width={18} />{" "}
                  <span>Municipio</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/direcciones/departamento"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
                  }
                >
                  <Icon icon="mdi:map-marker" width={18} />{" "}
                  <span>Departamento</span>
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink
              to="/genero"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
              }
            >
              <Icon icon="mdi:user" width={18} /> <span>Genero</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
