import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  CircularProgress,
  Autocomplete,
  AutocompleteItem,
  Button,
} from "@nextui-org/react";

import { useEffect, useMemo } from "react";
import { columns } from "./dataTable/data";
import { ModalAgregarPaciente } from "./Modal";
import { useTableRecepcion } from "hooks/useTableRecepcion";
import { usePacienteStore } from "../../../../store/pacientes/pacientes";
import { BotonCitas } from "components/ui/Botones/BotonCitas";
import { usePanelStore } from "../../../../store/panel/usePanelStore";

export const TablaAtender = () => {
  const pacientes = usePacienteStore((state) => state.data);
  const pacienteAtender = usePanelStore((state) => state.dataNoAtendidos);
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
    statusCita,
  } = useTableRecepcion(pacienteAtender);

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
  const cita = (id: number) => {
    const citas = statusCita.find((cita) => cita.pacienteID === id);
    return citas?.atender === 1 ? "Activo" : "Inactivo";
  };

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
      case "acciones":
        return (
          <div className="relative flex items-center gap-3">
            <Button className="bg-azulFuerte text-white">
              Actualizar datos medicos
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex  items-end justify-between gap-2">
          <Autocomplete
            defaultItems={dataPacientes}
            aria-label="Tabla Pacientes Atender"
            variant="underlined"
            label="Buscar por paciente para atender:"
            className="w-1/2"
            size="lg"
          >
            {(item) => (
              <AutocompleteItem key={item.id} textValue={item.nombre}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <span className="text-small">
                        {item.nombre} {item.apellido}
                      </span>
                    </div>
                  </div>
                  <BotonCitas
                    idPaciente={item.id}
                    boton={cita(item.id)}
                    updateTable={getPacientes}
                    updateRecepcion={executePanel}
                    updateCita={getCitas}
                  />
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>

          <ModalAgregarPaciente updateTable={getPacientes} updateRecepcion={executePanel} />
        </div>

        <h2 className="text-2xl font-bold">Cola de pacientes</h2>

        <div className="flex items-center justify-between">
          <div className="flex w-full flex-col gap-3">
            <span className="text-small">
              Total de pacientes: {pacientes.length}
            </span>
          </div>
        </div>
      </div>
    );
  }, [pacientes.length, getPacientes, dataPacientes, executePanel, getCitas]);

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
            : "No hay pacientes para atender"
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
