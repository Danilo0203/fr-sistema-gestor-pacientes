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
import { useCallback, useMemo } from "react";
import { capitalizar } from "../../../utils/capitalizarStrings";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ModalEditarUsuarios, ModalEliminarUsuarios } from "./Modal";
import { columns } from "./dataTable/data";
import { useTableUser } from "hooks/useTableUser";

export const TablaUsuarios = () => {
  const {
    value,
    getUsuarios,
    usuarios,
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
  } = useTableUser();

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

    switch (columnKey) {
      // case "id":
      //   let elementos: JSX.Element[] = [];
      //   for (let i = 0; i < usuarios.length; i++) {
      //     // Crear una etiqueta <p> para cada número de usuario y nombre
      //     elementos.push(<p key={i}>{i + 1}</p>);
      //   }
      //   return elementos;

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

          <Select
            label="Filas por página"
            className="max-w-xs"
            onChange={onRowsPerPageChange}
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
      isStriped
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
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
        emptyContent={`No se encontraron el usuario ingresado ${filterValue}`}
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
