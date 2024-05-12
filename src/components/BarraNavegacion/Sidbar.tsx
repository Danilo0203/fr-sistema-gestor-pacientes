import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Sidbar = () => {
  const [openUsuarios, setOpenUsuarios] = useState(false);
  const [openPacientes, setOpenPacientes] = useState(false);
  const [openDireccion, setOpenDireccion] = useState(false);

  return (
    <nav className="mt-3">
      <ul className="flex flex-col gap-3">
        <li>
          <NavLink
            to="/panel"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-md py-1 pl-2  text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
            }
          >
            <Icon icon="mdi:home" width={25} /> <span>Panel</span>
          </NavLink>
        </li>
        {/* Usuarios */}
        <li>
          <NavLink
            to="/usuarios/tabla"
            className="flex items-center gap-2 rounded-md py-1 pl-2 text-blanco"
            onClick={() => setOpenUsuarios(!openUsuarios)}
          >
            <div className="flex w-full items-center justify-between pr-1">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:user" width={25} />
                <span>Usuarios</span>
              </div>
              {openUsuarios ? (
                <Icon icon="mdi:keyboard-arrow-up" />
              ) : (
                <Icon icon="mdi:keyboard-arrow-down" />
              )}
            </div>
          </NavLink>
          {openUsuarios && (
            <ul className="my-1 flex flex-col gap-1 pl-3">
              <li>
                <NavLink
                  to="/usuarios/tabla"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
                  }
                >
                  <Icon icon="mdi:user-group" width={25} />
                  <span>Usuarios</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/usuarios/rol"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
                  }
                >
                  <Icon icon="mdi:user" width={25} /> <span>Rol</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* PACIENTES */}
        <li>
          <NavLink
            to="/pacientes/tabla"
            className="flex items-center gap-2 rounded-md py-1 pl-2 text-blanco"
            onClick={() => setOpenPacientes(!openPacientes)}
          >
            <div className="flex w-full items-center justify-between pr-1">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:user" width={25} />
                <span>Pacientes</span>
              </div>
              {openPacientes ? (
                <Icon icon="mdi:keyboard-arrow-up" />
              ) : (
                <Icon icon="mdi:keyboard-arrow-down" />
              )}
            </div>
          </NavLink>
          {openPacientes && (
            <ul className="my-1 flex flex-col gap-1 pl-3">
              <li>
                <NavLink
                  to="/pacientes/tabla"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
                  }
                >
                  <Icon icon="mdi:user-group" width={25} />
                  <span>Pacientes</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/pacientes/profesion"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
                  }
                >
                  <Icon icon="mdi:work" width={25} /> <span>Profesion</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/pacientes/genero"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
                  }
                >
                  <Icon icon="mdi:user" width={25} /> <span>Genero</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Direcciones */}
        <li>
          <NavLink
            to="/direcciones/tabla"
            className="flex items-center gap-2 rounded-md py-1 pl-2 text-blanco "
            onClick={() => setOpenDireccion(!openDireccion)}
          >
            <div className="flex w-full items-center justify-between pr-1">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:map-marker" width={25} />
                <span>Direcciones</span>
              </div>
              {openDireccion ? (
                <Icon icon="mdi:keyboard-arrow-up" />
              ) : (
                <Icon icon="mdi:keyboard-arrow-down" />
              )}
            </div>
          </NavLink>
          {openDireccion && (
            <ul className="my-1 flex flex-col gap-1 pl-3">
              <li>
                <NavLink
                  to="/direcciones/tabla"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
                  }
                >
                  <Icon icon="mdi:map-marker" width={25} />
                  <span>Direcciones</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/direcciones/municipio"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
                  }
                >
                  <Icon icon="mdi:map-marker" width={25} />{" "}
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
                  <Icon icon="mdi:map-marker" width={25} />
                  <span>Departamento</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};
