import { InicioSesion } from "pages/InicioSesion/InicioSesion";
import { Registro } from "pages/Registro/Registro";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { Layout } from "pages/Panel/Layout";
import { Direcciones } from "pages/Panel/Direcciones/Direcciones";
import { Pacientes } from "pages/Panel/Pacientes/Pacientes";
import { Usuarios } from "pages/Panel/Usuarios/Usuarios";
import { TablaUsuarios } from "pages/Panel/Usuarios/usuarios/TablaUsuarios";
import { ModalEditarUsuarios } from "pages/Panel/Usuarios/usuarios/Modal";
import { Panel } from "pages/Panel/Panel";
import { TablaRoles } from "pages/Panel/Usuarios/roles/TablaRoles";
import { ModalEditarRoles } from "pages/Panel/Usuarios/roles/Modal";
import { TablaDirecciones } from "pages/Panel/Direcciones/Direcciones/TablaDirecciones";
import { ModalEditarDireccion } from "pages/Panel/Direcciones/Direcciones/Modal";
import { TablaMunicipios } from "pages/Panel/Direcciones/Municipios/TablaMunicipios";
import { ModalEditarMunicipio } from "pages/Panel/Direcciones/Municipios/Modal";
import { TablaDepartamentos } from "pages/Panel/Direcciones/Departamentos/TablaDepartamentos";
import { ModalEditarDepartamento } from "pages/Panel/Direcciones/Departamentos/Modal";
import { TablaEstadoCiviles } from "pages/Panel/Pacientes/EstadoCiviles/TablaEstadosCiviles";
import { ModalEditarEstadoCivil } from "pages/Panel/Pacientes/EstadoCiviles/Modal";
import { TablaGeneros } from "pages/Panel/Pacientes/Generos/TablaGeneros";
import { ModalEditarGenero } from "pages/Panel/Pacientes/Generos/Modal";
import { TablaProfesiones } from "pages/Panel/Pacientes/Profesiones/TablaProfesiones";
import { ModalEditarProfesion } from "pages/Panel/Pacientes/Profesiones/Modal";
import { TablaPacientes } from "pages/Panel/Pacientes/Pacientes/TablaPacientes";
import { ModalEditarPaciente } from "pages/Panel/Pacientes/Pacientes/Modal";
import { DatosMedicos } from "pages/Panel/DatosMedicos/DatosMedicos";
import { TablaDatosMedicos } from "pages/Panel/DatosMedicos/DatosMedicos/TablaDatosMedicos";
import { ModalEditarDatoMedico } from "pages/Panel/DatosMedicos/DatosMedicos/Modal";
import { Recetas } from "pages/Panel/Recetas/Recetas";
import { TablaRecetas } from "pages/Panel/Recetas/Recetas/TablaRecetas";
import { ModalEditarReceta } from "pages/Panel/Recetas/Recetas/Modal";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    errorElement: <h1>Error 404</h1>,
    children: [
      {
        path: "/*",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Navigate to="panel" />,
          },
          {
            path: "panel",
            element: <Panel />,
          },

          {
            path: "usuarios",
            element: <Usuarios />,
            children: [
              {
                path: "tabla",
                element: <TablaUsuarios />,
                // children: [
                //   {
                //     path: "editar/:id",
                //     element: <ModalEditarUsuarios />,
                //   },
                // ],
              },

              {
                path: "rol",
                element: <TablaRoles />,
                children: [
                  {
                    path: "editar/:id",
                    element: <ModalEditarRoles />,
                  },
                ],
              },
            ],
          },
          {
            path: "pacientes",
            element: <Pacientes />,
            children: [
              {
                path: "tabla",
                element: <TablaPacientes />,
                // children: [
                //   {
                //     path: "editar/:id",
                //     element: <ModalEditarPaciente />,
                //   },
                // ],
              },
              {
                path: "profesion",
                element: <TablaProfesiones />,
                children: [
                  {
                    path: "editar/:id",
                    element: <ModalEditarProfesion />,
                  },
                ],
              },
              {
                path: "estado-civil",
                element: <TablaEstadoCiviles />,
                children: [
                  {
                    path: "editar/:id",
                    element: <ModalEditarEstadoCivil />,
                  },
                ],
              },
              {
                path: "genero",
                element: <TablaGeneros />,
                children: [
                  {
                    path: "editar/:id",
                    element: <ModalEditarGenero />,
                  },
                ],
              },
            ],
          },

          {
            path: "direcciones",
            element: <Direcciones />,
            children: [
              {
                path: "tabla",
                element: <TablaDirecciones />,
                children: [
                  {
                    path: "editar/:id",
                    element: <ModalEditarDireccion />,
                  },
                ],
              },

              {
                path: "municipio",
                element: <TablaMunicipios />,
                children: [
                  {
                    path: "editar/:id",
                    element: <ModalEditarMunicipio />,
                  },
                ],
              },

              {
                path: "departamento",
                element: <TablaDepartamentos />,
                children: [
                  {
                    path: "editar/:id",
                    element: <ModalEditarDepartamento />,
                  },
                ],
              },
            ],
          },

          {
            path: "datos-medicos",
            element: <DatosMedicos />,
            children: [
              {
                path: "tabla",
                element: <TablaDatosMedicos />,
                children: [
                  {
                    path: "editar/:id",
                    element: <ModalEditarDatoMedico />,
                  },
                ],
              },
            ],
          },

          {
            path: "recetas-medicas",
            element: <Recetas />,
            children: [
              {
                path: "tabla",
                element: <TablaRecetas />,
                children: [
                  {
                    path: "editar/:id",
                    element: <ModalEditarReceta />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "/*",
    element: <PublicRoute />,
    children: [
      {
        path: "inicio-sesion",
        element: <InicioSesion />,
      },
      {
        path: "registro",
        element: <Registro />,
      },
    ],
  },
]);

export const MyRoutes = () => <RouterProvider router={routes} />;
