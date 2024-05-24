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
import { columns } from "./dataTable/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  ModalEditarDireccion,
  ModalEliminarDireccion,
  ModalAgregarDireccion,
} from "./Modal";
import { useCallback, useMemo } from "react";
import { useTableDirecciones } from "hooks/useTableDirecciones";
import { useDireccionStore } from "../../../../store/direcciones/direcciones";

export const TablaDirecciones = () => {
  const direcciones = useDireccionStore((state) => state.data);

  const {
    value,
    getDirecciones,
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
  } = useTableDirecciones(direcciones);

  interface Direccion {
    id: string;
    nombre: string;
    municipio: string;
    departamento: string;
  }

  interface Column {
    key: string;
    label: string;
    sortable?: boolean;
  }

  const renderCell = useCallback(
    (direccion: Direccion, columnKey: Column) => {
      const cellValue = direccion[columnKey];

      switch (columnKey) {
        case "id":
          return <p>{direccion.index}</p>;
        case "nombre":
          return <p>{direccion.nombre}</p>;
        case "municipio":
          return <p>{direccion.municipio}</p>;
        case "departamento":
          return <p>{direccion.departamento}</p>;
        case "acciones":
          return (
            <div className="relative flex items-center gap-3">
              <ModalEditarDireccion
                idDireccion={direccion.id}
                updateTable={getDirecciones}
              />
              <ModalEliminarDireccion
                idDireccion={direccion.id}
                updateTable={getDirecciones}
              />
            </div>
          );
        default:
          return cellValue;
      }
    },
    [getDirecciones, direcciones],
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex w-full flex-col gap-3">
            <Input
              label="Buscar por dirección: "
              isClearable
              classNames={{
                base: "w-full sm:max-w-[44%]",
                inputWrapper: "border-1",
              }}
              placeholder="dirección..."
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
              Total de direcciones: {direcciones.length}
            </span>
          </div>

          <div className="flex w-1/5 flex-col items-end justify-center gap-2">
            <ModalAgregarDireccion updateTable={getDirecciones} />
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
    direcciones.length,
    onClear,
    filterValue,
    onSearchChange,
  ]);

  return (
    <Table
      aria-label="Tabla de direcciones"
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
            ? `No se encontraron direcciones con el nombre: ${filterValue}`
            : "No hay direcciones registradas"
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
