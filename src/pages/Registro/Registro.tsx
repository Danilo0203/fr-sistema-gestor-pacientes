import { Logo } from "components/Logo/Logo";
import { FormRegistro } from "../../components/Formulario/FormRegistro";

export const Registro = () => {
  return (
    <section className="flex min-h-dvh flex-grow bg-azulClaro">
      <FormRegistro />
      <Logo size={6} />
    </section>
  );
};
