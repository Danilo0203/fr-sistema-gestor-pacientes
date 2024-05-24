import { useCallback, useEffect, useMemo, useState } from "react";
import { useDireccionStore } from "../store/direcciones/direcciones";
import { SortDescriptor } from "@nextui-org/react";
import { useMunicipioStore } from "../store/direcciones/municipios";
import { useDepartamentoStore } from "../store/direcciones/departamentos";
import useSWR from "swr";
import api from "helpers/libs/axios";

const fetcher = (url) => api.get(url).then((res) => res.data);

export const useTableDirecciones = (direcciones) => {
  const getDirecciones = useDireccionStore((state) => state.execute);
  const initDirecciones = useDireccionStore((state) => state.init);
  const initMunicipios = useMunicipioStore((state) => state.init);
  const initDeptos = useDepartamentoStore((state) => state.init);
  // const loading = useDireccionStore((state) => state.loading);
  const [value, setValue] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [filterValue, setFilterValue] = useState("");

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });
  const filasPorPagina = 20;
  // Inicializar direcciones
  useEffect(() => {
    initDirecciones();
    initMunicipios();
    initDeptos();
  }, [initDirecciones, initMunicipios, initDeptos]);

  const { data = [], isLoading } = useSWR(
    `/direcciones?page=${pagina}`,
    fetcher,
    {
      keepPreviousData: true,
    },
  );

  const dataA = useMemo(() => {
    return (data?.data || []).map((direccion) => ({
      id: direccion.id,
      nombre: direccion.nombre,
      municipio: direccion.municipio.nombre,
      municipioID: direccion.municipio.id,
      departamento: direccion.municipio.departamento.nombre,
      departamentoID: direccion.municipio.departamento.id,
    }));
  }, [data]);

  // Funcion para esperar la respuesta de la API
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 100 : v + 10));
    }, 100);
    return () => clearInterval(interval);
  }, [data]);

  // Estado de carga
  const loadingState = isLoading ? "loading" : "idle";

  // Funcion para filtrar direcciones por nombre
  const filtrarDireccionPorNombre = useMemo(() => {
    return dataA.filter((user) =>
      user.nombre.toLowerCase().includes(filterValue.toLowerCase()),
    );
  }, [dataA, filterValue]);
  // console.log(filtrarDireccionPorNombre);

  // Calcular el número de páginas total
  // const paginas = Math.ceil(filtrarDireccionPorNombre?.length / filasPorPagina);

  // console.log(direcciones.length);
  const paginas = useMemo(() => {
    return Math.ceil((data?.meta?.total || 0) / filasPorPagina);
  }, [data?.meta?.total, filasPorPagina]);

  // Calcular las filas a mostrar en la tabla
  // const items = useMemo(() => {
  //   const start = (pagina - 1) * filasPorPagina;
  //   console.log(start);
  //   const end = start + filasPorPagina;
  //   console.log(filtrarDireccionPorNombre);
  //   return filtrarDireccionPorNombre?.slice(start, end);
  // }, [pagina, filasPorPagina, filtrarDireccionPorNombre]);
  // console.log(items);
  // Ordenar los items de la tabla
  const ordenarItems = useMemo(() => {
    return [...dataA].sort((a: Direccion, b: Direccion) => {
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
  }, [dataA, sortDescriptor]);

  // Calcular el indice de los items
  const itemsConIndices = useMemo(() => {
    const startIndex = (pagina - 1) * filasPorPagina;
    return ordenarItems.map((item, index) => ({
      ...item,
      index: startIndex + index + 1,
    }));
  }, [ordenarItems, pagina, filasPorPagina]);

  // Tipo de dato de las direcciones
  type Direccion = {
    id: number;
    nombre: string;
    municipio: string;
    departamento: string;
  };

  // Funcion para cambiar el número de filas por página
  // const onRowsPerPageChange = useCallback(
  //   (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     setRowsPerPage(Number(e.target.value));
  //     setPagina(1);
  //   },
  //   [],
  // );

  // Funcion para buscar departamentos por nombre
  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPagina(1);
    } else {
      setFilterValue("");
    }
  }, []);

  // Funcion para limpiar el campo de búsqueda
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
    ordenarItems: itemsConIndices,
    // onRowsPerPageChange,
    onSearchChange,
    onClear,
  };
};
