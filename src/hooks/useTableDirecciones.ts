import { useCallback, useEffect, useMemo, useState } from "react";
import { useDireccionStore } from "../store/direcciones/direcciones";
import { SortDescriptor } from "@nextui-org/react";

export const useTableDirecciones = (direcciones) => {
  const getDirecciones = useDireccionStore((state) => state.execute);
  const loading = useDireccionStore((state) => state.loading);
  const [value, setValue] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [filasPorPagina, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "nombre",
    direction: "ascending",
  });

  // Funcion para filtrar direcciones por nombre
  const filtrarDireccionPorNombre = useMemo(() => {
    let filtrarDirecciones = [...direcciones];
    filtrarDirecciones = filtrarDirecciones.filter((user) =>
      user.nombre.toLowerCase().includes(filterValue.toLowerCase()),
    );
    return filtrarDirecciones;
  }, [direcciones, filterValue]);

  // Funcion para obtener municipios
  useEffect(() => {
    getDirecciones();
  }, [getDirecciones]);

  // Funcion para esperar la respuesta de la API
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 100 : v + 10));
    }, 100);
    return () => clearInterval(interval);
  }, [direcciones]);

  // Estado de carga
  const loadingState = loading ? "loading" : "idle";

  // Calcular el número de páginas total
  const paginas = Math.ceil(filtrarDireccionPorNombre?.length / filasPorPagina);

  // Calcular las filas a mostrar en la tabla
  const items = useMemo(() => {
    const start = (pagina - 1) * filasPorPagina;
    const end = start + filasPorPagina;

    return filtrarDireccionPorNombre?.slice(start, end);
  }, [pagina, filasPorPagina, filtrarDireccionPorNombre]);

  // Ordenar los items de la tabla
  const ordenarItems = useMemo(() => {
    return [...items].sort((a: Direccion, b: Direccion) => {
      const first = a[sortDescriptor.column as keyof Direccion] as number;
      const second = b[sortDescriptor.column as keyof Direccion] as number;

      if (first > second) {
        return sortDescriptor.direction === "ascending" ? 1 : -1;
      }

      if (first < second) {
        return sortDescriptor.direction === "ascending" ? -1 : 1;
      }

      return 0;
    });
  }, [items, sortDescriptor]);

  // Tipo de dato de las direcciones
  type Direccion = {
    id: number;
    nombre: string;
    municipio: string;
    departamento: string;
  };

  // Funcion para cambiar el número de filas por página
  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPagina(1);
    },
    [],
  );

  // Funcion para buscar departamentos por nombre
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
    getDirecciones,
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
