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
  ModalAgregarEstadoCivil,
  ModalEditarEstadoCivil,
  ModalEliminarEstadoCivil,
} from "./Modal";
import { useTableEstadoCiviles } from "hooks/useTableEstadoCiviles";
import { useEstadoCivilStore } from "../../../../store/pacientes/estadoCivil";

export const TablaEstadoCiviles = () => {
  const estadoCiviles = useEstadoCivilStore((state) => state.data);
  const {
    value,
    getEstadoCiviles,
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
  } = useTableEstadoCiviles(estadoCiviles);

  interface EstadoCivil {
    id: string;
    nombre: string;
  }

  interface Column {
    key: string;
    label: string;
    sortable?: boolean;
  }

  const renderCell = useCallback(
    (estadoCivil: EstadoCivil, columnKey: Column) => {
      const cellValue = estadoCivil[columnKey];
      const id = estadoCiviles.findIndex((u) => u.id === estadoCivil.id) + 1;

      switch (columnKey) {
        case "id":
          return <p>{estadoCivil.index}</p>;
        case "estadoCivil":
          return <p>{estadoCivil.nombre}</p>;
        case "acciones":
          return (
            <div className="relative flex items-center gap-3">
              <ModalEditarEstadoCivil
                idEstadoCivil={estadoCivil.id}
                updateTable={getEstadoCiviles}
              />
              <ModalEliminarEstadoCivil
                idEstadoCivil={estadoCivil.id}
                updateTable={getEstadoCiviles}
              />
            </div>
          );
        default:
          return cellValue;
      }
    },
    [getEstadoCiviles],
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex w-full flex-col gap-3">
            <Input
              label="Buscar por estado civil:"
              isClearable
              classNames={{
                base: "w-full sm:max-w-[44%]",
                inputWrapper: "border-1",
              }}
              placeholder="estado civil..."
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
              Total de estados civiles: {estadoCiviles.length}
            </span>
          </div>
          <div className="flex w-1/5 flex-col items-end justify-center gap-2">
            <ModalAgregarEstadoCivil updateTable={getEstadoCiviles} />

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
    estadoCiviles.length,
    onClear,
    filterValue,
    onSearchChange,
    getEstadoCiviles,
  ]);

  return (
    <Table
      aria-label="Tabla de estados civiles"
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
            ? `No se encontró el estado civil ${filterValue}`
            : "No hay estados civiles registrados"
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
