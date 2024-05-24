import { useCallback, useEffect, useMemo, useState } from "react";
import { useDepartamentoStore } from "../store/direcciones/departamentos";
import { SortDescriptor } from "@nextui-org/react";

export const useTableDepartamento = (departamentos) => {
  const getDepartamentos = useDepartamentoStore((state) => state.execute);
  const initDepartamentos = useDepartamentoStore((state) => state.init);
  const loading = useDepartamentoStore((state) => state.loading);
  const [value, setValue] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [filasPorPagina, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  // Inicializar departamentos
  useEffect(() => {
    initDepartamentos();
  }, [initDepartamentos]);

  // Funcion para filtrar departamentos por nombre
  const filtrarDepartamentoPorNombre = useMemo(() => {
    let filtrarDepartamentos = [...departamentos];
    filtrarDepartamentos = filtrarDepartamentos.filter((user) =>
      user.nombre.toLowerCase().includes(filterValue.toLowerCase()),
    );
    return filtrarDepartamentos;
  }, [departamentos, filterValue]);

  // Funcion para esperar la respuesta de la API
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 100 : v + 10));
    }, 100);
    return () => clearInterval(interval);
  }, [departamentos]);

  // Estado de carga
  const loadingState = loading ? "loading" : "idle";

  // Calcular el número de páginas total
  const paginas = Math.ceil(
    filtrarDepartamentoPorNombre?.length / filasPorPagina,
  );

  // Calcular las filas a mostrar en la tabla
  const items = useMemo(() => {
    const start = (pagina - 1) * filasPorPagina;
    const end = start + filasPorPagina;

    return filtrarDepartamentoPorNombre?.slice(start, end);
  }, [pagina, filasPorPagina, filtrarDepartamentoPorNombre]);

  // Ordenar los items de la tabla
  const ordenarItems = useMemo(() => {
    return [...items].sort((a: Departamento, b: Departamento) => {
      const first = a[sortDescriptor.column as keyof Departamento] as number;
      const second = b[sortDescriptor.column as keyof Departamento] as number;
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

  // Tipo de dato de los departamentos
  type Departamento = (typeof items)[0];

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
    getDepartamentos,
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
