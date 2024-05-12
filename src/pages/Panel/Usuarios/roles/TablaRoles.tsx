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
// import { capitalizar } from "../../../../utils/capitalizarStrings";
import { columns } from "./dataTable/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ModalEditarRoles, ModalEliminarRoles } from "./Modal";
import { useCallback, useMemo } from "react";
import { useTableRol } from "hooks/useTableRol";
import { useRolStore } from "../../../../store/usuarios/roles";

export const TablaRoles = () => {
  const roles = useRolStore((state) => state.data);
  const {
    value,
    getRoles,
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
  } = useTableRol(roles);

  interface Rol {
    id: string;
    rol: string;
    descripcion: string;
  }
  interface Column {
    key: string;
    label: string;
    sortable?: boolean;
  }

  const renderCell = useCallback((rol: Rol, columnKey: Column) => {
    const cellValue = rol[columnKey];

    switch (columnKey) {
      // case "id":
      //   let elementos: JSX.Element[] = [];
      //   for (let i = 0; i < usuarios.length; i++) {
      //     // Crear una etiqueta <p> para cada número de usuario y nombre
      //     elementos.push(<p key={i}>{i + 1}</p>);
      //   }
      //   return elementos;

      case "rol":
        return <p> {rol.nombre} </p>;
      case "descripcion":
        return <p> {rol.descripcion} </p>;
      case "acciones":
        return (
          <div className="relative flex items-center gap-3">
            <ModalEditarRoles idRol={rol.id} updateTable={getRoles} />
            <ModalEliminarRoles idRol={rol.id} updateTable={getRoles} />
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
              label="Buscar por rol"
              isClearable
              classNames={{
                base: "w-full sm:max-w-[44%]",
                inputWrapper: "border-1",
              }}
              placeholder="rol..."
              size="md"
              value={filterValue}
              variant="bordered"
              onClear={onClear}
              key="outside"
              labelPlacement="outside"
              onValueChange={onSearchChange}
              startContent={<Icon icon="mdi:account-search" width={20} />}
            />

            <span className="text-small">Total de usuarios {roles.length}</span>
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
  }, [onRowsPerPageChange, roles.length, onClear, filterValue, onSearchChange]);

  return (
    <Table
      aria-label="Tabla de roles"
      isStriped
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
        emptyContent={`No se encontro el rol ${filterValue}`}
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
