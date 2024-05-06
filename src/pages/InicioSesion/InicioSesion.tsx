import { FormInicioSesion } from "components/Formulario/FormInicioSesion";
import { Logo } from "components/Logo/Logo";

export const InicioSesion = () => {
  return (
    <section className="flex min-h-dvh flex-grow bg-azulClaro">
      <FormInicioSesion />
      <Logo size={10} />
    </section>
  );
};
