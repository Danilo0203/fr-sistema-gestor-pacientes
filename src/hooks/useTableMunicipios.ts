import { useCallback, useEffect, useMemo, useState } from "react";
import { useMunicipioStore } from "../store/direcciones/municipios";
import { SortDescriptor } from "@nextui-org/react";
import { useDepartamentoStore } from "../store/direcciones/departamentos";

export const useTableMunicipios = (municipios) => {
  const getMunicipios = useMunicipioStore((state) => state.execute);
  const initMunicipios = useMunicipioStore((state) => state.init);
  const initDeptos = useDepartamentoStore((state) => state.init);
  const loading = useMunicipioStore((state) => state.loading);
  const [value, setValue] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [filasPorPagina, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  // Inicializar municipios
  useEffect(() => {
    initMunicipios();
    initDeptos();
  }, [initMunicipios, initDeptos]);

  // Funcion para filtrar municipios por nombre
  const filtrarMunicipioPorNombre = useMemo(() => {
    let filtrarMunicipios = [...municipios];
    filtrarMunicipios = filtrarMunicipios.filter((user) =>
      user.nombre.toLowerCase().includes(filterValue.toLowerCase()),
    );
    return filtrarMunicipios;
  }, [municipios, filterValue]);

  // Funcion para esperar la respuesta de la API
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 100 : v + 10));
    }, 100);
    return () => clearInterval(interval);
  }, [municipios]);

  // Estado de carga
  const loadingState = loading ? "loading" : "idle";

  // Calcular el número de páginas total
  const paginas = Math.ceil(filtrarMunicipioPorNombre?.length / filasPorPagina);

  // Calcular las filas a mostrar en la tabla
  const items = useMemo(() => {
    const start = (pagina - 1) * filasPorPagina;
    const end = start + filasPorPagina;

    return filtrarMunicipioPorNombre?.slice(start, end);
  }, [pagina, filasPorPagina, filtrarMunicipioPorNombre]);

  // Ordenar los items de la tabla
  const ordenarItems = useMemo(() => {
    return [...items].sort((a: Municipio, b: Municipio) => {
      const first = a[sortDescriptor.column as keyof Municipio] as number;
      const second = b[sortDescriptor.column as keyof Municipio] as number;

      if (first > second) {
        return sortDescriptor.direction === "ascending" ? 1 : -1;
      }
      if (first < second) {
        return sortDescriptor.direction === "ascending" ? -1 : 1;
      }
      return 0;
    });
  }, [items, sortDescriptor]);

  // Calcular el indice de los items
  const itemsConIndices = useMemo(() => {
    const startIndex = (pagina - 1) * filasPorPagina;
    return ordenarItems.map((item, index) => ({
      ...item,
      index: startIndex + index + 1,
    }));
  }, [ordenarItems, pagina, filasPorPagina]);

  // Tipo de dato de los municipios
  type Municipio = {
    id: number;
    nombre: string;
    departamento: string;
    departamentoID: number;
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
    getMunicipios,
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
  };
};
