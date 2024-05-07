import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
  Spinner,
  CircularProgress,
} from "@nextui-org/react";
import { getUsuarios } from "helpers/api/usuarios/usuarios";
import { useUsuarioStore } from "../../../store/usuarios";
import { useEffect, useCallback, useState, useMemo } from "react";
import { capitalizar } from "../../../utils/capitalizarStrings";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ModalEditarUsuarios } from "./Modal";

export const TablaUsuarios = () => {
  const [value, setValue] = useState(0);
  const usuarios = useUsuarioStore((state) => state.tablaUsuarios);
  const setUsuarios = useUsuarioStore((state) => state.setTablaUsuarios);
  const loading = useUsuarioStore((state) => state.loading);
  const setLoading = useUsuarioStore((state) => state.setLoading);
  const getUsuariosData = async () => {
    const usuarios = await getUsuarios();
    setUsuarios(usuarios);
  };
  console.log(usuarios);
  useEffect(() => {
    getUsuariosData();
    setLoading(false);
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 100 : v + 10));
    }, 100);
    return () => clearInterval(interval);
  }, []);
  const loadingState = loading || usuarios.length === 0 ? "loading" : "idle";

  const [page, setPage] = useState(1);
  const rowsPerPage = 4;
  const pages = Math.ceil(usuarios.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return usuarios.slice(start, end);
  }, [page, usuarios]);

  type User = (typeof items)[0];

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "id":
        return <p> {usuarios.length}</p>;
      case "usuario":
        return <p> {user.usuario} </p>;
      case "nombre":
        return <p> {user.nombre} </p>;
      case "rol":
        return <p> {capitalizar(user.rol)} </p>;
      case "acciones":
        return (
          <div className="relative flex items-center gap-3">
            <ModalEditarUsuarios idUser={user.id} />

            <Tooltip color="danger" content="Eliminar">
              <span className="cursor-pointer text-lg text-danger active:opacity-50">
                <Icon icon="mdi:delete" width={25} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "usuario",
      label: "Usuario",
    },
    {
      key: "nombre",
      label: "Nombre",
    },
    {
      key: "email",
      label: "Correo",
    },
    {
      key: "rol",
      label: "Rol",
    },
    {
      key: "acciones",
      label: "Acciones",
    },
  ];
  if (loading) return <Spinner />;
  return (
    <Table
      aria-label="Tabla de usuarios"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
      isStriped
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} className="text-md">
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={usuarios}
        loadingContent={
          <CircularProgress
            label="Cargando..."
            size="lg"
            value={value}
            color="primary"
            showValueLabel={true}
          />
        }
        loadingState={loadingState}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell className="text-base">
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
