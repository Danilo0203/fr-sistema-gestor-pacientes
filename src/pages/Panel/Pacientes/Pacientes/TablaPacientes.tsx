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
import { useMemo } from "react";
import { columns } from "./dataTable/data";
import {
  ModalAgregarPaciente,
  ModalEditarPaciente,
  ModalEliminarPaciente,
} from "./Modal";
import { useTablePacientes } from "hooks/useTablePacientes";
import { usePacienteStore } from "../../../../store/pacientes/pacientes";
import { BotonCitas } from "components/ui/Botones/BotonCitas";
import { useAuthStore } from "../../../../store/auth";

export const TablaPacientes = () => {
  const pacientes = usePacienteStore((state) => state.data);
  const rol = useAuthStore(
    (state) => state.profile.rol.nombre,
  ).toLocaleLowerCase();
  const {
    value,
    getPanel,
    getPacientes,
    getPanelRecepcion,
    getCitas,
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
    statusCita,
  } = useTablePacientes(pacientes);

  interface Paciente {
    id: string;
    nombre: string;
    apellido: string;
    fecha_nacimiento: string;
    direccion: string;
    municipio: string;
  }

  interface Column {
    key: string;
    label: string;
    sortable?: boolean;
  }

  const renderCell = (paciente: Paciente, columnKey: Column) => {
    const cellValue = paciente[columnKey];

    // Mostrar la edad del paciente en lugar de la fecha de nacimiento
    const fechaNacimiento = new Date(paciente.fecha_nacimiento);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }

    const cita = (id) => {
      const cita = statusCita.find((cita) => cita.pacienteID === id);
      return cita?.atender == 1 ? "Activo" : "Inactivo";
    };

    switch (columnKey) {
      case "id":
        return <p>{paciente.index}</p>;
      case "nombre":
        return <p>{paciente.nombre}</p>;
      case "apellido":
        return <p>{paciente.apellido}</p>;
      case "fechaNacimiento":
        return <p>{edad} años</p>;
      case "direccion":
        return (
          <p>
            {paciente.direccion}, {paciente.municipio}
          </p>
        );
      case "citas":
        return (
          <BotonCitas
            idPaciente={paciente.id}
            boton={cita(paciente.id)}
            updateTable={getPacientes}
            updateCita={getCitas}
            updateRecepcion={getPanelRecepcion}
            statusCita={statusCita}
          />
        );
      case "acciones":
        return (
          <div className="flex flex-row-reverse items-center justify-end gap-3">
            {rol === "administrador" && (
              <ModalEliminarPaciente
                idPaciente={paciente.id}
                updateTable={getPacientes}
                updateRecepcion={getPanel}
              />
            )}
            <ModalEditarPaciente
              idPaciente={paciente.id}
              updateTable={getPacientes}
            />
          </div>
        );
      default:
        return cellValue;
    }
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex w-full flex-col gap-3">
            <Input
              label="Buscar por paciente:"
              isClearable
              classNames={{
                base: "w-full sm:max-w-[44%]",
                inputWrapper: "border-1",
              }}
              placeholder="paciente..."
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
              Total de pacientes: {pacientes.length}
            </span>
          </div>

          <div className="flex w-1/5 flex-col items-end justify-center gap-2">
            <ModalAgregarPaciente updateTable={getPacientes} />
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
    pacientes.length,
    onClear,
    filterValue,
    onSearchChange,
    getPacientes,
  ]);

  return (
    <Table
      aria-label="Tabla de pacientes"
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
            ? `No se encontró el paciente: ${filterValue}`
            : "No hay pacientes registrados"
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
