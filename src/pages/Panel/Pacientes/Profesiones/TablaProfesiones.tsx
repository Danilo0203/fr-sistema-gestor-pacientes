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
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCallback, useMemo } from "react";
import { columns } from "./dataTable/data";
import {
  ModalAgregarProfesion,
  ModalEditarProfesion,
  ModalEliminarProfesion,
} from "./Modal";
import { useTableProfesiones } from "hooks/useTableProfesiones";
import { useProfesionStore } from "../../../../store/pacientes/profesiones";

export const TablaProfesiones = () => {
  const profesiones = useProfesionStore((state) => state.data);
  const {
    value,
    getProfesiones,
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
  } = useTableProfesiones(profesiones);

  interface Profesion {
    id: string;
    nombre: string;
  }

  interface Column {
    key: string;
    label: string;
    sortable?: boolean;
  }

  const renderCell = useCallback(
    (profesion: Profesion, columnKey: Column) => {
      const cellValue = profesion[columnKey];
      const id = profesiones.findIndex((u) => u.id === profesion.id) + 1;

      switch (columnKey) {
        case "id":
          return <p>{id}</p>;
        case "profesion":
          return <p>{profesion.nombre}</p>;
        case "acciones":
          return (
            <div className="relative flex items-center gap-3">
              <ModalEditarProfesion
                idProfesion={profesion.id}
                updateTable={getProfesiones}
              />
              <ModalEliminarProfesion
                idProfesion={profesion.id}
                updateTable={getProfesiones}
              />
            </div>
          );
        default:
          return cellValue;
      }
    },
    [getProfesiones],
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex w-full flex-col gap-3">
            <Input
              label="Buscar por profesión:"
              isClearable
              classNames={{
                base: "w-full sm:max-w-[44%]",
                inputWrapper: "border-1",
              }}
              placeholder="profesión..."
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
              Total de profesiones: {profesiones.length}
            </span>
          </div>
          <div className="flex w-1/5 flex-col items-end justify-center gap-2">
            <ModalAgregarProfesion updateTable={getProfesiones} />
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
    profesiones.length,
    onClear,
    filterValue,
    onSearchChange,
    getProfesiones,
  ]);

  return (
    <Table
      aria-label="Tabla de profesiones"
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
            ? `No se encontró la profesión: ${filterValue}`
            : "No se encontraron profesiones resgitradas"
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
