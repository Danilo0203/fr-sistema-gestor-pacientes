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
import { Panel } from "pages/Panel/Panel";
import { TablaRoles } from "pages/Panel/Usuarios/roles/TablaRoles";
import { TablaDirecciones } from "pages/Panel/Direcciones/Direcciones/TablaDirecciones";
import { TablaMunicipios } from "pages/Panel/Direcciones/Municipios/TablaMunicipios";
import { TablaDepartamentos } from "pages/Panel/Direcciones/Departamentos/TablaDepartamentos";
import { TablaEstadoCiviles } from "pages/Panel/Pacientes/EstadoCiviles/TablaEstadosCiviles";
import { TablaGeneros } from "pages/Panel/Pacientes/Generos/TablaGeneros";
import { TablaProfesiones } from "pages/Panel/Pacientes/Profesiones/TablaProfesiones";
import { TablaPacientes } from "pages/Panel/Pacientes/Pacientes/TablaPacientes";
import { DatosMedicos } from "pages/Panel/DatosMedicos/DatosMedicos";
import { TablaDatosMedicos } from "pages/Panel/DatosMedicos/DatosMedicos/TablaDatosMedicos";
import { Recetas } from "pages/Panel/Recetas/Recetas";
import { TablaRecetas } from "pages/Panel/Recetas/Recetas/TablaRecetas";
import { TablaAtender } from "pages/Panel/Recepcionista/PacientesAtender/TablaAtender";

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
              },

              {
                path: "rol",
                element: <TablaRoles />,
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
              },
              {
                path: "profesion",
                element: <TablaProfesiones />,
              },
              {
                path: "estado-civil",
                element: <TablaEstadoCiviles />,
              },
              {
                path: "genero",
                element: <TablaGeneros />,
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
              },

              {
                path: "municipio",
                element: <TablaMunicipios />,
              },

              {
                path: "departamento",
                element: <TablaDepartamentos />,
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
