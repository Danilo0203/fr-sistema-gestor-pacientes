import { LabelProps } from "types/index";

export const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label className="text-2xl font-semibold text-azulFuerte" {...props}>
      {children}
    </label>
  );
};
