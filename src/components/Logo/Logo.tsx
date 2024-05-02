import { Icon } from "@iconify/react/dist/iconify.js";

export const Logo = () => {
  return (
    <article className="flex w-1/2 flex-col items-center justify-center gap-2 text-blanco">
      <Icon icon="mdi:hospital-building" className="size-32" />
      <h3 className="text-4xl font-semibold">Hopitalito</h3>
      <h2 className="text-8xl font-extrabold drop-shadow-lg">C.E.R.N.I.M.</h2>
    </article>
  );
};
