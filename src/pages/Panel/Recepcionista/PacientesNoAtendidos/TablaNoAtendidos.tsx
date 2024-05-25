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
  Autocomplete,
  AutocompleteItem,
  Button,
} from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useMemo } from "react";
import { columns } from "./dataTable/data";
import {
  ModalAgregarPaciente,
  ModalEditarPaciente,
  ModalEliminarPaciente,
} from "./Modal";
import { useTableRecepcion } from "hooks/useTableRecepcion";
import { usePacienteStore } from "../../../../store/pacientes/pacientes";
import { BotonCitas } from "components/ui/Botones/BotonCitas";
import { usePanelStore } from "../../../../store/panel/usePanelStore";

export const TablaNoAtendidos = () => {
  const pacientes = usePacienteStore((state) => state.data);
  const pacientesNoAtendidos = usePanelStore((state) => state.dataAtendidos);

  const getPanel = usePanelStore((state) => state.init);
  const dataPacientes = usePanelStore((state) => state.dataPacientes);
  useEffect(() => {
    getPanel();
  }, [getPanel]);

  const {
    value,
    getPacientes,
    getPanel: executePanel,
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
  } = useTableRecepcion(pacientesNoAtendidos);

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
            updateRecepcion={executePanel}
            updateCita={getCitas}
          />
        );

      default:
        return cellValue;
    }
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Pacientes Atendidos</h2>
      </div>
    );
  }, []);

  return (
    <Table
      aria-label="Tabla de pacientes"
      isStriped
      // removeWrapper
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
            : "No hay pacientes atendidos"
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
