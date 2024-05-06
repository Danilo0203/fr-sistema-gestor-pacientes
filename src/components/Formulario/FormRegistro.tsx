import { Label } from "components/ui/Label";
import { TituloBienvenida } from "../ui/TituloBienvenida";
import { BotonGroup } from "./BotonGroup";
import { Input } from "components/ui/Input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormRegistroType } from "types/index";

export const FormRegistro = forwardRef(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegistroType>();

  const nombreRef = useRef(null);
  const usuarioRef = useRef(null);
  const correoRef = useRef(null);
  const contrasenaRef = useRef(null);

  const { ref: refNombre, ...rest } = register("nombre", { required: true });
  const { ref: refUsuario, ...restUsuario } = register("usuario", {
    required: true,
  });
  const { ref: refCorreo, ...restCorreo } = register("correo", {
    required: true,
  });
  const { ref: refContrasena, ...restContrasena } = register("contraseña", {
    required: true,
  });

  useImperativeHandle(refNombre, () => nombreRef.current);
  useImperativeHandle(refUsuario, () => usuarioRef.current);
  useImperativeHandle(refCorreo, () => correoRef.current);
  useImperativeHandle(refContrasena, () => contrasenaRef.current);

  const onSubmit: SubmitHandler<FormRegistroType> = (data) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <article className="flex w-1/2 flex-col justify-between rounded-r-[72px] bg-blanco py-5 shadow-2xl">
      <TituloBienvenida descripcion="Crea una cuenta para iniciar sesión" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-10/12 flex-grow flex-col"
      >
        <div className="flex flex-grow flex-col justify-center">
          <div className="flex flex-grow flex-col justify-evenly">
            <div className="flex flex-col gap-1">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                placeholder="Ingrese su nombre"
                type="text"
                {...rest}
                aria-invalid={errors.nombre ? "true" : "false"}
                ref={nombreRef}
              >
                <Icon icon="mdi:user" className="size-4 text-azulFuerte" />
              </Input>
              {errors.nombre?.type === "required" && (
                <p
                  role="alert"
                  className="text-sm font-medium italic text-red-600"
                >
                  Este campo es requerido
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="contraseña">Usuario</Label>
              <Input
                id="contraseña"
                placeholder="Ingrese su usuario"
                type="text"
                {...restUsuario}
                ref={usuarioRef}
              >
                <Icon icon="mdi:user" className="size-4 text-azulFuerte" />
              </Input>
              {errors.usuario?.type === "required" && (
                <p
                  role="alert"
                  className="text-sm font-medium italic text-red-600"
                >
                  Este campo es requerido
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="contraseña">Correo</Label>
              <Input
                id="contraseña"
                placeholder="Ingrese su correo"
                type="text"
                {...restCorreo}
                ref={correoRef}
              >
                <Icon icon="mdi:email" className="size-4 text-azulFuerte" />
              </Input>
              {errors.correo?.type === "required" && (
                <p
                  role="alert"
                  className="text-sm font-medium italic text-red-600"
                >
                  Este campo es requerido
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="contraseña">Contraseña</Label>
              <Input
                id="contraseña"
                placeholder="Ingrese su contraseña"
                type="password"
                {...restContrasena}
                ref={contrasenaRef}
              >
                <Icon icon="uis:padlock" className="size-4 text-azulFuerte" />
              </Input>
              {errors.contraseña?.type === "required" && (
                <p
                  role="alert"
                  className="text-sm font-medium italic text-red-600"
                >
                  Este campo es requerido
                </p>
              )}
            </div>
          </div>
        </div>
        <BotonGroup />
      </form>
    </article>
  );
});
