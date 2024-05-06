import { TituloBienvenida } from "components/ui/TituloBienvenida";
import { Boton } from "components/ui/Botones/Boton";
import { Label } from "components/ui/Label";
import { Input } from "components/ui/Input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SubmitHandler, useForm } from "react-hook-form";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { FormInicioSesionType } from "types/index";
import { loginRequest, profileRequest } from "helpers/api/auth";
import { useAuthStore } from "../../store/auth";

export const FormInicioSesion = forwardRef(() => {
  const setToken = useAuthStore((state) => state.setToken);
  const setProfile = useAuthStore((state) => state.setProfile);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInicioSesionType>();

  const nombreRef = useRef(null);
  const contrasenaRef = useRef(null);

  const { ref, ...rest } = register("nombre", { required: true });
  const { ref: refContrasena, ...restContrasena } = register("contraseña", {
    required: true,
  });

  useImperativeHandle(ref, () => nombreRef.current);
  useImperativeHandle(refContrasena, () => contrasenaRef.current);

  const onSubmit: SubmitHandler<FormInicioSesionType> = async ({
    nombre,
    contraseña,
  }) => {
    const resLogin = await loginRequest(nombre, contraseña);
    setToken(resLogin.data.access_token);

    const {
      data: {
        data: [profile],
      },
    } = await profileRequest();
    setProfile(profile);
  };

  return (
    <article className="flex w-1/2 flex-col rounded-r-[72px] bg-blanco py-10 shadow-2xl">
      <TituloBienvenida descripcion="Ingrese a su cuenta para continuar" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-10/12 flex-grow flex-col justify-between"
      >
        <div className="flex flex-grow flex-col justify-evenly">
          <div className="flex flex-col gap-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              placeholder="Ingrese su nombre"
              type="text"
              {...rest}
              aria-invalid={errors.nombre ? "true" : "false"}
              ref={nombreRef}
            >
              <Icon icon="mdi:user" className="size-5 text-azulFuerte" />
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

          <div className="flex flex-col gap-2">
            <Label htmlFor="contraseña">Contraseña</Label>
            <Input
              id="contraseña"
              placeholder="Ingrese su contraseña"
              type="password"
              {...restContrasena}
              aria-invalid={errors.contraseña ? "true" : "false"}
              ref={contrasenaRef}
            >
              <Icon icon="uis:padlock" className="size-5 text-azulFuerte" />
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

        <div className="flex w-1/2 flex-col gap-12 self-center">
          <Boton type="submit" />
        </div>
      </form>
    </article>
  );
});
