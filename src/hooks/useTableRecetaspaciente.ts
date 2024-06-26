import { useCallback, useEffect, useMemo, useState } from "react";
import { SortDescriptor } from "@nextui-org/react";
import { useRecetasStore } from "../store/recetas/recetas";
import { useUsuarioStore } from "../store/usuarios";
import { usePacienteStore } from "../store/pacientes/pacientes";
import { useRecetasPacienteStore } from "../store/recetas/recetasPaciente";

export const useTableRecetaspaciente = (recetas) => {
  const getRecetas = useRecetasStore((state) => state.execute);
  const initRecetas = useRecetasStore((state) => state.execute);
  const recetasPacientes = useRecetasPacienteStore((state) => state.execute);

  const initUsuarios = useUsuarioStore((state) => state.init);
  const executePacientes = usePacienteStore((state) => state.execute);

  const loading = useRecetasStore((state) => state.loading);
  const [value, setValue] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [filasPorPagina, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "descending",
  });

  // Inicializar recetas
  useEffect(() => {
    initRecetas();
    initUsuarios();
    executePacientes();
    recetasPacientes();
  }, [initRecetas, initUsuarios, executePacientes, recetasPacientes]);

  // Funcion para filtrar recetas por fecha
  const filtrarRecetasPorFecha = useMemo(() => {
    let filtrarRecetas = [...recetas];
    filtrarRecetas = filtrarRecetas.filter((receta) =>
      receta.pacienteNombre.toLowerCase().includes(filterValue.toLowerCase()),
    );
    return filtrarRecetas;
  }, [recetas, filterValue]);

  console.log(filtrarRecetasPorFecha);

  // Funcion para esperar la respuesta de la API
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 100 : v + 10));
    }, 100);
    return () => clearInterval(interval);
  }, [recetas]);

  // Estado de carga
  const loadingState = loading ? "loading" : "idle";

  // Calcular el número de páginas total
  const paginas = Math.ceil(filtrarRecetasPorFecha?.length / filasPorPagina);

  // Calcular las filas a mostrar en la tabla
  const items = useMemo(() => {
    const start = (pagina - 1) * filasPorPagina;
    const end = start + filasPorPagina;

    return filtrarRecetasPorFecha?.slice(start, end);
  }, [pagina, filasPorPagina, filtrarRecetasPorFecha]);

  // Ordenar los items de la tabla
  const ordenarItems = useMemo(() => {
    return [...items].sort((a: Recetas, b: Recetas) => {
      const first = a[sortDescriptor.column as keyof Recetas] as number;
      const second = b[sortDescriptor.column as keyof Recetas] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
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

  // Tipo de datos de recetas
  type Recetas = (typeof items)[number];

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
    getRecetas,
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
