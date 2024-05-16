import { useCallback, useEffect, useMemo, useState } from "react";
import { SortDescriptor } from "@nextui-org/react";
import { useDatosMedicosStore } from "../store/datosMedicos/datosMedicos";

export const useTableDatosMedicos = (datosMedicos) => {
  const getDatosMedicos = useDatosMedicosStore((state) => state.execute);
  const loading = useDatosMedicosStore((state) => state.loading);
  const [value, setValue] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [filasPorPagina, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "nombre",
    direction: "ascending",
  });

  // Funcion para filtrar datos medicos por nombre
  const filtrarDatosMedicosPorNombre = useMemo(() => {
    let filtrarDatosMedicos = [...datosMedicos];
    filtrarDatosMedicos = filtrarDatosMedicos.filter((user) =>
      user.nombre.toLowerCase().includes(filterValue.toLowerCase()),
    );
    return filtrarDatosMedicos;
  }, [datosMedicos, filterValue]);

  // Funcion para obtener datos medicos
  useEffect(() => {
    getDatosMedicos();
  }, [getDatosMedicos]);

  // Funcion para esperar la respuesta de la API
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 100 : v + 10));
    }, 100);
    return () => clearInterval(interval);
  }, [datosMedicos]);

  // Estado de carga
  const loadingState = loading ? "loading" : "idle";

  // Calcular el número de páginas total
  const paginas = Math.ceil(
    filtrarDatosMedicosPorNombre?.length / filasPorPagina,
  );

  // Calcular las filas a mostrar en la tabla
  const items = useMemo(() => {
    const start = (pagina - 1) * filasPorPagina;
    const end = start + filasPorPagina;

    return filtrarDatosMedicosPorNombre?.slice(start, end);
  }, [pagina, filasPorPagina, filtrarDatosMedicosPorNombre]);

  // Ordenar los items de la tabla
  const ordenarItems = useMemo(() => {
    return [...items].sort((a: DatosMedicos, b: DatosMedicos) => {
      const first = a[sortDescriptor.column as keyof DatosMedicos] as number;
      const second = b[sortDescriptor.column as keyof DatosMedicos] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [items, sortDescriptor]);

  // Tipo de datos de datos medicos
  type DatosMedicos = (typeof items)[number];

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
    getDatosMedicos,
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
