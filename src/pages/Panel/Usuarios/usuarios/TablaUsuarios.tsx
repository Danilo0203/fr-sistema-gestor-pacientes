import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  CircularProgress,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import { capitalizar } from "../../../../utils/capitalizarStrings";
import { columns } from "./dataTable/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  ModalAgregarUsuarios,
  ModalEditarUsuarios,
  ModalEliminarUsuarios,
} from "./Modal";
import { useCallback, useMemo } from "react";
import { useTableUser } from "hooks/useTableUser";
import { useUsuarioStore } from "../../../../store/usuarios";

export const TablaUsuarios = () => {
  const usuarios = useUsuarioStore((state) => state.data);
  const {
    value,
    getUsuarios,
    pagina,
    setPagina,
    sortDescriptor,
    setSortDescriptor,
    filterValue,
    loadingState,
    paginas,
    ordenarItems,
    onRowsPerPageChange,
    onSearchChange,
    onClear,
  } = useTableUser(usuarios);

  interface User {
    id: string;
    usuario: string;
    nombre: string;
    email: string;
    rol: string;
  }
  interface Column {
    key: string;
    label: string;
    sortable?: boolean;
  }

  const renderCell = useCallback((user: User, columnKey: Column) => {
    const cellValue = user[columnKey];
    const id = usuarios.findIndex((u) => u.id === user.id) + 1;
    switch (columnKey) {
      case "id":
        return <p>{id}</p>;

      case "usuario":
        return <p> {user.usuario} </p>;
      case "nombre":
        return <p> {user.nombre} </p>;
      case "rol":
        return <p> {capitalizar(user.rol)} </p>;
      case "acciones":
        return (
          <div className="relative flex items-center gap-3">
            <ModalEditarUsuarios idUser={user.id} updateTable={getUsuarios} />
            <ModalEliminarUsuarios idUser={user.id} updateTable={getUsuarios} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex w-full flex-col gap-3">
            <Input
              label="Buscar por nombre de usuario"
              isClearable
              classNames={{
                base: "w-full sm:max-w-[44%]",
                inputWrapper: "border-1",
              }}
              placeholder="usuario..."
              size="md"
              value={filterValue}
              variant="bordered"
              onClear={onClear}
              key="outside"
              labelPlacement="outside"
              onValueChange={onSearchChange}
              startContent={<Icon icon="mdi:account-search" width={20} />}
            />

            <span className="text-small">
              Total de usuarios {usuarios.length}
            </span>
          </div>
          <div className="flex w-1/5 flex-col items-end justify-center gap-2">
            <ModalAgregarUsuarios updateTable={getUsuarios} />

            <Select
              label="Filas por página"
              className="max-w-xs"
              onChange={onRowsPerPageChange}
              size="sm"
            >
              <SelectItem key="5" value="5">
                5
              </SelectItem>
              <SelectItem key="10" value="10">
                10
              </SelectItem>
              <SelectItem key="15" value="15">
                15
              </SelectItem>
            </Select>
          </div>
        </div>
      </div>
    );
  }, [
    onRowsPerPageChange,
    usuarios.length,
    onClear,
    filterValue,
    onSearchChange,
  ]);

  return (
    <Table
      aria-label="Tabla de usuarios"
      isStriped
      removeWrapper
      onSortChange={setSortDescriptor}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      bottomContent={
        paginas > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              page={pagina}
              total={paginas}
              onChange={(pagina) => setPagina(pagina)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            className="text-md"
            allowsSorting={column.sortable}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={ordenarItems ?? []}
        emptyContent={
          ordenarItems.length > 0
            ? `No se encontraron el usuario ingresado ${filterValue}`
            : "No se encontraron usuarios registrados"
        }
        loadingContent={
          <CircularProgress
            label="Cargando..."
            size="lg"
            value={value}
            color="primary"
            showValueLabel={true}
            className="pt-28"
          />
        }
        loadingState={loadingState}
      >
        {(item) => (
          <TableRow key={item.name}>
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
