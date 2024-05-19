import { useCallback, useEffect, useMemo, useState } from "react";
import { SortDescriptor } from "@nextui-org/react";
import { useProfesionStore } from "../store/pacientes/profesiones";

export const useTableProfesiones = (profesiones) => {
  const getProfesiones = useProfesionStore((state) => state.execute);
  const loading = useProfesionStore((state) => state.loading);
  const [value, setValue] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [filasPorPagina, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  // Funcion para filtrar profesiones por nombre
  const filtrarProfesionPorNombre = useMemo(() => {
    let filtrarProfesiones = [...profesiones];
    filtrarProfesiones = filtrarProfesiones.filter((user) =>
      user.nombre.toLowerCase().includes(filterValue.toLowerCase()),
    );
    return filtrarProfesiones;
  }, [profesiones, filterValue]);

  // Funcion para obtener profesiones
  useEffect(() => {
    getProfesiones();
  }, [getProfesiones]);

  // Funcion para esperar la respuesta de la API
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 100 : v + 10));
    }, 100);
    return () => clearInterval(interval);
  }, [profesiones]);

  // Estado de carga
  const loadingState = loading ? "loading" : "idle";

  // Calcular el número de páginas total
  const paginas = Math.ceil(filtrarProfesionPorNombre?.length / filasPorPagina);

  // Calcular las filas a mostrar en la tabla
  const items = useMemo(() => {
    const start = (pagina - 1) * filasPorPagina;
    const end = start + filasPorPagina;

    return filtrarProfesionPorNombre?.slice(start, end);
  }, [pagina, filasPorPagina, filtrarProfesionPorNombre]);

  // Ordenar los items de la tabla
  const ordenarItems = useMemo(() => {
    return [...items].sort((a: Profesion, b: Profesion) => {
      const first = a[sortDescriptor.column as keyof Profesion] as number;
      const second = b[sortDescriptor.column as keyof Profesion] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  // Tipo de datos de profesion
  type Profesion = (typeof items)[number];

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
    getProfesiones,
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
  };
};
