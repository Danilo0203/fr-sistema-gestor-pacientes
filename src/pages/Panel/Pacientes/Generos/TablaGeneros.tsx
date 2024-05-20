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
  ModalAgregarGenero,
  ModalEditarGenero,
  ModalEliminarGenero,
} from "./Modal";
import { useTableGeneros } from "hooks/useTableGeneros";
import { useGeneroStore } from "../../../../store/pacientes/generos";

export const TablaGeneros = () => {
  const generos = useGeneroStore((state) => state.data);
  const {
    value,
    getGeneros,
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
  } = useTableGeneros(generos);

  interface Genero {
    id: string;
    nombre: string;
  }

  interface Column {
    key: string;
    label: string;
    sortable?: boolean;
  }

  const renderCell = useCallback(
    (genero: Genero, columnKey: Column) => {
      const cellValue = genero[columnKey];
      const id = generos.findIndex((u) => u.id === genero.id) + 1;

      switch (columnKey) {
        case "id":
          return <p>{id}</p>;
        case "genero":
          return <p>{genero.nombre}</p>;
        case "acciones":
          return (
            <div className="relative flex items-center gap-3">
              <ModalEditarGenero
                idGenero={genero.id}
                updateTable={getGeneros}
              />
              <ModalEliminarGenero
                idGenero={genero.id}
                updateTable={getGeneros}
              />
            </div>
          );
        default:
          return cellValue;
      }
    },
    [getGeneros, generos],
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex w-full flex-col gap-3">
            <Input
              label="Buscar por género:"
              isClearable
              classNames={{
                base: "w-full sm:max-w-[44%]",
                inputWrapper: "border-1",
              }}
              placeholder="género..."
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
              Total de géneros: {generos.length}
            </span>
          </div>
          <div className="flex w-1/5 flex-col items-end justify-center gap-2">
            <ModalAgregarGenero updateTable={getGeneros} />
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
    generos.length,
    onClear,
    filterValue,
    onSearchChange,
    getGeneros,
  ]);

  return (
    <Table
      aria-label="Tabla de géneros"
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
            ? `No se encontró el género: ${filterValue}`
            : "No se encontraron géneros registrados"
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
