import { Divider } from "@nextui-org/react";
import { BarraNavegacion } from "components/BarraNavegacion/Barra";
import { Header } from "components/Header/Header";
import { memo, useEffect } from "react";

import { Outlet } from "react-router-dom";
// import { useGeneroStore } from "../../store/pacientes/generos";
import { usePacienteStore } from "../../store/pacientes/pacientes";
import { useUsuarioStore } from "../../store/usuarios";
// import { useRolStore } from "../../store/usuarios/roles";
// import { useProfesionStore } from "../../store/pacientes/profesiones";
// import { useDireccionStore } from "../../store/direcciones/direcciones";
// import { useMunicipioStore } from "../../store/direcciones/municipios";
// import { useDepartamentoStore } from "../../store/direcciones/departamentos";
// import { useDatosMedicosStore } from "../../store/datosMedicos/datosMedicos";
// import { useDatosMedicosPacientesStore } from "../../store/datosMedicos/datosMedicosPaciente";
// import { useRecetasStore } from "../../store/recetas/recetas";
// import { useRecetasPacienteStore } from "../../store/recetas/recetasPaciente";

export const Layout = memo(() => {
  // const init = useRolStore((state) => state.init);
  const initUsuarios = useUsuarioStore((state) => state.init);
  const initPacientes = usePacienteStore((state) => state.init);
  // const initGeneros = useGeneroStore((state) => state.init);
  // const initProfesion = useProfesionStore((state) => state.init);
  // const initDirecciones = useDireccionStore((state) => state.init);
  // const initMunicipios = useMunicipioStore((state) => state.init);
  // const initDepto = useDepartamentoStore((state) => state.init);
  // const initDatoMedicos = useDatosMedicosStore((state) => state.init);
  // const initDatosMedicosPacientes = useDatosMedicosPacientesStore(
  //   (state) => state.init,
  // );
  // const initRecetas = useRecetasStore((state) => state.init);
  // const initRecetasPacientes = useRecetasPacienteStore((state) => state.init);

  useEffect(() => {
    //   init();
    initUsuarios();
    initPacientes();
    //   initGeneros();
    //   initProfesion();
    //   initDirecciones();
    //   initMunicipios();
    //   initDepto();
    //   initDatoMedicos();
    //   initDatosMedicosPacientes();
    //   initRecetas();
    //   initRecetasPacientes();
  }, [
    //   init,
    initUsuarios,
    initPacientes,
    //   initGeneros,
    //   initProfesion,
    //   initDirecciones,
    //   initMunicipios,
    //   initDepto,
    //   initDatoMedicos,
    //   initDatosMedicosPacientes,
    //   initRecetas,
    //   initRecetasPacientes,
  ]);
  return (
    <>
      <section className="flex">
        <div>
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
