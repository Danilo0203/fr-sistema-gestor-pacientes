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
import { capitalizar } from "../../utils/capitalizarStrings";

export const Header = () => {
  const clearSesion = useAuthStore((state) => state.setClearToken);
  const nombre = useAuthStore((state) => state.profile);
  const nombreUsuario = nombre?.nombre;
  const rolUsuario = capitalizar(nombre?.rol?.nombre);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleCerrarSesion = async () => {
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
          {pathname.includes("/direcciones/municipio") && (
            <BreadcrumbItem>
              <Breadcrumbs size="lg">
                <BreadcrumbItem>Direcciones</BreadcrumbItem>
                <BreadcrumbItem>Municipio</BreadcrumbItem>
              </Breadcrumbs>
            </BreadcrumbItem>
          )}
          {pathname.includes("/direcciones/departamento") && (
            <BreadcrumbItem>
              <Breadcrumbs size="lg">
                <BreadcrumbItem>Direcciones</BreadcrumbItem>
                <BreadcrumbItem>Departamento</BreadcrumbItem>
              </Breadcrumbs>
            </BreadcrumbItem>
          )}
        </Breadcrumbs>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <b>{nombreUsuario}</b>
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
            <DropdownItem key="profile" className="gap-2">
              <p className="font-semibold">{rolUsuario}</p>
            </DropdownItem>
            <DropdownItem key="perfil" startContent={<Icon icon="mdi:user" />}>
              <span>Perfil</span>
            </DropdownItem>
            <DropdownItem
              key="cerrarSesion"
              color="danger"
              startContent={<Icon icon="mdi:logout" />}
              onPress={handleCerrarSesion}
            >
              <span>Cerrar Sesión</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};
