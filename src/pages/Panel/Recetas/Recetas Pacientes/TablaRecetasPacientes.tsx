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
import { useCallback, useEffect, useMemo } from "react";
import { columns } from "./dataTable/data";

import { useRecetasStore } from "../../../../store/recetas/recetas";
import { BtnVerRecetaPaciente } from "./Modal";
import { Outlet, useLocation } from "react-router-dom";
import { useRecetasPacienteStore } from "../../../../store/recetas/recetasPaciente";
import { usePacienteStore } from "../../../../store/pacientes/pacientes";
import { useTableRecetaspaciente } from "hooks/useTableRecetaspaciente";

export const TablaRecetasPacientes = () => {
  const { pathname } = useLocation();

  const initReceta = useRecetasPacienteStore((state) => state.execute);
  const executePacientes = usePacienteStore((state) => state.init);
  useEffect(() => {
    executePacientes();
    initReceta();
  }, [initReceta, executePacientes]);
  const recetasPacientes = useRecetasPacienteStore((state) => state.data);

  const {
    value,
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
  } = useTableRecetaspaciente(recetasPacientes);

  interface Receta {
    id: string;
    fecha: string;
    usuario: string;
    usuarioID: string;
  }

  interface Column {
    key: string;
    label: string;
    sortable?: boolean;
  }

  const renderCell = useCallback((receta: Receta, columnKey: Column) => {
    const cellValue = receta[columnKey];

    switch (columnKey) {
      case "id":
        return <p>{receta.recetaID}</p>;
      case "fecha":
        return <p>{receta.recetaFecha}</p>;
      case "usuario":
        return (
          <p>
            {receta.pacienteNombre} {receta.pacienteApellido}{" "}
          </p>
        );
      case "acciones":
        return (
          <div className="flex items-center justify-center gap-3">
            <BtnVerRecetaPaciente
              idReceta={receta.recetaID}
              idUsuario={receta.usuarioID}
            />
          </div>
        );
      default:
        return <p>{cellValue}</p>;
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex w-full flex-col gap-3">
            <Input
              label="Buscar por nombre de paciente:"
              isClearable
              classNames={{
                base: "w-full sm:max-w-[44%]",
                inputWrapper: "border-1",
              }}
              placeholder="Nombre del paciente..."
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
              Total de recetas: {recetasPacientes.length}
            </span>
          </div>

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
    );
  }, [
    onRowsPerPageChange,
    recetasPacientes.length,
    onClear,
    filterValue,
    onSearchChange,
  ]);

  const TablaRecetaPacientes = () => {
    return (
      <Table
        aria-label="Tabla de recetas médicas"
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
              ? `No se encontró la receta médica: ${filterValue}`
              : "No se encontraron las recetas médicas registrados"
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

  return (
    <>
      {pathname.includes("paciente/") ? <Outlet /> : <TablaRecetaPacientes />}
    </>
  );
};
