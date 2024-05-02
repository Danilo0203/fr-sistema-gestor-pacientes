import { TituloBienvenida } from "../ui/TituloBienvenida";
import { BotonGroup } from "./BotonGroup";
import { InputGroup } from "./InputGroup";

export const FormRegistro = () => {
  return (
    <article className="flex w-1/2 rounded-r-[72px] bg-blanco py-10 shadow-2xl">
      <article className="mx-auto flex w-10/12 flex-col justify-between">
        <TituloBienvenida descripcion="Crea una cuenta para iniciar sesión" />
        <InputGroup />
        <BotonGroup />
      </article>
    </article>
  );
};
