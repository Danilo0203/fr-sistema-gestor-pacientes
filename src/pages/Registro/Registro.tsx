import { Logo } from "components/Logo/Logo";
import { FormRegistro } from "../../components/Formulario/FormRegistro";

export const Registro = () => {
  return (
    <section className="flex flex-grow bg-azulClaro">
      <FormRegistro />
      <Logo />
    </section>
  );
};
