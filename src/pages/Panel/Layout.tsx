import { Divider } from "@nextui-org/react";
import { BarraNavegacion } from "components/BarraNavegacion/Barra";
import { Header } from "components/Header/Header";
import { memo, useEffect } from "react";

import { Outlet } from "react-router-dom";
import { useGeneroStore } from "../../store/pacientes/generos";
import { usePacienteStore } from "../../store/pacientes/pacientes";
import { useUsuarioStore } from "../../store/usuarios";
import { useRolStore } from "../../store/usuarios/roles";
import { useProfesionStore } from "../../store/pacientes/profesiones";
import { useDireccionStore } from "../../store/direcciones/direcciones";
import { useMunicipioStore } from "../../store/direcciones/municipios";
import { useDepartamentoStore } from "../../store/direcciones/departamentos";
import { useDatosMedicosStore } from "../../store/datosMedicos/datosMedicos";
import { useDatosMedicosPacientesStore } from "../../store/datosMedicos/datosMedicosPaciente";
import { useRecetasStore } from "../../store/recetas/recetas";
import { useRecetasPacienteStore } from "../../store/recetas/recetasPaciente";
import { useEstadoCivilStore } from "../../store/pacientes/estadoCivil";
import { usePacienteCitasStore } from "../../store/pacientes/pacientesCitas";
import { Toaster } from "sonner";

export const Layout = memo(() => {
  const init = useRolStore((state) => state.init);
  const initUsuarios = useUsuarioStore((state) => state.init);
  const initPacientes = usePacienteStore((state) => state.init);
  const initGeneros = useGeneroStore((state) => state.init);
  const initProfesion = useProfesionStore((state) => state.init);
  const initDirecciones = useDireccionStore((state) => state.init);
  const initMunicipios = useMunicipioStore((state) => state.init);
  const initDepto = useDepartamentoStore((state) => state.init);
  const initDatoMedicos = useDatosMedicosStore((state) => state.init);
  const initDatosMedicosPacientes = useDatosMedicosPacientesStore(
    (state) => state.init,
  );
  const initRecetas = useRecetasStore((state) => state.init);
  const initRecetasPacientes = useRecetasPacienteStore((state) => state.init);
  const initEstadoCivil = useEstadoCivilStore((state) => state.init);
  const initRoles = useRolStore((state) => state.init);
  const initCitas = usePacienteCitasStore((state) => state.init);
  useEffect(() => {
    const loadData = async () => {
      try {
        await init();
        await initUsuarios();
        await initCitas();
        await initPacientes();
        await initGeneros();
        await initProfesion();
        await initDirecciones();
        await initMunicipios();
        await initDepto();
        await initDatoMedicos();
        await initDatosMedicosPacientes();
        await initRecetas();
        await initRecetasPacientes();
        await initEstadoCivil();
        await initRoles();
      } catch (error) {
        console.error("Error al cargar los datos: ", error);
      }
    };
    loadData();
  }, [
    init,
    initUsuarios,
    initRoles,
    initPacientes,
    initCitas,
    initGeneros,
    initProfesion,
    initDirecciones,
    initMunicipios,
    initDepto,
    initDatoMedicos,
    initDatosMedicosPacientes,
    initRecetas,
    initRecetasPacientes,
    initEstadoCivil,
  ]);
  return (
    <>
      <Toaster richColors expand closeButton position="top-center" />
      <section className="flex min-h-dvh">
        <div className="flex">
          <BarraNavegacion />
        </div>
        <div className="w-full">
          <Header />
          <Divider />
          <Outlet />
        </div>
      </section>
    </>
  );
});
