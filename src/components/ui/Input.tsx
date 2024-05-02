import { InputProps } from "types/index";

export const Input = ({ children, ...props }: InputProps) => {
  return (
    <div className="flex gap-2 border-b-2 border-blue-400 pb-2">
      <span className="self-center">{children}</span>
      <input
        className="w-full bg-transparent text-lg outline-none placeholder:text-lg placeholder:text-azulClaro/65"
        {...props}
      ></input>
    </div>
  );
};
