import { format } from "@formkit/tempo";

export const PanelRecepcion = ({ children }) => {
  const date = new Date();
  const hoy = format(date, "DD/MM/YYYY");
  return (
    <div className="flex flex-grow flex-col gap-5 p-4">
      <time className="text-2xl text-azulFuerte">Fecha: {hoy} </time>
      {children}
    </div>
  );
};
