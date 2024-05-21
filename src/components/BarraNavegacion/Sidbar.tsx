import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { Button } from "@nextui-org/react";

export const Sidbar = () => {
  const [openUsuarios, setOpenUsuarios] = useState(false);
  const [openPacientes, setOpenPacientes] = useState(false);
  const [openDireccion, setOpenDireccion] = useState(false);
  const [openDatosMedicos, setOpenDatosMedicos] = useState(false);
  const [openRecetas, setOpenRecetas] = useState(false);

  const rol = useAuthStore(
    (state) => state.profile.rol.nombre,
  ).toLocaleLowerCase();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="mt-3">
      <ul className="flex flex-col gap-3">
        <li>
          <Button
            startContent={<Icon icon="mdi:home" width={25} />}
            fullWidth
            onPress={() => navigate("/panel")}
            className={`flex items-center justify-start pl-2 ${pathname.includes("/panel") ? "bg-white text-azulFuerte" : "bg-transparent text-white"}`}
            radius="sm"
          >
            <span>Panel</span>
          </Button>
        </li>
        {/* Usuarios */}
        {rol === "administrador" && (
          <li>
            <Button
              fullWidth
              onPress={() => navigate("/usuarios/tabla")}
              className={`flex items-center justify-between bg-transparent px-2 text-white`}
              radius="sm"
              onClick={() => setOpenUsuarios(!openUsuarios)}
            >
              <div className="flex items-center gap-2">
                <Icon icon="mdi:user" width={25} /> Usuarios
              </div>
              <Icon icon="mdi:keyboard-arrow-down" />
            </Button>

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
        )}

        {/* PACIENTES */}
        <li>
          <NavLink
            to="/pacientes/tabla"
            className="flex items-center gap-2 rounded-md py-1 pl-2 text-blanco"
            onClick={() => setOpenPacientes(!openPacientes)}
          >
            <div className="flex w-full items-center justify-between pr-1">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:account" width={25} /> {/* Modified icon */}
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
                  to="/pacientes/estado-civil"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
                  }
                >
                  <Icon icon="mdi:heart" width={25} /> <span>Estado Civil</span>
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

        {/* Datos medicos */}
        <li>
          <NavLink
            to="/datos-medicos/tabla"
            className="flex items-center gap-2 rounded-md py-1 pl-2 text-blanco "
            onClick={() => setOpenDatosMedicos(!openDatosMedicos)}
          >
            <div className="flex w-full items-center justify-between pr-1">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:file-document" width={25} />
                <span>Datos Médicos</span>
              </div>
              {openDatosMedicos ? (
                <Icon icon="mdi:keyboard-arrow-up" />
              ) : (
                <Icon icon="mdi:keyboard-arrow-down" />
              )}
            </div>
          </NavLink>
          {openDatosMedicos && (
            <ul className="my-1 flex flex-col gap-1 pl-3">
              <li>
                <NavLink
                  to="/datos-medicos/tabla"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
                  }
                >
                  <Icon icon="mdi:file-document" width={25} />
                  <span>Datos Médicos</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/datos-medicos/paciente"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
                  }
                >
                  <Icon icon="mdi:file-document" width={25} />{" "}
                  <span>Pacientes</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Recetas medicas */}
        <li>
          <NavLink
            to="/recetas-medicas/tabla"
            className="flex items-center gap-2 rounded-md py-1 pl-2 text-blanco "
            onClick={() => setOpenRecetas(!openRecetas)}
          >
            <div className="flex w-full items-center justify-between pr-1">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:file-document" width={25} />
                <span>Recetas Médicas</span>
              </div>
              {openRecetas ? (
                <Icon icon="mdi:keyboard-arrow-up" />
              ) : (
                <Icon icon="mdi:keyboard-arrow-down" />
              )}
            </div>
          </NavLink>
          {openRecetas && (
            <ul className="my-1 flex flex-col gap-1 pl-3">
              <li>
                <NavLink
                  to="/recetas-medicas/tabla"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
                  }
                >
                  <Icon icon="mdi:file-document" width={25} />
                  <span>Recetas Médicas</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/recetas-medicas/paciente"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md py-1 pl-2 text-azulFuerte ${isActive ? "bg-blanco" : "text-blanco"}`
                  }
                >
                  <Icon icon="mdi:file-document" width={25} />{" "}
                  <span>Pacientes</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};
