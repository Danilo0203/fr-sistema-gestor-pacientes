import { TituloBienvenida } from "components/ui/TituloBienvenida";
import { InputGroup } from "./InputGroup";
import { Link } from "react-router-dom";
import { Boton } from "components/ui/Botones/Boton";

export const FormInicioSesion = () => {
  return (
    <article className="flex w-1/2 rounded-r-[72px] bg-blanco py-10 shadow-2xl">
      <article className="mx-auto flex w-10/12 flex-col justify-between">
        <TituloBienvenida descripcion="Ingrese a su cuenta para continuar" />
        <InputGroup
          datosRegistro={[
            { usuario: "usuario", icon: "mdi:user", type: "text" },
            { contraseña: "contraseña", icon: "uis:padlock", type: "password" },
          ]}
        />
        <div className="flex w-1/2 flex-col gap-12 self-center">
          <Boton />
          <small className="self-center text-sm font-medium text-azulFuerte">
            ¿No tiene una cuenta?{" "}
            <Link to="/registro" className="text-naranja">
              Crear cuenta
            </Link>
          </small>
        </div>
      </article>
    </article>
  );
};
