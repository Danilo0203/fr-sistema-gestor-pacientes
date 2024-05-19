import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  AvatarIcon,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { useAuthStore } from "../../store/auth";
import { logout } from "helpers/api/auth";
import { useUsuarioStore } from "../../store/usuarios";

export const Header = () => {
  const clearSesion = useAuthStore((state) => state.setClearToken);
  const profile = useAuthStore((state) => state.profile);
  const usuariosData = useUsuarioStore((state) => state.data);
  // Funcion para obtener el nombre del usuario logueado
  const usuario = usuariosData.find((usuario) => usuario.id == profile.id);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleCerrarSesion = async () => {
    await logout();
    clearSesion();
    navigate("/");
  };

  return (
    <Navbar height={"4rem"} maxWidth="full">
      <NavbarBrand>
        <Breadcrumbs size="lg">
          <BreadcrumbItem onPress={() => navigate("/panel")}>
            Panel
          </BreadcrumbItem>

          {/* USUARIOS */}
          {pathname.includes("usuarios/tabla") && (
            <BreadcrumbItem>Usuarios</BreadcrumbItem>
          )}
          {pathname.includes("rol") && (
            <BreadcrumbItem>
              <Breadcrumbs size="lg">
                <BreadcrumbItem onPress={() => navigate("/usuarios/tabla")}>
                  Usuarios
                </BreadcrumbItem>
                <BreadcrumbItem>Roles</BreadcrumbItem>
              </Breadcrumbs>
            </BreadcrumbItem>
          )}

          {/* PACIENTES */}
          {pathname.includes("pacientes/tabla") && (
            <BreadcrumbItem>Pacientes</BreadcrumbItem>
          )}
          {pathname.includes("/pacientes/profesion") && (
            <BreadcrumbItem>
              <Breadcrumbs size="lg">
                <BreadcrumbItem onPress={() => navigate("/pacientes/tabla")}>
                  Pacientes
                </BreadcrumbItem>
                <BreadcrumbItem>Profesión</BreadcrumbItem>
              </Breadcrumbs>
            </BreadcrumbItem>
          )}
          {pathname.includes("/pacientes/estado-civil") && (
            <BreadcrumbItem>
              <Breadcrumbs size="lg">
                <BreadcrumbItem onPress={() => navigate("/pacientes/tabla")}>
                  Pacientes
                </BreadcrumbItem>
                <BreadcrumbItem>Estado Civil</BreadcrumbItem>
              </Breadcrumbs>
            </BreadcrumbItem>
          )}
          {pathname.includes("/pacientes/genero") && (
            <BreadcrumbItem>
              <Breadcrumbs size="lg">
                <BreadcrumbItem onPress={() => navigate("/pacientes/tabla")}>
                  Pacientes
                </BreadcrumbItem>
                <BreadcrumbItem>Genero</BreadcrumbItem>
              </Breadcrumbs>
            </BreadcrumbItem>
          )}

          {/* Direcciones */}
          {pathname.includes("direcciones/tabla") && (
            <BreadcrumbItem>Direcciones</BreadcrumbItem>
          )}
          {pathname.includes("/direcciones/municipio") && (
            <BreadcrumbItem>
              <Breadcrumbs size="lg">
                <BreadcrumbItem onPress={() => navigate("/direcciones/tabla")}>
                  Direcciones
                </BreadcrumbItem>
                <BreadcrumbItem>Municipio</BreadcrumbItem>
              </Breadcrumbs>
            </BreadcrumbItem>
          )}
          {pathname.includes("/direcciones/departamento") && (
            <BreadcrumbItem>
              <Breadcrumbs size="lg">
                <BreadcrumbItem onPress={() => navigate("/direcciones/tabla")}>
                  Direcciones
                </BreadcrumbItem>
                <BreadcrumbItem>Departamento</BreadcrumbItem>
              </Breadcrumbs>
            </BreadcrumbItem>
          )}

          {/* Datos medicos */}
          {pathname.includes("datos-medicos/tabla") && (
            <BreadcrumbItem>Datos Médicos</BreadcrumbItem>
          )}
          {pathname.includes("/datos-medicos/paciente") && (
            <BreadcrumbItem>
              <Breadcrumbs size="lg">
                <BreadcrumbItem
                  onPress={() => navigate("/datos-medicos/tabla")}
                >
                  Datos Médicos
                </BreadcrumbItem>
                <BreadcrumbItem>Pacientes</BreadcrumbItem>
              </Breadcrumbs>
            </BreadcrumbItem>
          )}

          {/* Recetas medicas */}
          {pathname.includes("recetas-medicas/tabla") && (
            <BreadcrumbItem>Recetas Médicas</BreadcrumbItem>
          )}
          {pathname.includes("/recetas-medicas/paciente") && (
            <BreadcrumbItem>
              <Breadcrumbs size="lg">
                <BreadcrumbItem
                  onPress={() => navigate("/recetas-medicas/tabla")}
                >
                  Recetas Médicas
                </BreadcrumbItem>
                <BreadcrumbItem>Pacientes</BreadcrumbItem>
              </Breadcrumbs>
            </BreadcrumbItem>
          )}
        </Breadcrumbs>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <b>{usuario?.nombre}</b>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              size="md"
              icon={<AvatarIcon />}
              classNames={{
                base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                icon: "text-black/80",
              }}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="gap-2" textValue="rol">
              <p className="font-semibold">{usuario?.rol}</p>
            </DropdownItem>
            <DropdownItem
              key="perfil"
              startContent={<Icon icon="mdi:user" />}
              textValue="perfil"
            >
              <span>Perfil</span>
            </DropdownItem>
            <DropdownItem
              key="cerrarSesion"
              color="danger"
              startContent={<Icon icon="mdi:logout" />}
              onPress={handleCerrarSesion}
              textValue="cerrarSesion"
            >
              <span>Cerrar Sesión</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};
