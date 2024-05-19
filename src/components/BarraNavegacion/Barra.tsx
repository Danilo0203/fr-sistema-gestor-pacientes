import { LogoPanel } from "components/Logo/Logo";
import { Sidbar } from "./Sidbar";
import { Divider } from "@nextui-org/react";

export const BarraNavegacion = () => {
  return (
    <div className="flex flex-grow w-56 flex-col bg-azulFuerte p-2">
      <div className="mx-auto mb-2">
        <LogoPanel size={3} />
      </div>
      <Divider className="bg-blanco" />
      <Sidbar />
    </div>
  );
};
