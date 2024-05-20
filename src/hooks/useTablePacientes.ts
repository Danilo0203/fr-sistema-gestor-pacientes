import { useCallback, useEffect, useMemo, useState } from "react";
import { SortDescriptor } from "@nextui-org/react";
import { usePacienteStore } from "../store/pacientes/pacientes";
import { usePacienteCitasStore } from "../store/pacientes/pacientesCitas";

export const useTablePacientes = (pacientes) => {
  const getPacientes = usePacienteStore((state) => state.execute);
  const dataCitas = usePacienteCitasStore((state) => state.data);
  const getCitas = usePacienteCitasStore((state) => state.execute);
  const loading = usePacienteStore((state) => state.loading);
  const [value, setValue] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [filasPorPagina, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

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
    statusCita: dataCitas,
  };
};
