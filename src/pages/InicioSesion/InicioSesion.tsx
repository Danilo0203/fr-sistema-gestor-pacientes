import { FormInicioSesion } from "components/Formulario/FormInicioSesion";
import { Logo } from "components/Logo/Logo";

export const InicioSesion = () => {
  return (
    <section className="flex flex-grow bg-azulClaro">
      <FormInicioSesion />
      <Logo />
    </section>
  );
};
