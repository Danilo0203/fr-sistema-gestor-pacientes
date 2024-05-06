import { forwardRef } from "react";
import { InputProps } from "types/index";

export const Input = forwardRef(({ children, ...props }: InputProps, ref) => {
  return (
    <div className="flex gap-2 border-b-2 border-azulFuerte pb-2">
      <span className="self-center">{children}</span>
      <input
        className="w-full bg-transparent text-xl outline-none  placeholder:text-azulFuerte/65"
        {...props}
        ref={ref}
      ></input>
    </div>
  );
});
