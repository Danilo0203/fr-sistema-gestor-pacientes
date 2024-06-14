import { useCallback, useEffect, useMemo, useState } from "react";
import { SortDescriptor } from "@nextui-org/react";
import { usePacienteStore } from "../store/pacientes/pacientes";
import { usePacienteCitasStore } from "../store/pacientes/pacientesCitas";
import { useDireccionStore } from "../store/direcciones/direcciones";
import { useGeneroStore } from "../store/pacientes/generos";
import { useProfesionStore } from "../store/pacientes/profesiones";
import { useEstadoCivilStore } from "../store/pacientes/estadoCivil";
import { useDepartamentoStore } from "../store/direcciones/departamentos";
import { useMunicipioStore } from "../store/direcciones/municipios";
import { usePanelStore } from "../store/panel/usePanelStore";
import { useDatosMedicosStore } from "../store/datosMedicos/datosMedicos";

export const useTableRecepcion = (pacientes) => {
  const initPacientes = usePacienteStore((state) => state.init);
  const initCitas = usePacienteCitasStore((state) => state.init);
  const initDirecciones = useDireccionStore((state) => state.init);
  const initGeneros = useGeneroStore((state) => state.init);
  const initProfesiones = useProfesionStore((state) => state.init);
  const initEstadoCivil = useEstadoCivilStore((state) => state.init);
  const initDepto = useDepartamentoStore((state) => state.init);
  const initMuni = useMunicipioStore((state) => state.init);
  const initDatosMedicos = useDatosMedicosStore((state) => state.init);
  const getPacientes = usePacienteStore((state) => state.execute);
  const getPanel = usePanelStore((state) => state.execute);
  const getCitas = usePacienteCitasStore((state) => state.execute);
  const dataCitas = usePacienteCitasStore((state) => state.data);
  const loading = usePacienteStore((state) => state.loading);
  const [value, setValue] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [filasPorPagina, setRowsPerPage] = useState(20);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  useEffect(() => {
    initPacientes();
    initCitas();
    initDirecciones();
    initGeneros();
    initProfesiones();
    initEstadoCivil();
    initDepto();
    initMuni();
    initDatosMedicos();
  }, [
    initPacientes,
    initCitas,
    initDirecciones,
    initGeneros,
    initProfesiones,
    initEstadoCivil,
    initDepto,
    initMuni,
    initDatosMedicos,
  ]);

  // Funcion para filtrar pacientes por nombre
  const filtrarPacientePorNombre = useMemo(() => {
    let filtrarPacientes = [...pacientes];
    filtrarPacientes = filtrarPacientes.filter((user) =>
      user.nombre.toLowerCase().includes(filterValue.toLowerCase()),
    );
    return filtrarPacientes;
  }, [pacientes, filterValue]);

  // Funcion para esperar la respuesta de la API
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 100 : v + 10));
    }, 100);
    return () => clearInterval(interval);
  }, [pacientes]);

  // Estado de carga
  const loadingState = loading ? "loading" : "idle";

  // Calcular el número de páginas total
  const paginas = Math.ceil(filtrarPacientePorNombre?.length / filasPorPagina);

  // Calcular las filas a mostrar en la tabla
  const items = useMemo(() => {
    const start = (pagina - 1) * filasPorPagina;
    const end = start + filasPorPagina;

    return filtrarPacientePorNombre?.slice(start, end);
  }, [pagina, filasPorPagina, filtrarPacientePorNombre]);

  // Ordenar los items de la tabla
  const ordenarItems = useMemo(() => {
    return [...items].sort((a: Paciente, b: Paciente) => {
      const first = a[sortDescriptor.column as keyof Paciente] as number;
      const second = b[sortDescriptor.column as keyof Paciente] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  // Calcular el indice de los items
  const itemsConIndices = useMemo(() => {
    const startIndex = (pagina - 1) * filasPorPagina;
    return ordenarItems.map((item, index) => ({
      ...item,
      index: startIndex + index + 1,
    }));
  }, [ordenarItems, pagina, filasPorPagina]);

  // Tipo de dato Pacientes
  type Paciente = (typeof items)[number];

  // Funcion para cambiar el numero de filas por pagina
  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPagina(1);
    },
    [],
  );

  // Funcion para buscar generos por nombre
  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPagina(1);
    } else {
      setFilterValue("");
    }
  }, []);

  //
  const onClear = useCallback(() => {
    setFilterValue("");
    setPagina(1);
  }, []);

  return {
    value,
    getPacientes,
    getPanel,
    getCitas,
    pagina,
    setPagina,
    sortDescriptor,
    setSortDescriptor,
    filterValue,
    loadingState,
    paginas,
    ordenarItems: itemsConIndices,
    onRowsPerPageChange,
    onSearchChange,
    onClear,
    statusCita: dataCitas,
  };
};
