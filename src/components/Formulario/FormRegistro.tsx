import { TituloBienvenida } from "../ui/TituloBienvenida";
import { InputGroup } from "./InputGroup";

export const FormRegistro = () => {
  return (
    <article className="flex flex-grow flex-col items-center justify-center rounded-r-[72px] bg-blanco shadow-2xl">
      <TituloBienvenida descripcion="Crea una cuenta para iniciar sesión" />
      <InputGroup />
    </article>
  );
};
