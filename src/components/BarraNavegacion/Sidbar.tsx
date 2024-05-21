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
              endContent={
                openUsuarios ? (
                  <Icon icon="mdi:keyboard-arrow-down" width={18} />
                ) : (
                  <Icon icon="mdi:keyboard-arrow-up" width={18} />
                )
              }
              onPress={() =>
                pathname.includes("/usuarios/tabla")
                  ? navigate("/usuarios/tabla")
                  : pathname.includes("/usuarios/rol")
                    ? navigate("/usuarios/rol")
                    : navigate("/usuarios/tabla")
              }
              className={`flex items-center justify-between bg-transparent px-2 text-white`}
              radius="sm"
              onClick={() => setOpenUsuarios(!openUsuarios)}
            >
              <div className="flex items-center gap-2">
                <Icon icon="mdi:user" width={25} /> Usuarios
              </div>
            </Button>

            {openUsuarios && (
              <ul className="my-1 flex flex-col gap-1 pl-3">
                <li>
                  <Button
                    fullWidth
                    onPress={() => navigate("/usuarios/tabla")}
                    className={`flex items-center justify-between px-2 ${pathname.includes("/usuarios/tabla") ? "bg-white text-azulFuerte" : "bg-transparent text-white"}`}
                    radius="sm"
                  >
                    <div className="flex items-center gap-2">
                      <Icon icon="mdi:user" width={25} /> Usuarios
                    </div>
                  </Button>
                </li>
                <li>
                  <Button
                    fullWidth
                    onPress={() => navigate("/usuarios/rol")}
                    className={`flex items-center justify-between px-2 ${pathname.includes("/usuarios/rol") ? "bg-white text-azulFuerte" : "bg-transparent text-white"}`}
                    radius="sm"
                  >
                    <div className="flex items-center gap-2">
                      <Icon icon="mdi:user" width={25} /> Roles
                    </div>
                  </Button>
                </li>
              </ul>
            )}
          </li>
        )}

        {/* PACIENTES */}
        <li>
          <Button
            fullWidth
            endContent={
              openPacientes ? (
                <Icon icon="mdi:keyboard-arrow-down" width={18} />
              ) : (
                <Icon icon="mdi:keyboard-arrow-up" width={18} />
              )
            }
            onPress={() =>
              pathname.includes("pacientes/tabla")
                ? navigate("/pacientes/tabla")
                : pathname.includes("pacientes/profesion")
                  ? navigate("/pacientes/profesion")
                  : pathname.includes("pacientes/estado-civil")
                    ? navigate("/pacientes/estado-civil")
                    : pathname.includes("pacientes/genero")
                      ? navigate("/pacientes/genero")
                      : navigate("/pacientes/tabla")
            }
            className={`flex items-center justify-between bg-transparent px-2 text-white`}
            radius="sm"
            onClick={() => setOpenPacientes(!openPacientes)}
          >
            <div className="flex items-center gap-2">
              <Icon icon="mdi:user-group" width={25} /> Pacientes
            </div>
          </Button>
          {openPacientes && (
            <ul className="my-1 flex flex-col gap-1 pl-3">
              <li>
                <Button
                  fullWidth
                  onPress={() => navigate("/pacientes/tabla")}
                  className={`flex items-center justify-between px-2 ${pathname.includes("/pacientes/tabla") ? "bg-white text-azulFuerte" : "bg-transparent text-white"}`}
                  radius="sm"
                >
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:user-group" width={25} /> Pacientes
                  </div>
                </Button>
              </li>
              <li>
                <Button
                  fullWidth
                  onPress={() => navigate("/pacientes/profesion")}
                  className={`flex items-center justify-between px-2 ${pathname.includes("/pacientes/profesion") ? "bg-white text-azulFuerte" : "bg-transparent text-white"}`}
                  radius="sm"
                >
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:work" width={25} /> Profesiones
                  </div>
                </Button>
              </li>
              <li>
                <Button
                  fullWidth
                  onPress={() => navigate("/pacientes/estado-civil")}
                  className={`flex items-center justify-between px-2 ${pathname.includes("/pacientes/estado-civil") ? "bg-white text-azulFuerte" : "bg-transparent text-white"}`}
                  radius="sm"
                >
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:heart" width={25} /> Estado Civil
                  </div>
                </Button>
              </li>
              <li>
                <Button
                  fullWidth
                  onPress={() => navigate("/pacientes/genero")}
                  className={`flex items-center justify-between px-2 ${pathname.includes("/pacientes/genero") ? "bg-white text-azulFuerte" : "bg-transparent text-white"}`}
                  radius="sm"
                >
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:user" width={25} /> Género
                  </div>
                </Button>
              </li>
            </ul>
          )}
        </li>

        {/* Direcciones */}
        <li>
          <Button
            fullWidth
            endContent={
              openDireccion ? (
                <Icon icon="mdi:keyboard-arrow-down" width={18} />
              ) : (
                <Icon icon="mdi:keyboard-arrow-up" width={18} />
              )
            }
            onPress={() =>
              pathname.includes("direcciones/tabla")
                ? navigate("/direcciones/tabla")
                : pathname.includes("direcciones/municipio")
                  ? navigate("/direcciones/municipio")
                  : pathname.includes("direcciones/departamento")
                    ? navigate("/direcciones/departamento")
                    : navigate("/direcciones/tabla")
            }
            className={`flex items-center justify-between bg-transparent px-2 text-white`}
            radius="sm"
            onClick={() => setOpenDireccion(!openDireccion)}
          >
            <div className="flex items-center gap-2">
              <Icon icon="mdi:map-marker" width={25} /> Direcciones
            </div>
          </Button>
          {openDireccion && (
            <ul className="my-1 flex flex-col gap-1 pl-3">
              <li>
                <Button
                  fullWidth
                  onPress={() => navigate("/direcciones/tabla")}
                  className={`flex items-center justify-between px-2 ${pathname.includes("/direcciones/tabla") ? "bg-white text-azulFuerte" : "bg-transparent text-white"}`}
                  radius="sm"
                >
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:map-marker" width={25} /> Direcciones
                  </div>
                </Button>
              </li>
              <li>
                <Button
                  fullWidth
                  onPress={() => navigate("/direcciones/municipio")}
                  className={`flex items-center justify-between px-2 ${pathname.includes("/direcciones/municipio") ? "bg-white text-azulFuerte" : "bg-transparent text-white"}`}
                  radius="sm"
                >
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:map-marker" width={25} /> Municipios
                  </div>
                </Button>
              </li>
              <li>
                <Button
                  fullWidth
                  onPress={() => navigate("/direcciones/departamento")}
                  className={`flex items-center justify-between px-2 ${pathname.includes("/direcciones/departamento") ? "bg-white text-azulFuerte" : "bg-transparent text-white"}`}
                  radius="sm"
                >
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:map-marker" width={25} /> Departamentos
                  </div>
                </Button>
              </li>
            </ul>
          )}
        </li>

        {/* Datos medicos */}
        <li>
          <Button
            fullWidth
            endContent={
              openDatosMedicos ? (
                <Icon icon="mdi:keyboard-arrow-down" width={18} />
              ) : (
                <Icon icon="mdi:keyboard-arrow-up" width={18} />
              )
            }
            onPress={() =>
              pathname.includes("datos-medicos/tabla")
                ? navigate("/datos-medicos/tabla")
                : pathname.includes("datos-medicos/paciente")
                  ? navigate("/datos-medicos/paciente")
                  : navigate("/datos-medicos/tabla")
            }
            className={`flex items-center justify-between bg-transparent px-2 text-white`}
            radius="sm"
            onClick={() => setOpenDatosMedicos(!openDatosMedicos)}
          >
            <div className="flex items-center gap-2">
              <Icon icon="mdi:file-document" width={25} /> Datos Médicos
            </div>
          </Button>

          {openDatosMedicos && (
            <ul className="my-1 flex flex-col gap-1 pl-3">
              <li>
                <Button
                  fullWidth
                  onPress={() => navigate("/datos-medicos/tabla")}
                  className={`flex items-center justify-between px-2 ${pathname.includes("/datos-medicos/tabla") ? "bg-white text-azulFuerte" : "bg-transparent text-white"}`}
                  radius="sm"
                >
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:file-document" width={25} /> Datos Médicos
                  </div>
                </Button>
              </li>
              <li>
                <Button
                  fullWidth
                  onPress={() => navigate("/datos-medicos/paciente")}
                  className={`flex items-center justify-between px-2 ${pathname.includes("/datos-medicos/paciente") ? "bg-white text-azulFuerte" : "bg-transparent text-white"}`}
                  radius="sm"
                >
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:file-document" width={25} /> Pacientes
                  </div>
                </Button>
              </li>
            </ul>
          )}
        </li>

        {/* Recetas medicas */}
        <li>
          <Button
            fullWidth
            endContent={
              openRecetas ? (
                <Icon icon="mdi:keyboard-arrow-down" width={18} />
              ) : (
                <Icon icon="mdi:keyboard-arrow-up" width={18} />
              )
            }
            onPress={() =>
              pathname.includes("recetas-medicas/tabla")
                ? navigate("/recetas-medicas/tabla")
                : pathname.includes("recetas-medicas/paciente")
                  ? navigate("/recetas-medicas/paciente")
                  : navigate("/recetas-medicas/tabla")
            }
            className={`flex items-center justify-between bg-transparent px-2 text-white`}
            radius="sm"
            onClick={() => setOpenRecetas(!openRecetas)}
          >
            <div className="flex items-center gap-2">
              <Icon icon="mdi:file-document" width={25} /> Recetas Médicas
            </div>
          </Button>

          {openRecetas && (
            <ul className="my-1 flex flex-col gap-1 pl-3">
              <li>
                <Button
                  fullWidth
                  onPress={() => navigate("/recetas-medicas/tabla")}
                  className={`flex items-center justify-between px-2 ${pathname.includes("/recetas-medicas/tabla") ? "bg-white text-azulFuerte" : "bg-transparent text-white"}`}
                  radius="sm"
                >
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:file-document" width={25} /> Recetas Médicas
                  </div>
                </Button>
              </li>
              <li>
                <Button
                  fullWidth
                  onPress={() => navigate("/recetas-medicas/paciente")}
                  className={`flex items-center justify-between px-2 ${pathname.includes("/recetas-medicas/paciente") ? "bg-white text-azulFuerte" : "bg-transparent text-white"}`}
                  radius="sm"
                >
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:file-document" width={25} /> Pacientes
                  </div>
                </Button>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};
