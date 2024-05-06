import { Icon } from "@iconify/react/dist/iconify.js";

export const Logo = ({ size }: { size: number }) => {
  return (
    <article className="flex w-1/2 flex-col items-center justify-center gap-2 text-blanco">
      <Icon icon="mdi:hospital-building" width={`${size}rem`} />
      <h3 className="text-4xl font-semibold">Hopitalito</h3>
      <h2 className="text-7xl font-extrabold drop-shadow-lg">C.E.R.N.I.M.</h2>
    </article>
  );
};

export const LogoPanel = ({ size }: { size: number }) => {
  return (
    <article className="flex w-full items-center gap-2 text-blanco">
      <Icon icon="mdi:hospital-building" width={`${size}rem`} />
      <div className="text-center">
        <h3 className="text-xs font-semibold">Hopitalito</h3>
        <h2 className="text-md font-extrabold drop-shadow-lg">C.E.R.N.I.M.</h2>
      </div>
    </article>
  );
};
