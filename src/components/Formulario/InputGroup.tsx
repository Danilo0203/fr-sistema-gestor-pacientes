import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { DatosRegisroProp } from "types/index";
import { v4 as uuid } from "uuid";
export const InputGroup = ({ datosRegistro }: DatosRegisroProp) => {
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
