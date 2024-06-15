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
} from "@nextui-org/react";

import { useCallback, useEffect, useMemo } from "react";
import { columns } from "./dataTable/data";
import { ModalAgregarPaciente } from "./Modal";
import { useTableRecepcion } from "hooks/useTableRecepcion";
import { usePacienteStore } from "../../../../store/pacientes/pacientes";
import { BotonCitas } from "components/ui/Botones/BotonCitas";
import { usePanelStore } from "../../../../store/panel/usePanelStore";
import { useAuthStore } from "../../../../store/auth";

export const TablaAtender = ({ BotonAcciones }) => {
  const pacientes = usePacienteStore((state) => state.data);
  const pacienteAtender = usePanelStore((state) => state.dataNoAtendidos);
  const getPanel = usePanelStore((state) => state.init);
  const dataPacientes = usePanelStore((state) => state.dataPacientes);
  const pacientesYaAtendidos = usePanelStore((state) => state.dataAtendidos);
  const rol = useAuthStore(
    (state) => state.profile.rol.nombre,
  ).toLocaleLowerCase();

  // Crea una funcion que compare el array de dataPacientes con el array de pacientesYaAtendidos
  // y devuelve un array con los pacientes que no estan en el array de pacientesYaAtendidos
  const pacientesNoAtendidos = dataPacientes.filter(
    (paciente) =>
      !pacientesYaAtendidos.some((atendido) => atendido.id === paciente.id),
  );

  const userID = useAuthStore((state) => state.profile.id);

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
  const cita = useCallback(
    (id: number) => {
      const citas = statusCita.find((cita) => cita.pacienteID === id);
      return citas?.atender === 1 ? "Activo" : "Inactivo";
    },
    [statusCita],
  );

  const renderCell = (paciente: Paciente, columnKey: Column) => {
    const cellValue = paciente[columnKey];

    switch (columnKey) {
      case "id":
        return <p>{paciente.index}</p>;
      case "nombre":
        return <p>{paciente.nombre}</p>;
      case "apellido":
        return <p>{paciente.apellido}</p>;
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
            <BotonAcciones idPaciente={paciente.id} userID={userID} />
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
            defaultItems={pacientesNoAtendidos}
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
          {rol !== "administrador" ? (
            <ModalAgregarPaciente
              updateTable={getPacientes}
              updateRecepcion={executePanel}
            />
          ) : null}
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
  }, [
    pacientes.length,
    getPacientes,
    dataPacientes,
    executePanel,
    getCitas,
    cita,
    rol,
  ]);

  return (
    <Table
      aria-label="Tabla de pacientes"
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
