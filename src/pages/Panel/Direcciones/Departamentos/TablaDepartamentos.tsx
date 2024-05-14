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
import { ModalEditarDepartamento, ModalEliminarDepartamento } from "./Modal";
import { useTableDepartamento } from "hooks/useTableDepartamentos";
import { useDepartamentoStore } from "../../../../store/direcciones/departamentos";

export const TablaDepartamentos = () => {
  const departamentos = useDepartamentoStore((state) => state.data);
  const {
    value,
    getDepartamentos,
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
  } = useTableDepartamento(departamentos);

  interface Departamento {
    id: string;
    departamento: string;
  }

  interface Column {
    key: string;
    label: string;
    sortable?: boolean;
  }

  const renderCell = useCallback(
    (departamento: Departamento, columnKey: Column) => {
      const cellValue = departamento[columnKey];

      switch (columnKey) {
        case "departamento":
          return <p>{departamento.nombre}</p>;
        case "acciones":
          return (
            <div className="relative flex items-center gap-3">
              <ModalEditarDepartamento
                idDepartamento={departamento.id}
                updateTable={getDepartamentos}
              />
              <ModalEliminarDepartamento
                idDepartamento={departamento.id}
                updateTable={getDepartamentos}
              />
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex w-full flex-col gap-3">
            <Input
              label="Buscar por departamento:"
              isClearable
              classNames={{
                base: "w-full sm:max-w-[44%]",
                inputWrapper: "border-1",
              }}
              placeholder="departamento..."
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
              Total de departamentos {departamentos.length}
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
    departamentos.length,
    onClear,
    filterValue,
    onSearchChange,
  ]);

  return (
    <Table
      aria-label="Tabla de departamentos"
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
        emptyContent={`No se encontró el departamento ${filterValue}`}
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
