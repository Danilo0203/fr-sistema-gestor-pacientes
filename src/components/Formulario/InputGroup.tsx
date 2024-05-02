import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { Icon } from "@iconify/react";
import { v4 as uuid } from "uuid";
export const InputGroup = () => {
  const datosRegistro = [
    {
      nombre: "nombre",
      icon: "mdi:user",
      type: "text",
    },
    {
      usuario: "usuario",
      icon: "mdi:user",
      type: "text",
    },
    {
      correo: "correo",
      icon: "ic:baseline-email",
      type: "text",
    },
    {
      contraseña: "contraseña",
      icon: "uis:padlock",
      type: "password",
    },
  ];
  const capitalize = (t: string) => {
    return t[0].toUpperCase() + t.substr(1);
  };

  const datos = datosRegistro.map((dato) => {
    const [key, item, type] = Object.entries(dato);
    return (
      <div className="flex flex-col gap-2" key={uuid()}>
        <Label htmlFor={key[1]}>{capitalize(key[1])}</Label>
        <Input
          name={key[1]}
          id={key[1]}
          placeholder={`Ingrese su ${key[1]}`}
          type={type[1]}
        >
          <Icon icon={item[1]} className="size-5 text-azulFuerte" />
        </Input>
      </div>
    );
  });

  return <>{datos}</>;
};
