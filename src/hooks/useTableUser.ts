import { useCallback, useEffect, useMemo, useState } from "react";
import { useUsuarioStore } from "../store/usuarios";
import { SortDescriptor } from "@nextui-org/react";

export const useTableUser = (usuarios) => {
  const getUsuarios = useUsuarioStore((state) => state.execute);
  const loading = useUsuarioStore((state) => state.loading);
  const [value, setValue] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [filasPorPagina, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  // Funcion para filtrar usuarios por nombre
  const filtrarUsuarioPorNombre = useMemo(() => {
    let filtrarUsuarios = [...usuarios];
    filtrarUsuarios = filtrarUsuarios.filter((user) =>
      user.nombre.toLowerCase().includes(filterValue.toLowerCase()),
    );
    return filtrarUsuarios;
  }, [usuarios, filterValue]);

  // Funcion para obtener usuarios
  // useEffect(() => {
  //   getUsuarios();
  // }, [getUsuarios]);

  // Funcion para esperar la respuesta de la API
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 100 : v + 10));
    }, 100);
    return () => clearInterval(interval);
  }, [usuarios]);

  // Estado de carga
  const loadingState = loading ? "loading" : "idle";

  // Calcular el número de páginas total
  const paginas = Math.ceil(filtrarUsuarioPorNombre?.length / filasPorPagina);

  // Calcular las filas a mostrar en la tabla
  const items = useMemo(() => {
    const start = (pagina - 1) * filasPorPagina;
    const end = start + filasPorPagina;

    return filtrarUsuarioPorNombre?.slice(start, end);
  }, [pagina, filasPorPagina, filtrarUsuarioPorNombre]);

  // Ordenar los items de la tabla
  const ordenarItems = useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  // Tipo de dato de los usuarios
  type User = (typeof items)[0];

  // Funcion para cambiar el número de filas por página
  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPagina(1);
    },
    [],
  );

  // Funcion para buscar usuarios por nombre
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
    getUsuarios,
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
